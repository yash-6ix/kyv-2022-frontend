import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { userSignup, userLogin } from '../../store/actions/authAction';
import Login from '../../scenes/Auth/Login';
import Signup from '../../scenes/Auth/Signup';

import ResetPassword from '../../scenes/Auth/ResetPassword';
import ResetPasswordSuccess from '../../scenes/Auth/ResetPasswordSuccess';
import TroubleSigningIn from '../../scenes/Auth/TroubleSigningIn';
import TroubleSigningInSuccess from '../../scenes/Auth/TroubleSigningInSuccess';

// import Spinner from '../../components/Spinner';
import { CheckmarkSVG, IllustrationSVG } from '../../components/SVG';

// import { AnimatePresence } from 'framer-motion';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
            alert('Pleae enter a valid email address.');
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
        if (e.key === 'Enter') {
            this.submitUserSignup();
        }
    };

    _handleKeyDown2 = (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            this.submitPassword();
        }
    };
    render() {
        const { location } = this.props;
        const isSignup = !location.pathname.localeCompare('/user/signup');
        const isTroubleSigningIn = !location.pathname.localeCompare(
            '/user/trouble-signing-in'
        );
        const isTroubleSigningInSuccess = !location.pathname.localeCompare(
            '/user/trouble-signing-in-success'
        );
        const isResetPassword = !location.pathname.localeCompare(
            '/user/reset-password'
        );
        const isResetPasswordSuccess = !location.pathname.localeCompare(
            '/user/reset-password-success'
        );
        return (
            <div className="flex items-start justify-center flex-1 w-full p-8 md:items-center bg-brand-neutral-25">
                <div className="flex flex-col md:border md:shadow-xl md:flex-row rounded-xl border-brand-neutral-100 w-224 h-128">
                    <div className="flex flex-col items-center justify-center w-full h-auto pb-2 md:p-12 md:h-full md:w-1/2 bg-brand-neutral-25 rounded-l-xl">
                        <div className="order-2 w-36 h-36 md:w-48 md:h-48 md:mb-10">
                            <IllustrationSVG />
                        </div>
                        <div className="order-1 mb-6 md:order-3 md:m-0">
                            <h2 className="text-xl font-bold tracking-tighter text-center md:text-2xl md:text-left font-body text-brand-olive-900">
                                Delphic Research
                            </h2>
                            <h2 className="text-center md:text-lg md:text-left font-body text-brand-neutral-600">
                                On-demand knowledge solutions for government affairs professionals
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-full h-auto pt-6 pb-12 border-t md:p-12 md:border-t-0 md:border-l md:w-1/2 md:h-full md:rounded-r-xl md:bg-brand-white border-brand-neutral-100">
                        <div className="flex flex-row items-center space-x-2">
                            {isResetPasswordSuccess && (
                                <CheckmarkSVG className="w-6 fill-current text-brand-olive-600" />
                            )}

                            <h2 className="text-xl font-bold tracking-tighter md:text-2xl font-body text-brand-olive-900">
                                {isSignup
                                    ? 'Create an Account'
                                    : isTroubleSigningIn
                                    ? 'Enter your email to reset your password'
                                    : isTroubleSigningInSuccess
                                    ? 'Check your email'
                                    : isResetPassword
                                    ? 'Reset your password'
                                    : isResetPasswordSuccess
                                    ? 'Success!'
                                    : 'Log In to Your Account'}
                            </h2>
                        </div>
                        {this.props.emailSignupSuccess ? (
                            <>
                                <T2>
                                    Enter the password you recieved in your
                                    email:
                                </T2>
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
                                <Submit onClick={this.submitUserLogin}>
                                    Submit
                                </Submit>
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
                    </div>
                </div>
            </div>
        );

        //         <Main>
        //         <Panel>
        //   <Left>
        //     <T0>Welcome to PublicSquare's Base App</T0>
        //   </Left>

        //   <Right>

        //   </Right>
        // </Panel>
        //     </Main>

        // if (this.props.emailSignupSuccess) {
        //   return (
        //     <Main>
        //     </Main>
        //   )
        // } else {
        //   return (
        //     <Main>
        //     </Main>
        //   )
        // }
    }
}

const Input = styled.input`
    border: 1px solid blue;
    background: transparent;
    font-size: 16px;
    padding: 8px;
    border-radius: 3px;
    margin-bottom: 10px;
    font-family: 'Raleway', sans-serif;

    ::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: #bbb;
        font-family: 'Raleway', sans-serif;
    }
`;

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

// const Panel = styled.div`
//     background-color: white;
//     display: flex;
//     padding: 40px 20px;
//     border-radius: 3px;

//     @media (max-width: 600px) {
//         flex-direction: column;
//     }
// `;

// const Left = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 10px;
//     padding-right: 40px;
//     border-right: 1px solid #ddd;
//     max-width: 340px;

//     @media (max-width: 600px) {
//         border-right: 0;
//         border-bottom: 1px solid #ddd;
//         padding-right: 10px;
//     }
// `;

// const T0 = styled.p`
//     font-size: 34px;
//     margin-bottom: 20px;
//     margin-top: 20px;
// `;

// const Right = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     padding: 10px;
//     padding-left: 40px;

//     @media (max-width: 600px) {
//         padding-left: 10px;
//         padding-right: 10px;
//     }
// `;

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
