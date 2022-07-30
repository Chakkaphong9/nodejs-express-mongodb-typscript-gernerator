import * as Joi from "joi";
import { IUserModel } from "../../models/UserModel";

class AuthValidation {
    constructor() {}

    createUserAccount(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            uid: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        });

        return Joi.validate(params, schema);
    }

    localLogin(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });

        return Joi.validate(params, schema);
    }
}

export default new AuthValidation();
