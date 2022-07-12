import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { anonymousRoutes } from '../Router/router.config';

const AnonymousUserLayout = () => {
    return (
        <React.Fragment>
            <Switch>
                {anonymousRoutes
                    .filter((item) => !item.isLayout)
                    .map((item, index) => (
                        <Route
                            key={index}
                            path={item.path}
                            component={item.component}
                            exact={item.exact}
                        />
                    ))}

                <Redirect from="/user" to="/user/login" />
            </Switch>
        </React.Fragment>
    );
};

export default AnonymousUserLayout;
