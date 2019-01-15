export class AuthError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, AuthError);
    }
}