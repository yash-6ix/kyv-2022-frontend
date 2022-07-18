import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie'

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }) => {
    let data = Cookies.get('access_token');
    return (
        <Route
            {...rest}
            render={props => {
                const isauth = (!data) ? false : true ;
                if (!isauth)
                  return (
                    <Redirect
                      to={{
                        pathname: '/user/under-construction',
                        state: { from: props.location },
                      }}
                    />
                  );
                  if (permission === false)
                    return (
                      <Redirect
                        to={{
                          pathname: '/exception?type=401',
                          state: { from: props.location },
                        }}
                      />
                    );
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;
