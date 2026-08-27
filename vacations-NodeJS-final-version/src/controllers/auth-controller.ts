import express, {Request, Response} from "express";
import {StatusCode} from "../models/enums";
import {User} from "../models/user.model";
import {authService} from "../services/auth-service";
import {Credentials} from "../models/credentials.model";

class AuthController {

    router = express.Router();

    constructor() {
        this.router.post("/api/auth/register", this.register);
        this.router.post("/api/auth/login", this.login);
    }

    public async register(request: Request, response: Response): Promise<void> {
        const user: User = new User(request.body);
        const token: string = await authService.register(user);
        response.status(StatusCode.Created).json({token});
    }

    public async login(request: Request, response: Response): Promise<void> {
        const credentials: Credentials = new Credentials(request.body);
        const token: string = await authService.login(credentials);
        response.status(StatusCode.OK).json({token});
    }

}

export const authController = new AuthController();