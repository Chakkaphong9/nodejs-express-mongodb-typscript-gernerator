import { Router } from "express";
import AuthController from "../../controllers/AuthController";

class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routers();
    }

    public routers(): void {
        this.router.post("/craete-user-account", AuthController.createUserAccount.bind(AuthController));
        this.router.post("/login", AuthController.locaLogin.bind(AuthController));
    }
}

export default new AuthRouter();
