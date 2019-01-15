import {HttpService} from '@qiwi/let-fly-at-http';
import config from '../../config';
import {AuthError} from "../../error/authError";

const httpClient = new HttpService(config.apiUrl, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: 'include'
});

const ERROR_LOGIN_FAILED = 'ERROR_LOGIN_FAILED';

export default {
    async login(email, password) {
        try {
            const apiResponse = await httpClient.post('public/auth/login', {
                email,
                password
            });
            return apiResponse.result;
        } catch (err) {
            let responseBody;
            if (err && err.response && err.response.json) {
                responseBody = await err.response.json();
            }
            if (responseBody && responseBody.error === ERROR_LOGIN_FAILED) {
                throw new AuthError(AuthError.BAD_CREDENTIALS);
            }
            throw new AuthError(AuthError.API_ERROR);
        }

    }
}