import {AuthError} from "../../error/authError";
import {LoginHttpClient} from "../loginHttpClient";

const ERROR_LOGIN_FAILED = 'ERROR_LOGIN_FAILED';

export class AuthApiService {
    constructor() {
        this.client = new LoginHttpClient();
    }

    async login(email, password) {
        try {
            const apiResponse = await this.client.post('public/auth/login', {
                email,
                password
            });
            return apiResponse.result;
        } catch (err) {
            let errorBody;
            if (err && err.response && err.response.json) {
                errorBody = await err.response.json();
            }
            switch (errorBody && errorBody.error) {
                case ERROR_LOGIN_FAILED:
                    throw new AuthError(AuthError.BAD_CREDENTIALS, errorBody);
                default:
                    throw new AuthError(AuthError.API_ERROR, errorBody);
            }
        }

    }
}