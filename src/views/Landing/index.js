import React, { Component } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { userSignup, userLogin } from "../../store/actions/authAction";
import Login from "../../scenes/Auth/Login";
import Signup from "../../scenes/Auth/Signup";

import ResetPassword from "../../scenes/Auth/ResetPassword";
import ResetPasswordSuccess from "../../scenes/Auth/ResetPasswordSuccess";
import TroubleSigningIn from "../../scenes/Auth/TroubleSigningIn";
import TroubleSigningInSuccess from "../../scenes/Auth/TroubleSigningInSuccess";

// import Spinner from '../../components/Spinner';
import { CheckmarkSVG } from "../../components/SVG";
import { ThemePageBg } from "../../components/ThemePageBg";
import { ThemeContainer } from "../../components/ThemeContainer";

// import { AnimatePresence } from 'framer-motion';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
        };
    }

    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitUserSignup = () => {
        if (this.state.email.length > 0 && this.validateForm()) {
            // this.setState({
            //   loading: true,
            // })
            // setTimeout(() => {
            //   this.setState({
            //     loading: false,
            //   })
            // }, 1000)

            console.log(this.state);

            this.props.userSignup(this.state.email, this.state.password);
        } else {
            alert("Pleae enter a valid email address.");
        }
    };

    submitUserLogin = () => {
        this.props.userLogin(this.state.email, this.state.password);
    };

    validateForm = () => {
        const re =
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    };

    _handleKeyDown1 = (e) => {
        console.log(e.key);
        if (e.key === "Enter") {
            this.submitUserSignup();
        }
    };

    _handleKeyDown2 = (e) => {
        console.log(e.key);
        if (e.key === "Enter") {
            this.submitPassword();
        }
    };
    render() {
        const { location } = this.props;
        const isSignup = !location.pathname.localeCompare("/user/signup");
        const isTroubleSigningIn = !location.pathname.localeCompare("/user/trouble-signing-in");
        const isTroubleSigningInSuccess = !location.pathname.localeCompare(
            "/user/trouble-signing-in-success"
        );
        const isResetPassword = !location.pathname.localeCompare("/user/reset-password");
        const isResetPasswordSuccess = !location.pathname.localeCompare(
            "/user/reset-password-success"
        );
        return (
            <>
                <ThemePageBg>
                    <ThemeContainer>
                        <Inner>
                            {isResetPasswordSuccess && (
                                <CheckmarkSVG className="w-6 fill-current text-brand-olive-600" />
                            )}

                            <H2>
                                {isSignup
                                    ? "Create an Account"
                                    : isTroubleSigningIn
                                    ? "Enter your email to reset your password"
                                    : isTroubleSigningInSuccess
                                    ? "Check your email"
                                    : isResetPassword
                                    ? "Reset your password"
                                    : isResetPasswordSuccess
                                    ? "Success!"
                                    : "Candidates, Staff & Admin Panel"}
                            </H2>
                            {this.props.emailSignupSuccess ? (
                                <>
                                    <T2>Enter the password you recieved in your email:</T2>
                                    <T3>Please check your spam.</T3>
                                    <Input
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.updateValue}
                                        placeholder="Email address..."
                                        disabled={true}
                                    />
                                    <Input
                                        value={this.state.password}
                                        name="password"
                                        type="password"
                                        onChange={this.updateValue}
                                        placeholder="Password"
                                        onKeyDown={() => this._handleKeyDown2}
                                    />
                                    <Submit onClick={this.submitUserLogin}>Submit</Submit>
                                </>
                            ) : isSignup ? (
                                <Signup {...this.props} />
                            ) : isTroubleSigningIn ? (
                                <TroubleSigningIn {...this.props} />
                            ) : isTroubleSigningInSuccess ? (
                                <TroubleSigningInSuccess {...this.props} />
                            ) : isResetPassword ? (
                                <ResetPassword {...this.props} />
                            ) : isResetPasswordSuccess ? (
                                <ResetPasswordSuccess {...this.props} />
                            ) : (
                                <Login {...this.props} />
                            )}
                            {/* </div> */}
                        </Inner>
                    </ThemeContainer>
                </ThemePageBg>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    let stateBuilder = {};
    if (state.auth.allCoins) stateBuilder.allCoins = state.auth.allCoins;
    if (state.auth.emailSignupSuccess) stateBuilder.emailSignupSuccess = true;

    return stateBuilder;
};

const mapDispatchToProps = (dispatch) => {
    return {
        // Returns a promise
        userSignup: (email, password) => dispatch(userSignup(email, password)),
        userLogin: (email, password) => dispatch(userLogin(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

const Inner = styled.div`
    min-width: 300px;
    padding: 20px;
`;

const H2 = styled.h2`
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 20px;
    max-width: 400px;
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid blue;
    background: transparent;
    font-size: 16px;
    padding: 8px;
    border-radius: 3px;
    margin-bottom: 10px;
    font-family: "Raleway", sans-serif;

    ::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: #bbb;
        font-family: "Raleway", sans-serif;
    }
`;

const T2 = styled.p`
    font-size: 18px;
    font-weight: 500;
    margin-top: 0;
    max-width: 250px;
`;

const T3 = styled.p`
    font-size: 12px;
    margin-top: 0;
`;

const Submit = styled.button`
    margin-top: 10px;
    border: none;
    background-color: blue;
    color: white;
    font-size: 16px;
    padding: 8px 20px;
    border-radius: 3px;
`;
