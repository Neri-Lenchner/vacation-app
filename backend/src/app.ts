import express from "express";
import cors from "cors";
import {loggerMiddleware} from "./middleware/logger-middleware";
import {errorMiddleware} from "./middleware/error-middleware";
import {authController} from "./controllers/auth-controller";
import {userController} from "./controllers/user-controller";
import {vacationController} from "./controllers/vacation-controller";
import {followersController} from "./controllers/followers-controller";
import {appConfig} from "./utils/app-config";


class App {
    public start(): void {

        const server = express();
        server.use(cors());
        server.use(express.json());
        server.use(loggerMiddleware.consoleLog);
        server.use(authController.router);
        server.use(userController.router);
        server.use(vacationController.router);
        server.use(followersController.router);
        server.use(errorMiddleware.serverError);
        server.use(errorMiddleware.catchAll);

        server.listen(appConfig.port, (): void => console.log(`Server is running on port ${appConfig.port}`));
    }
}

const app = new App();
app.start();
