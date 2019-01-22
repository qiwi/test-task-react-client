import {AuthApiService} from '../../api/auth';
import ls from '../../storage/localStorage';
import Machine from '@qiwi/cyclone';
import {AuthError} from "../../error/authError";

const OK = 'ok';
const LOADING = 'loading';
const NOT_AUTH = 'not_auth';
const INITIAL = 'init';
const AUTH_ERROR = 'login_error';
const AUTH_SUBMITTING = 'auth_submitting';
const machine = new Machine({
    initialState: INITIAL,
    initialData: {},
    transitions: {
        'init>loading': true,
        'loading>ok': true,
        'loading>not_auth': true,
        'not_auth>auth_submitting': true,
        'auth_submitting>login_error': (state, res) => res,
        'login_error>auth_submitting': true,
        'auth_submitting>ok': (state, res) => res
    }
});

const auth = new AuthApiService();

export default {
    state: machine.current(),
    reducers: {
        logout() {
            ls.removeItem('jwt');
            return {
                status: NOT_AUTH
            }
        },
        next(prev, next, ...payload) {
            return machine.next(next, ...payload).current()
        }
    },
    effects: {
        async login({email, password}) {
            this.next(AUTH_SUBMITTING);
            try {
                const jwt = await auth.login(email, password);
                this.next(OK, jwt);
                ls.setItem('jwt', jwt);
            } catch (err) {
                if (err instanceof AuthError && err.code === AuthError.BAD_CREDENTIALS) {
                    this.next(AUTH_ERROR, {message: 'Пожалуйста, проверьте введенные логин и пароль.'});
                    return;
                }
                this.next(AUTH_ERROR, {...err, message: 'Что-то пошло не так'});
            }
        },
        async checkAuth() {
            this.next(LOADING);
            let jwt = ls.getItem('jwt');
            if (!jwt) {
                this.logout();
                return this.next(NOT_AUTH);
            }
            this.next(OK);
        }
    },
    selectors: (slice, createSelector, hasProps) => ({
        loading() {
            return slice(auth => {
                return auth.state === LOADING
            });
        },
        loggedIn() {
            return slice(auth => {
                return auth.state === OK;
            })
        },
        initial() {
            return slice(auth => {
                return auth.state === INITIAL;
            })
        },
        loginError() {
            return slice(auth => {
                return auth.state === AUTH_ERROR;
            })
        },
        authSubmitting() {
            return slice(auth => {
                return auth.state === AUTH_SUBMITTING;
            })
        }
    })
}
