import React, { createContext, useEffect, useState } from 'react';
import useManagerStatus from '../hooks/useManagerStatus';
import SuccessRegistered from '../components/alerts/SuccessRegistered';
import useAuthentication from '../hooks/useAuthentication';
import { API_PROFILES } from '../utilities/constants';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const isLoggedIn = useAuthentication();
    const { isManager } = useManagerStatus;

    const handleUserRegister = () => {
        console.log('You successfully registered a new account!');
        return <SuccessRegistered />;
    };

    const handleUserLogin = () => {
        const name = localStorage.getItem('name');
        if (name) {
            document.title = name;
            console.log(`Welcome back, ${name}!`);
        }
        setIsAuthenticated(true);
    };

    const handleUserLogout = () => {
        const name = localStorage.getItem('name');
        console.log(`Sad to see you logout, see you soon!\n${name}`);
        document.title = 'Holidaze';
        ['accessToken', 'name', 'email', 'avatar', 'manager'].forEach(key => localStorage.removeItem(key));
        setIsAuthenticated(prevState => !prevState);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setIsAuthenticated(false);
            return;
        }
        setIsAuthenticated(true);
    }, [isLoggedIn, userData]);

    useEffect(() => {
        async function getUserProfile() {
            try {
                setIsLoading(true);
                setIsError(false);
                const response = await fetch(`${API_PROFILES}/${localStorage.getItem('name')}?_bookings=true&_venues=true`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                setUserData(json);
                console.log(JSON.stringify(json, null, 2));
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getUserProfile();
    }, [isLoggedIn]);

    return (
        <AuthenticationContext.Provider
            value={{
                isManager,
                isLoggedIn,
                isAuthenticated,
                userData,
                isLoading,
                isError,
                handleUserRegister,
                handleUserLogin,
                handleUserLogout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export { AuthenticationContext, AuthenticationProvider };
