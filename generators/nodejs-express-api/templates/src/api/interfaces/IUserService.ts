import { IUserModel } from "../models/UserModel";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    forgotPassword(email: string): Promise<IUserModel>;
    resetPassword(
        resetPasswordToken: string,
        resetPasswordExpires: number,
        newPassword: string,
        confirmPassword: string
    ): Promise<IUserModel>;
}
