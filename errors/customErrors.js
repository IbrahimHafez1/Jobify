import { StatusCodes } from "http-status-codes";

export class notFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
        this.name = "notFoundError";
    }
}
export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.name = "BadRequestError";
    }
}
export class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.name = "unAuthenticatedError";
    }
}
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
        this.name = "UnauthorizedError";
    }
}