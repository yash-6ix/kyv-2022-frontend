import React, { Component } from 'react';
// import styled from 'styled-components';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import tokenAuthService from '../../../services/tokenAuth/tokenAuthService';
import utils from '../../../util/utils';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';

class TroubleSigningIn extends Component {
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

    submitUserPasswordResetRequest = async () => {
        this.setState({ loading: true });
        const { email } = this.state;

        if (!(email && utils.validateEmail(this.state.email))) {
            toast.error('Please enter a valid email address.');
            this.setState({ loading: false });
            return;
        }
        const verrors = await tokenAuthService.resetPasswordRequest({
            email,
        });
        this.setState({ errors: verrors || {} });

        if (this.state.errors.apierror) {
            toast.error(verrors.apierror);
            this.setState({ loading: false });
            return;
        }

        this.setState({ loading: false });
        const redirectTo = '/user/trouble-signing-in-success';
        this.props.history.push(redirectTo);
    };

    render() {
        return (
            <>
                <Input
                    wrapperClassName="mb-10"
                    name="email"
                    id="email"
                    label="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.updateValue}
                />

                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <button
                        onClick={this.submitUserPasswordResetRequest}
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

export default TroubleSigningIn;
