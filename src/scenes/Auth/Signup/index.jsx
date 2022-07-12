import React, { Component } from 'react';
// import styled from 'styled-components';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import tokenAuthService from '../../../services/tokenAuth/tokenAuthService';
import utils from '../../../util/utils';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';

class Signup extends Component {
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

    submitUserSignup = async () => {
        const { firstname, lastname, email, password } = this.state;

        if (!(firstname && firstname.length >= 1)) {
            toast.error('Please enter a firstname.');
            return;
        }
        if (!(lastname && lastname.length >= 1)) {
            toast.error('Please enter a lastname.');
            return;
        }

        if (!(email && utils.validateEmail(this.state.email))) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!(password && password.length >= 8)) {
            toast.error('Password length must be equal or greater than 8.');
            return;
        }

        const verrors = await tokenAuthService.signup({
            firstname,
            lastname,
            email,
            password,
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
                <Input
                    wrapperClassName="mb-10"
                    name="firstname"
                    id="firstname"
                    label="First Name"
                    type="text"
                    value={this.state.firstname}
                    onChange={this.updateValue}
                />
                <Input
                    wrapperClassName="mb-10"
                    name="lastname"
                    id="lastname"
                    label="Last Name"
                    type="text"
                    value={this.state.lastname}
                    onChange={this.updateValue}
                />
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

                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <button
                        onClick={this.submitUserSignup}
                        className="w-full py-2 text-lg font-bold transition bg-brand-olive-900 hover:bg-brand-olive-800 active:bg-brand-olive-700 font-body text-brand-white rounded-xl"
                    >
                        Sign Up
                    </button>
                )}
                <div className="flex items-center justify-center w-full mt-6 space-x-4">
                    <span className="text-sm font-body text-brand-neutral-600">
                        Already have an account?
                    </span>
                    <Link
                        to="/user/login"
                        className="text-sm font-bold transition text-brand-bronze-600 hover:text-brand-bronze-500 active:text-brand-bronze-400 font-body"
                    >
                        Sign In
                    </Link>
                </div>
            </>
        );
    }
}

export default Signup;
