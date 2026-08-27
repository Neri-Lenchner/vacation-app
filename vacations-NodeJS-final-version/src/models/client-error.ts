import {StatusCode} from "./enums";

export abstract class BasicClientError {
    protected constructor(public status: StatusCode, public message: string) {}
}

export class RouteNotFound extends BasicClientError {
    constructor(route: string) {
        super(StatusCode.NotFound, `Route ${route} not found`);
    }
}

export class ResourceNotFound extends BasicClientError {
    constructor(id: number) {
        super(StatusCode.NotFound, `Resource ${id} not found`);
    }
}

export class ValidationError extends BasicClientError {
    constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}

export class AuthorizationError extends BasicClientError {
    constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}

export class ForbiddenError extends BasicClientError {
    constructor(message: string) {
        super(StatusCode.Forbidden, message);
    }
}