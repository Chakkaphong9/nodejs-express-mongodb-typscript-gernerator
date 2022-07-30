import * as Joi from "joi";
import UserModel, { IUserModel } from "../../models/UserModel";
import UserValidation from "./UserValidation";
import { IUserService } from "../../interfaces/IUserService";
import { default as config } from "../../config/env";

const crypto: any = require("crypto");

/**
 * @export
 * @class UserService
 * @implements {IUserModelService}
 */
class UserService implements IUserService {
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */

    private static async randomBytes(size: number): Promise<any> {
        return new Promise((resolve, reject): void => {
            crypto.randomBytes(size, (err, buf) => {
                if (err) {
                    reject(err);
                }
                resolve(buf.toString("hex"));
            });
        });
    }

    // tslint:disable-next-line:function-name
    public async forgotPassword(email: string): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<{ email: string }> = UserValidation.forgotPassword({ email });

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const token: string = await UserService.randomBytes(20);
            const user: IUserModel = await UserModel.findOne({
                "local.email": { $regex: "^" + email, $options: "$" + "i" },
            }).exec();

            if (!user) {
                throw new Error("No account with that email address exists.");
            }
            user.local.resetPasswordToken = token;
            user.local.resetPasswordExpires = Date.now() + config.envConfig.jwtStrategy.expiresTime;

            await user.save();

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // tslint:disable-next-line:max-line-length
    public async resetPassword(
        resetPasswordToken: string,
        resetPasswordExpires: number,
        newPassword: string,
        confirmPassword: string
    ): Promise<IUserModel> {
        try {
            if (newPassword !== confirmPassword) throw new Error("your new password and confirm password is not equal");

            const user: any = await UserModel.findOne({ "local.resetPasswordToken": resetPasswordToken }).exec();
            if (user) {
                if (resetPasswordExpires > user.local?.resetPasswordExpires) throw new Error("Token expired !");
            } else {
                throw new Error("Invalid Token !");
            }

            user.local.password = newPassword;
            user.local.resetPasswordExpires = undefined;
            user.local.resetPasswordToken = undefined;

            await user.save();

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new UserService();
