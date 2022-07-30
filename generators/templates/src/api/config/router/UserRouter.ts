import UserController from "../../controllers/UserController";
import { Router } from "express";

/**
 * @export
 * @class UserRouter
 */
class UserRouter {
    public router: Router;

    /**
     * Creates an instance of UserRouter.
     * @memberof UserRouter
     */
    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * @memberof UserRouter
     */
    public routes(): void {
        this.router.post("/forgot-password", UserController.forgotPassword.bind(UserController));
        this.router.post("/reset-password", UserController.resetPassword.bind(UserController));
    }
}

export default new UserRouter();
