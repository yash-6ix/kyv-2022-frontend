import React, { Component } from 'react';
// import styled from 'styled-components';
import Spinner from '../../../components/Spinner';
import tokenAuthService from '../../../services/tokenAuth/tokenAuthService';
import utils from '../../../util/utils';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitUserLogin = async () => {
        // if (this.state.email.length > 0 && this.validateForm()) {
        //   // this.setState({
        //   //   loading: true,
        //   // })
        //   // setTimeout(() => {
        //   //   this.setState({
        //   //     loading: false,
        //   //   })
        //   // }, 1000)

        //   console.log(this.state)

        //   this.props.userSignup(this.state.email, this.state.password)
        // } else {
        //   alert('Pleae enter a valid email address.')
        // }
        const { email, password } = this.state;
        if (!(email && utils.validateEmail(this.state.email))) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!(password && password.length >= 8)) {
            toast.error('Password length must be equal or greater than 8.');
            return;
        }

        const verrors = await tokenAuthService.login({ email, password });
        this.setState({ errors: verrors || {} });

        if (this.state.errors.apierror) {
            toast.error(verrors.apierror);
            return;
        }
        const { state } = this.props.location;

        let dashboard = utils.getLoggedUserRedirectURL();
        const rediretTo = state
            ? state.from.pathname === '/'
                ? dashboard
                : state.from.pathname
            : dashboard;
        this.props.history.push(rediretTo);
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
                <Input
                    wrapperClassName="mb-10"
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.updateValue}
                />
                <div className="flex items-center justify-end w-full mt-2 mb-6 space-x-4">
                    <Link
                        to="/user/trouble-signing-in"
                        className="text-sm font-bold transition text-brand-olive-900 hover:text-brand-olive-800 active:text-brand-olive-700 font-body"
                    >
                        Forgot Password
                    </Link>
                </div>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <button
                        onClick={this.submitUserLogin}
                        className="w-full py-2 text-lg font-bold transition bg-brand-olive-900 hover:bg-brand-olive-800 active:bg-brand-olive-700 font-body text-brand-white rounded-xl"
                    >
                        Sign In
                    </button>
                )}
                <div className="flex items-center justify-center w-full mt-6 space-x-4">
                    <span className="text-sm font-body text-brand-neutral-600">
                        Don't have an account?
                    </span>
                    <Link
                        to="/user/signup"
                        className="text-sm font-bold transition text-brand-bronze-600 hover:text-brand-bronze-500 active:text-brand-bronze-400 font-body"
                    >
                        Sign Up
                    </Link>
                </div>
            </>
        );
    }
}

export default Login;
