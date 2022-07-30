import { HttpError } from "../config/error/index";
import UserModel, { IUserModel } from "../models/UserModel";
import { IUserService } from "../interfaces/IUserService";
import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService/UserService";

/**
 * @export
 * @class UserController
 */
class UserController {
    /**
     * @private
     * @type {IUserModelService}
     * @memberof UserController
     */
    private service: IUserService;

    /**
     * Creates an instance of UserController.
     * @param {IUserModelService} repository
     * @memberof UserController
     */
    constructor(service: IUserService) {
        this.service = service;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
    public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const _forgotPassword = await UserService.forgotPassword(req.body.email);
            if (_forgotPassword) {
                return res.json({ status: 200, message: `send to this ${_forgotPassword.local.email}` });
            } else {
                return res.json({ status: 500, message: "something was wrong!" });
            }
        } catch (error) {
            if (error.code === 500) {
                return next(new HttpError(error.message.status, error.message));
            }
            return res.json({ status: 400, message: error.message });
        }
    }

    public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { resetPasswordToken, resetPasswordExpires, newPassword, confirmPassword } = req.body;
            const _resetPassword = await UserService.resetPassword(
                resetPasswordToken,
                resetPasswordExpires,
                newPassword,
                confirmPassword
            );
            if (_resetPassword) {
                return res.json({ status: 200, message: "your password has been reset" });
            } else {
                return res.json({ status: 500, message: "something was wrong!" });
            }
        } catch (error) {
            if (error.code === 500) {
                return next(new HttpError(error.message.status, error.message));
            }
            return res.json({ status: 400, message: error.message });
        }
    }
}

export default new UserController(UserService);
