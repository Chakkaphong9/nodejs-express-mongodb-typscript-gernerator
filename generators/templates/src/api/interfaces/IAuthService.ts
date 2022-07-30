import { IUserModel } from "../models/UserModel";
/**
 * @export
 * @interaface IUserMetamaskModel
 */

export interface IAuthService {
    createUserAccount(IUserModel: IUserModel): Promise<IUserModel>;
    localLogin(IUserModel: IUserModel): Promise<IUserModel>;
}
