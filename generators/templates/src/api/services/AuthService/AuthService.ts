import * as Joi from "joi";
import UserModel, { IUserModel } from "../../models/UserModel";
import { IAuthService } from "../../interfaces/IAuthService";
import AuthValidation from "./AuthValidation";

class AuthService implements IAuthService {
    async createUserAccount(user): Promise<IUserModel> {
        try {
            //validate user form
            const validate: Joi.ValidationResult<IUserModel> = AuthValidation.createUserAccount(user);

            if (validate.error) throw new Error(validate.error.message);

            if (user.uid) {
                // check this email and address is already used by another account or not.
                const existEmailOrAddress = await UserModel.find({
                    $or: [{ "local.email": user.email }, { "local.uid": user.uid }],
                });
                if (existEmailOrAddress.length > 0) {
                    //check is duplicate email or address
                    existEmailOrAddress.map((_user) => {
                        if (_user.local.email === user.email) {
                            throw new Error(`this email is already used.`);
                        }
                    });
                }
            }
            // check this email is already used by another account or not.
            if (!user.uid) {
                const existEmail = await UserModel.findOne({ "local.email": user.email }).exec();
                if (existEmail) {
                    throw new Error(`this email ${user.email} is already used.`);
                }
            }

            // create user
            const _user: any = new UserModel({
                local: {
                    uid: user.uid ? user.uid : "",
                    email: user.email,
                    emailVerifyCode: Math.floor(100000 + Math.random() * 900000),
                    password: user.password,
                    isUserLoginWithLocal: true,
                },
            });
            //save
            const saved: IUserModel = await _user.save();
            return saved;
        } catch (error) {
            throw new Error(error);
        }
    }

    async localLogin(user): Promise<IUserModel> {
        try {
            if (!user.email || !user.password) {
                throw new Error("Email and Password is required.");
            }

            // validate email and password.
            const validate: Joi.ValidationResult<IUserModel> = AuthValidation.localLogin(user);

            // if validate erro throw error.
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return validate;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new AuthService();
