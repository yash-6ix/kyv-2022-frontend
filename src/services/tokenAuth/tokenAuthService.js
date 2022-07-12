import Cookies from 'js-cookie';
import http from '../httpService';
import utils from '../../util/utils';
class TokenAuthService {
    //check if user is authenticated
    isAuthenticated() {
        let data = Cookies.get('access_token');
        if (!data) return false;
        return true;
    }

    getAccessToken = () => Cookies.get('access_token');
    getRefreshToken = () => Cookies.get('refresh_token');

    //login with username and password
    async login(model) {
        try {
            const result = await http.post('/api/auth/login', {
                email: model.email,
                password: model.password,
            });
            const expdate = utils.getExpiryDate();
            Cookies.set('access_token', result.headers['x-auth-token'], {
                expires: expdate,
            });

            Cookies.set(
                'refresh_token',
                result.headers['x-auth-refresh-token'],
                {
                    expires: expdate,
                }
            );

            return {};
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }

    async signup(model) {
        try {
            const result = await http.post('/api/users', {
                firstname: model.firstname,
                lastname: model.lastname,
                email: model.email,
                password: model.password,
            });
            console.log(result);
            // console.log("{---=--result.headers----",result.headers["x-auth-token"]);
            // const expdate = utils.getExpiryDate();
            // Cookies.set("access_token", result.headers["x-auth-token"], {
            //   expires: expdate,
            // });

            // Cookies.set("refresh_token", result.headers["x-auth-refresh-token"], {
            //   expires: expdate,
            // });

            return {};
        } catch (ex) {
            console.log('----ex----', ex);
            return { apierror: ex.response.data };
        }
    }

    async resetPasswordRequest(model) {
        try {
            const result = await http.put('/api/auth/reset-password-request', {
                email: model.email,
            });
            console.log(result);
            // console.log("{---=--result.headers----",result.headers["x-auth-token"]);
            // const expdate = utils.getExpiryDate();
            // Cookies.set("access_token", result.headers["x-auth-token"], {
            //   expires: expdate,
            // });

            // Cookies.set("refresh_token", result.headers["x-auth-refresh-token"], {
            //   expires: expdate,
            // });

            return {};
        } catch (ex) {
            console.log('----ex----', ex);
            return { apierror: ex.response.data };
        }
    }

    async resetPassword(model) {
        try {
            const result = await http.put(
                `/api/users/reset-password?tkn=${model.tkn}`,
                {
                    password: model.password,
                }
            );
            console.log(result);
            // console.log("{---=--result.headers----",result.headers["x-auth-token"]);
            // const expdate = utils.getExpiryDate();
            // Cookies.set("access_token", result.headers["x-auth-token"], {
            //   expires: expdate,
            // });

            // Cookies.set("refresh_token", result.headers["x-auth-refresh-token"], {
            //   expires: expdate,
            // });

            return {};
        } catch (ex) {
            console.log('----ex----', ex);
            return { apierror: ex.response.data };
        }
    }

    //logout - clean all storages n cookies
    logout() {
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('access_token');
    }
}

export default new TokenAuthService();
