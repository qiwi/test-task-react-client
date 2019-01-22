import {AuthError} from "../../error/authError";
import {LoginHttpClient} from "../loginHttpClient";

const API_CODE_TO_AUTH_ERROR_CODE = {
    'ERROR_LOGIN_FAILED': AuthError.BAD_CREDENTIALS
};

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
            throw new AuthError(API_CODE_TO_AUTH_ERROR_CODE[errorBody && errorBody.error], errorBody);
        }

    }
}