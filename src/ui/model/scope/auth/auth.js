import {AuthApiService} from '../../../../api/auth';
import ls from '../../../../storage/localStorage';
import Machine from '@qiwi/cyclone';
import {AuthError} from "../../../../error/authError";

const OK = 'ok';
const LOADING = 'loading';
const NOT_AUTH = 'not_auth';
const INITIAL = 'init';
const AUTH_ERROR = 'login_error';
const AUTH_SUBMITTING = 'auth_submitting';
const machine = new Machine({
    initialState: INITIAL,
    initialData: {
        auth: {
            jwt: ''
        },
        error: {
            userMessage: ''
        }
    },
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
        next(prev, next, ...payload) {
            return machine.next(next, ...payload).current()
        }
    },
    effects: {
        async login({email, password}) {
            this.next(AUTH_SUBMITTING);
            try {
                const jwt = await auth.login(email, password);
                this.next(OK, {
                    auth: {
                        jwt
                    }
                });
                ls.setItem('jwt', jwt);
            } catch (err) {
                if (err instanceof AuthError && err.code === AuthError.BAD_CREDENTIALS) {
                    this.next(AUTH_ERROR, {error: {...err, userMessage: 'Пожалуйста, проверьте введенные логин и пароль.'}});
                    return;
                }
                this.next(AUTH_ERROR, {error: {...err, userMessage: 'Что-то пошло не так'}});
            }
        },
        checkAuth() {
            this.next(LOADING);
            let jwt = ls.getItem('jwt');
            if (!jwt) {
               return this.logout();
            }
            this.next(OK);
        },
        logout() {
            ls.removeItem('jwt');
            return this.next(NOT_AUTH);
        }
    },
    selectors: (slice, createSelector, hasProps) => ({
        isLoading() {
            return slice(auth => {
                return auth.state === LOADING
            });
        },
        isLoggedIn() {
            return slice(auth => {
                return auth.state === OK;
            })
        },
        isInitial() {
            return slice(auth => {
                return auth.state === INITIAL;
            })
        },
        isLoginError() {
            return slice(auth => {
                return auth.state === AUTH_ERROR;
            })
        },
        isAuthSubmitting() {
            return slice(auth => {
                return auth.state === AUTH_SUBMITTING;
            })
        },
        getErrorMessage() {
            return slice(auth => {
                return (auth.data && auth.data.error && auth.data.error.userMessage) || undefined;
            })
        }
    })
}
