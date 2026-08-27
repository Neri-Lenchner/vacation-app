import {Request, Response, NextFunction} from "express";

class LoggerMiddleware {
    public consoleLog(request: Request, response: Response, next: NextFunction): void {
        console.log(request.originalUrl);
        console.log(request.method);
        const sanitizedBody = { ...request.body };
        if (sanitizedBody.password) sanitizedBody.password = "***";
        console.log(sanitizedBody);
        next();
    }
}

export const loggerMiddleware = new LoggerMiddleware();