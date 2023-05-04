import React, {createContext, useEffect, useState} from 'react';
import SuccessLogin from '../components/alerts/SuccessLogin';
import SuccessRegistered from '../components/alerts/SuccessRegistered';
import useAuthentication from '../hooks/useAuthentication';
import {API_PROFILES} from '../utilities/constants';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {
    const isLoggedIn = useAuthentication();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfileData, setUserProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            document.title = 'Holidaze';
            setIsAuthenticated(false);
            return;
        }
        document.title = localStorage.getItem('name');
        setIsAuthenticated(true);
    }, [isLoggedIn, userProfileData]);

    const handleUserRegister = () => {
        console.log('You successfully registered a new account!');
        return (
            <>
                <SuccessRegistered/>
                {setTimeout(() => {
                    // <Login/>
                    window.location.replace(`/login`);
                }, 1000)}
            </>
        );
    };

    const handleUserLogin = () => {
        setIsAuthenticated(true);
        console.log('You successfully logged into your account!\n' + userProfileData.name);
        document.title = userProfileData.name;
        return (
            <>
                <SuccessLogin/>
                {setTimeout(() => {
                    window.location.replace(`/profile`);
                    // <Profile />
                }, 1000)}
            </>
        );
    };

    const handleUserLogout = () => {
        console.log('Sad to see you logout, see you soon!\n' + localStorage.getItem('name'));
        document.title = 'Holidaze';

        ['accessToken', 'name', 'email', 'avatar', 'venueManager'].forEach((key) =>
            localStorage.removeItem(key)
        );

        setIsAuthenticated((prevState) => !prevState);
    };

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
                setUserProfileData(json);
                console.log(JSON.stringify(json, null, 2));
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getUserProfile().then(r => console.log(r));
    }, [isLoggedIn]);

    return (
        <AuthenticationContext.Provider
            value={{
                isLoggedIn,
                isAuthenticated,
                userProfileData,
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

export {AuthenticationContext, AuthenticationProvider};

/*

    const {
        data: userProfileData,
        isLoading,
        isError
    } = useApiGet(`${API_PROFILES}/${localStorage.getItem("name")}?_bookings=true&_venues=true`);
// https://nf-api.onrender.com/api/v1/holidaze/profiles/SiAvAng?_bookings=true&_venues=true //`${API_PROFILES}/${localStorage.getItem("name")}?_bookings=true&_venues=true`;

 */