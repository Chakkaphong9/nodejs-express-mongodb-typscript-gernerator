import * as passport from "passport";

import * as passportLocal from "passport-local";

import * as passportJWT from "passport-jwt";

import { default as config } from "../env/index";
import { IServer } from "../../interfaces/ServerInterface";
import UserModel from "../../models/UserModel";

export enum Roles {
    Admin = "admin",
    Manager = "manager",
    User = "user",
}

const LocalStrategy = passportLocal.Strategy;
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default class Passport {
    static init(server: IServer): void {
        // This verifies that the token sent by the user is valid
        passport.use(
            new JWTstrategy(
                {
                    // secret we used to sign our JWT
                    secretOrKey: config.envConfig.jwtStrategy.secret,
                    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                },
                async (token, done) => {
                    try {
                        // Pass the user details to the next middleware
                        UserModel.findById(token.user._id)
                            .then((data) => {
                                return done(undefined, data);
                            })
                            .catch((error: Error) => {
                                return done(error);
                            });
                    } catch (error) {
                        done(error);
                    }
                }
            )
        );

        // Create a passport middleware to handle User login
        passport.use(
            new LocalStrategy(
                {
                    usernameField: "email",
                    passwordField: "password",
                },
                async (email, password, done) => {
                    try {
                        // Find the user associated with the email provided by the user (incase-sensitive)
                        const user = await UserModel.findOne({
                            "local.email": {
                                $regex: new RegExp("^" + email.toLocaleLowerCase() + "$", "i"),
                            },
                        });
                        if (!user) {
                            // If the user isn't found in the database, return a message
                            return done(undefined, false, { message: "User not found" });
                        }
                        // Validate password and make sure it matches with the corresponding hash stored in the database
                        // If the passwords match, it returns a value of true.
                        const validate = await user.isValidPassword(password);
                        if (!validate) {
                            return done(undefined, false, { message: "Wrong Password" });
                        }
                        // Send the user information to the next middleware
                        return done(undefined, user, { message: "Logged in Successfully" });
                    } catch (error) {
                        return done(error);
                    }
                }
            )
        );

        server.app.use(passport.initialize());
    }

    public static authenticateJWT() {
        return passport.authenticate("jwt", { session: false });
    }

    public static authorize(roles = []) {
        // roles param can be a single role string (e.g. Role.User or 'User')
        // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
        if (typeof roles === "string") {
            roles = [roles];
        }

        return [
            (req, res, next) => {
                if (roles.length && !roles.includes(req.user.role)) {
                    // user's role is not authorized
                    return res.status(401).json({ message: "Unauthorized" });
                }

                // authentication and authorization successful
                next();
            },
        ];
    }
}
