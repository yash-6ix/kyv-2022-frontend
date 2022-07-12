import React, { Component } from 'react';
// import styled from 'styled-components';
import { toast } from 'react-toastify';
import tokenAuthService from '../../../services/tokenAuth/tokenAuthService';
import utils from '../../../util/utils';
import { Link } from 'react-router-dom';

class ResetPasswordSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }
    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitUserPasswordReset = async () => {
        const { email } = this.state;

        if (!(email && utils.validateEmail(this.state.email))) {
            toast.error('Please enter a valid email address.');
            return;
        }
        const verrors = await tokenAuthService.signup({
            email,
        });
        this.setState({ errors: verrors || {} });

        if (this.state.errors.apierror) {
            toast.error(verrors.apierror);
            return;
        }
        const rediretTo = '/user/login';
        this.props.history.push(rediretTo);
    };

    render() {
        return (
            <>
                <h3 className="text-base font-body text-brand-neutral-600">
                    Your password has been reset!
                </h3>
                <Link
                    onClick={this.submitUserPasswordResetRequest}
                    className="flex justify-center w-full py-2 mt-4 text-lg font-bold transition bg-brand-olive-900 hover:bg-brand-olive-800 active:bg-brand-olive-700 font-body text-brand-white rounded-xl"
                    to="/user/login"
                >
                    Return to Login
                </Link>
            </>
        );
    }
}

export default ResetPasswordSuccess;
