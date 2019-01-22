import {BaseError} from "./baseError";

export class AuthError extends BaseError {
    static BAD_CREDENTIALS = 'BAD_CREDENTIALS';

    constructor(props) {
        super(props);
        Object.setPrototypeOf(this, AuthError.prototype);
    }

}