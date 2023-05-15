import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {AuthenticationContext} from '../context/AuthenticationContext';

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useContext(AuthenticationContext);
    if (!isAuthenticated) {
        // user is not authenticated
        return <Navigate to="/"/>;
    }
    return children;
};