import AppConsts from '../lib/appconst';
import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';
import utils from '../util/utils';
import Cookies from 'js-cookie';

import tokenAuthService from './tokenAuth/tokenAuthService';

const qs = require('qs');

const http = axios.create({
    baseURL: AppConsts.remoteServiceBaseUrl,
    timeout: 120000,
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            encode: false,
        });
    },
});

http.interceptors.request.use(
    function (config) {
        var token = tokenAuthService.getAccessToken();
        if (!!token) {
            config.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        if (response.data === 'Token Expired') {
            const originalRequest = response.config;

            originalRequest._retry = true;

            const refreshToken = tokenAuthService.getRefreshToken();

            return axios
                .post(
                    AppConsts.remoteServiceBaseUrl + 'api/auth/refresh-token',
                    {
                        refresh_token: refreshToken,
                    }
                )
                .then((result) => {
                    if (result.status === 200) {
                        const expdate = utils.getExpiryDate();

                        const newtoken = result.headers['x-auth-token'];
                        const newrfshtoken =
                            result.headers['x-auth-refresh-token'];

                        Cookies.set('access_token', newtoken, {
                            expires: expdate,
                        });

                        Cookies.set('refresh_token', newrfshtoken, {
                            expires: expdate,
                        });

                        originalRequest.headers['Authorization'] =
                            'Bearer ' + newtoken;

                        return http(originalRequest);
                    }
                })
                .catch(function (err) {
                    tokenAuthService.logout();
                    window.location.href = '/user';
                });
        } else return response;
    },
    (error) => {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        //both error must be log
        logger.log('Logging the error', error);

        if (!expectedError) {
            toast.error(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default http;
