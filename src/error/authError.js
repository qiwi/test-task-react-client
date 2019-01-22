import {BaseError} from "./baseError";

export class AuthError extends BaseError {
    static BAD_CREDENTIALS = 'BAD_CREDENTIALS';

    constructor(code) {
        super(code);
        Object.setPrototypeOf(this, AuthError.prototype);
    }

}