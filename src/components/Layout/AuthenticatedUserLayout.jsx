import React from 'react';
import ProtectedRoute from '../Router/ProtectedRoute';
import { authenticatedRoutes } from '../Router/router.config';
import utils from '../../util/utils';

import { Redirect, Switch } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';

const AuthenticatedUserLayout = () => {
    const redirectUrl = utils.getLoggedUserRedirectURL();
    const userrole = utils.getLoggedUserRole();
    return (
        <div className="flex flex-row flex-1 w-full">
            {/* <LeftSidebar />
            <div className="flex flex-row flex-1"> */}
                <Switch>
                    {authenticatedRoutes
                        .filter((item) => !item.isLayout)
                        .map((route, index) => (
                            <ProtectedRoute
                                key={index}
                                path={route.path}
                                component={route.component}
                                permission={
                                    route.role &&
                                    route.role.length > 0 &&
                                    route.role.indexOf(userrole) !== -1
                                        ? true
                                        : false
                                }
                                exact={true}
                            />
                        ))}
                    <Redirect from="/" to={redirectUrl} />
                </Switch>
            {/* </div> */}
        </div>
    );
};
export default AuthenticatedUserLayout;
