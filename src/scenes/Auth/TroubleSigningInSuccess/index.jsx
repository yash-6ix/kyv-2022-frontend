import React, { Component } from 'react';
// import styled from 'styled-components';

class TroubleSigningInSuccess extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <>
                <h3 className="text-base font-body text-brand-neutral-600">
                    You should recieve an email soon with a link to reset your
                    password.
                </h3>
                {/* <Input
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
                </div> */}
            </>
        );
    }
}

export default TroubleSigningInSuccess;
