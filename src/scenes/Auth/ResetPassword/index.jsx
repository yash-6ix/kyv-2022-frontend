import React, { Component } from 'react';
// import styled from 'styled-components';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import tokenAuthService from '../../../services/tokenAuth/tokenAuthService';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirmation: '',
        };
    }
    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitUserPasswordReset = async () => {
        const { password, passwordConfirmation } = this.state;
        if (!(password && password.length >= 8)) {
            toast.error('Password length must be equal or greater than 8.');
            return;
        }
        if (password.localeCompare(passwordConfirmation) !== 0) {
            toast.error("Passwords don't match.");
            return;
        }

        const urlSearchParams = new URLSearchParams(this.props.location.search);
        const { tkn } = Object.fromEntries(urlSearchParams.entries());

        const verrors = await tokenAuthService.resetPassword({ password, tkn });
        this.setState({ errors: verrors || {} });

        if (this.state.errors.apierror) {
            toast.error(verrors.apierror);
            return;
        }
        const redirectTo = '/user/reset-password-success';
        this.props.history.push(redirectTo);
    };

    render() {
        return (
            <>
                <Input
                    wrapperClassName="mb-10"
                    name="password"
                    id="password"
                    label="New Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.updateValue}
                />
                <Input
                    wrapperClassName="mb-10"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    label="Confirm New Password"
                    type="password"
                    value={this.state.passwordConfirmation}
                    onChange={this.updateValue}
                />

                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <button
                        onClick={this.submitUserPasswordReset}
                        className="w-full py-2 text-lg font-bold transition bg-brand-olive-900 hover:bg-brand-olive-800 active:bg-brand-olive-700 font-body text-brand-white rounded-xl"
                    >
                        Reset
                    </button>
                )}
                <div className="flex items-center justify-center w-full mt-6 space-x-4">
                    <Link
                        to="/user/login"
                        className="text-sm font-bold transition text-brand-olive-900 hover:text-brand-olive-800 active:text-brand-olive-700 font-body"
                    >
                        Cancel
                    </Link>
                </div>
            </>
        );
    }
}

export default ResetPassword;
