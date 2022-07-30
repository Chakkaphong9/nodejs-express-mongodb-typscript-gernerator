import * as Joi from "joi";
import { IUserModel } from "../../models/UserModel";
import { Types } from "mongoose";

/**
 * @export
 * @class JoiSchema
 */
class UserValidation {
    constructor() {}

    /**
     * @param {{ email: string }} body
     * @returns {Joi.ValidationResult<{ email: string }>}
     * @memberof UserValidation
     */
    forgotPassword(body: { email: string }): Joi.ValidationResult<{
        email: string;
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        });

        return Joi.validate(body, schema);
    }
}

export default new UserValidation();
