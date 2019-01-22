import {HttpService} from '@qiwi/let-fly-at-http/build';
import config from '../config';

export class LoginHttpClient extends HttpService {
    constructor() {
        super(config.apiUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }, 5000);
    }
}