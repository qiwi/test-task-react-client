export class AuthError extends Error {
    static BAD_CREDENTIALS = 'BAD_CREDENTIALS';
    static API_ERROR = 'API_ERROR';
    constructor(code) {
        super(code);
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}