
# Node.js Express API with TypeScript 4


![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

> Node.js Express API with TypeScript 4. Supports MongoDB

## Description
This generator will help you to build your own Node.js Express Mongodb API using TypeScript 4.

### Project Introduction
- suppot ES6/ES7 features
- using tslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Features
##### Authentication:
- passport local strategy
- jwt authentication
##### Session Storage:
- MongoDB
##### Integration testing
- mocha
- chai
- supertest

## Requirements

- node >= 14
- npm >= 6
- mongodb >= 4.0
- typescript >= 4.0

## Installation

First, install [Yeoman](http://yeoman.io) and generator-node-express-typescript-api using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-node-express-typescript-api
```

Then generate your new project:

```bash
  yo .\generators\nodejs-express-api\index.js
```
## App skeleton
```
.
├── LICENSE
├── README.md
├── nodemon.json
├── package.json
├── src
│   ├── api
│   │   ├── config
│   │   │   ├── connection
|   |   |   |   |── connection.ts
│   │   │   ├── cron
|   |   |   |   |── cron.ts
│   │   │   ├── env
|   |   |   |   |── defaults.ts
|   |   |   |   |── development.ts
|   |   |   |   |── index.ts
|   |   |   |   |── production.ts
│   │   │   └── error
|   |   |   |   |── index.ts
|   |   |   |   |── senHttpError.ts
│   │   │   └── middleware
|   |   |   |   |── middleware.ts
|   |   |   |   |── passport.ts
│   │   │   └── router
|   |   |   |   |── AuthRouter.ts
|   |   |   |   |── routes.ts
|   |   |   |   |── UserRouter.ts
│   │   │   └── server
|   |   |   |   |── index.ts
|   |   |   |   |── server.ts
|   |   |   |   |── serverHandlers.ts
│   │   ├── controllers
│   │   │   ├── AuthController.ts
│   │   │   ├── UserController.ts
│   │   ├── helper
│   │   │   ├── laguage.ts
│   │   ├── interfaces
│   │   │   ├── IAuthService.ts
│   │   │   ├── IUserService.ts
│   │   │   ├── ServerInterface.ts
│   │   ├── models
│   │   │   ├── UserModel.ts
│   │   ├── services
│   │   │   ├── AuthService
|   |   |   |   ├── AuthService.th
|   |   |   |   ├── AuthValidation.th
│   │   │   ├── UserService
|   |   |   |   ├── UserService.th
|   |   |   |   ├── UserValidation.th
│   ├── client
│   │   └── index.ejs
├── test
│   ├── fixtures
│   │   └── user.json
│   ├── api.js
│   ├── authentication.js
│   ├── index.js
├── swagger.json
├── swaggerDef.js
├── tsconfig.json
```
## Running the API
### Development
To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:
```
nodemon
```
Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:
```
pm2 start ./src/index.ts -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.

### Testing
To run integration tests: 
```bash
npm test
```

## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)

## Usage as OAuth2.0 Server
To use this generator as OAuth2.0 server you should implement client side, that will be handle your redirectUris and make requests to `/auth/token/` route. [Read more about OAuth2.0](https://alexbilbie.com/guide-to-oauth-2-grants/)
