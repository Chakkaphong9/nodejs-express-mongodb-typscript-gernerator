import * as express from 'express';
import UserRouter from './UserRouter';
import { IServer } from '../../interfaces/ServerInterface';
import AuthRouter from './AuthRouter';

/**
 * @export
 * @class Routes
 */
export default class Routes {
    /**
     * @static
     * @param {IServer} server
     * @memberof Routes
     */
    static init(server: IServer): void {
        const router: express.Router = express.Router();
        const prefixApplicationAPIs: string = "/v1";
        // users
        server.app.use(prefixApplicationAPIs + "/users", UserRouter.router);
        server.app.use(prefixApplicationAPIs + "/authenticate", AuthRouter.router);

        // index
        server.app.use('/', (req, res) => {
            res.render('index', {
                title: 'Hey',
                message: 'Hello there!'
            });
        });

        server.app.use(router);
    }
}
