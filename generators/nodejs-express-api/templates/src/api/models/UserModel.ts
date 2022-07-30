import { Document, Schema, Types } from "mongoose";
import * as jwt from "jsonwebtoken";

import { default as config } from "../config/env";
import * as connections from "../config/connection/connection";
import * as passport from "../config/middleware/passport";

enum Roles {
    Admin = "admin",
    Manager = "manager",
    User = "user",
}
const bcrypt = require("bcrypt");
/**
 * @export
 * @interface IUserMetamaskModel
 * @extends {Document}
 */

export interface IUserModel extends Document {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    role: string;
    local: {
        isUserLoginWithLocal: boolean;
        email: string;
        emailVerifyCode: number;
        isEmailVerify: boolean;
        password: string;
        salt: string;
        resetPasswordToken: string;
        resetPasswordExpires: number;
    };
    isValidPassword(candidatePassword: string): Promise<boolean>;
    generateJwt(): Promise<any>;
}

const UserSchema: Schema = new Schema(
    {
        role: {
            type: String,
            enum: [Roles.Admin, Roles.Manager, Roles.User],
            default: Roles.User,
        },
        local: {
            isUserLoginWithLocal: {
                type: Boolean,
                default: false,
            },
            email: {
                type: String,
            },
            emailVerifyCode: {
                type: Number,
            },
            isEmailVerify: {
                type: Boolean,
                default: false,
            },
            password: {
                type: String,
            },
            salt: {
                type: String,
            },
            resetPasswordToken: {
                type: String,
            },
            resetPasswordExpires: {
                type: Number,
            },
        },
    },
    {
        collection: "user",
        versionKey: false,
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    let doc: any;
    doc = this;
    if (!doc.isModified("local.password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(doc.local.password, salt);
    // your application becomes.
    doc.local.salt = salt;
    doc.local.password = hash;

    doc.password = hash;
    doc.passwordConfirm = undefined;
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    let doc: any;
    doc = this;
    // Hashes the password sent by the user for login and checks if the hashed password stored in the
    // database matches the one sent. Returns true if it does else false.
    // const hash = await bcrypt.hash(password, doc.local.salt)
    // return doc.local.password === hash

    return await bcrypt.compare(password, doc.local.password);
    // const hash: string = crypto
    //     .pbkdf2Sync(password, doc.local.salt, 1000, 64, 'sha512')
    //     .toString('hex');

    // return doc.local.password === hash;
};

UserSchema.methods.generateJwt = function () {
    let user: any;
    user = this;
    return jwt.sign(
        {
            user: {
                _id: user._id,
                uid: user.local.uid,
            },
        },
        config.envConfig.jwtStrategy.secret
    );
};

export default connections.db.model<IUserModel>("UserModel", UserSchema);
