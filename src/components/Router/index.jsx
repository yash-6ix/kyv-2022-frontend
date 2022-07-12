import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { setInitUrl } from '../../store/actions/authAction';

import ProtectedRoute from './ProtectedRoute';
import utils from '../../util/utils';
// import Header from '../Header';

const Router = (props) => {
    const dispatch = useDispatch();
    const { authUser, initURL } = useSelector(({ auth }) => auth);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (initURL === '') {
            dispatch(setInitUrl(location.pathname));
        }
    });

    useEffect(() => {
        if (location.pathname === '/') {
            if (authUser === null) {
                history.push('/user');
            } else if (initURL === '' || initURL === '/') {
                history.push('/user');
            } else {
                history.push(initURL);
            }
        }
    }, [authUser, initURL, location, history]);

    const AnonymousUserLayout = utils.getRoute('/user').component;
    const AuthenticatedUserLayout = utils.getRoute('/').component;
    console.log('-------------3--------------');
    return (
        <Switch>
            <Route 
                path="/user" 
                render={(props) => {
                    return <AnonymousUserLayout {...props} />
                }} />
            <ProtectedRoute
                path="/"
                render={(props) => {
                    return <AuthenticatedUserLayout {...props} exact />;
                }}
            />
        </Switch>
    );
};

export default memo(Router);
