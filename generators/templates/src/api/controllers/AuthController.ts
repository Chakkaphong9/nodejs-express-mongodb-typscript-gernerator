import AuthService from "../services/AuthService/AuthService";
import * as passport from "passport";
import { HttpError } from "../config/error/index";
import { IUserModel } from "../models/UserModel";
import UserModel from "../models/UserModel";
import { IAuthService } from "../interfaces/IAuthService";
import { NextFunction, Request, Response } from "express";
import AuthValidation from "../services/AuthService/AuthValidation";
import * as Joi from "joi";

class AuthController {
    private service: IAuthService;

    constructor(service: IAuthService) {
        this.service = service;
    }

    passportRequestLogin(req: Request, res: Response, next: NextFunction, user: IUserModel): void {
        // @ts-ignore
        req.login(user, { session: false }, async (error) => {
            if (error) {
                return next(new HttpError(400, error));
            }
            const token = user.generateJwt();
            res.status(200).json({ token });
        });
    }

    async createUserAccount(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            // check if use POST method
            if (req.method !== "POST") {
                return res.sendStatus(403);
            }
            //create new account
            const _createUser = await AuthService.createUserAccount(req.body);
            //if create user is success check middleware passport
            if (_createUser) {
                passport.authenticate("local", { session: false }, async (error, user, info) => {
                    if (error) {
                        return next(new HttpError(401, info ? info.message : error.message));
                    }
                    if (!user) {
                        return res.json({
                            status: 401,
                            logged: false,
                            message: info ? info.message : error.message,
                        });
                    }
                    this.passportRequestLogin(req, res, next, user);
                })(req, res, next);
            }
        } catch (error) {
            if (error.code === 500) {
                return next(new HttpError(error.message.status, error.message));
            }
            res.json({
                status: 401,
                message: error.message,
            });
        }
    }

    async locaLogin(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            // check if use POST method
            if (req.method !== "POST") {
                return res.sendStatus(403);
            }
            const validate: IUserModel = await AuthService.localLogin(req.body);
            //if validate sucess
            if (validate) {
                passport.authenticate("local", { session: false }, async (error, user, info) => {
                    if (error) {
                        return next(new HttpError(401, info ? info.message : error.message));
                    }
                    if (!user) {
                        return res.json({
                            status: 401,
                            logged: false,
                            message: info ? info.message : error.message,
                        });
                    }
                    this.passportRequestLogin(req, res, next, user);
                })(req, res, next);
            }
        } catch (error) {
            if (error.code === 500) {
                return next(new HttpError(error.message.status, error.message));
            }
            res.json({
                status: 400,
                message: error.message,
            });
        }
    }
}

export default new AuthController(AuthService);
