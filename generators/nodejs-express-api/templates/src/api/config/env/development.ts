/**
 * development config
 * will replace database config if NODE_ENV === 'development'
 */
export const envConfig: any = {
    database: {
        MONGODB_URI: "", // fix me
        MONGODB_DB_MAIN: "" // fix me
    },
    jwtStrategy: {
        secret: "secret", // fix me
        expiresTime: 3600000 // fix me
    }
};
