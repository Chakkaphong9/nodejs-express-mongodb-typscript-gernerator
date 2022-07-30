import * as express from "express";
import Cron from "../cron/cron";
import Middleware from "../middleware/middleware";
import Passport from "../middleware/passport";
import Routes from "../router/routes";

/**
 * @export
 * @class Server
 */
export class Server {
    // set app to be of type express.Application
    public app: express.Application;

    /**
     * Creates an instance of Server.
     * @memberof Server
     */
    constructor() {
        this.app = express();
        Cron.init();
        Middleware.init(this);
        Passport.init(this);
        Routes.init(this);
        Middleware.initErrorHandler(this);
    }
}

export default new Server().app;
