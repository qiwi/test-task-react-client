import {HttpService} from '@qiwi/let-fly-at-http';
import config from '../../config';

const httpClient = new HttpService(config.apiUrl, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: 'include'
});

export default {
    async login(email, password) {
        const apiResponse = await httpClient.post('public/auth/login', {
            email,
            password
        });
        return apiResponse.result;
    }
}