import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Profile from '../pages/Profile';
import requireAuth from '../utilities/requireAuth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        requireAuth(props) ? (
            <Profile />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )} />
);

export default PrivateRoute;