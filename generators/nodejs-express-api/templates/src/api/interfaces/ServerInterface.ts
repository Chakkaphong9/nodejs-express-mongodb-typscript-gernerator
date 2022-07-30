import * as express from "express";
import { HttpError } from "../config/error/index";

/**
 * @export
 * @interface IServer
 */
export interface IServer {
    app: express.Application;
}

/**
 * @export
 * @interface IConnectOptions
 */
export interface IConnectOptions {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    retryWrites: boolean;
    w: string;
}

/**
 *
 * @export
 * @interface CustomResponse
 * @extends {express.Response}
 */
export interface CustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message?: string) => void;
}
