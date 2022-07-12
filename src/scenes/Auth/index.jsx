import React, { Component } from 'react';
// import Header from '../../components/Header';
import Landing from '../../views/Landing/index';

class Auth extends Component {
    state = {};
    render() {
        console.log('-----');
        return (
            <>
                <Landing {...this.props} />
            </>
        );
    }
}

export default Auth;
