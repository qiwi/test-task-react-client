export class BaseError extends Error {
    static API_ERROR = 'API_ERROR';

    constructor(code=BaseError.API_ERROR, details) {
        super(code);
        this.code = code;
        this.details = details;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}