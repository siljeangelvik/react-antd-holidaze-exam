import React, {createContext, useEffect, useState} from 'react';
import useManagerStatus from '../hooks/useManagerStatus';
import SuccessRegistered from '../components/alerts/SuccessRegistered';
import useAuthentication from '../hooks/useAuthentication';
import {API_PROFILES} from '../utilities/constants';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {
    const isLoggedIn = useAuthentication();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const {isManager} = useManagerStatus;


    useEffect(() => {
        if (!isLoggedIn) {
            setIsAuthenticated(false);
            return;
        }
        setIsAuthenticated(true);
    }, [isLoggedIn, data]);

    const handleUserRegister = () => {
        console.log('You successfully registered a new account!');
        return (<SuccessRegistered/>);
    };

    const handleUserLogin = () => {

        if (localStorage.getItem('name')) {
            setIsAuthenticated(true);
            console.log('You successfully logged into your account!\n' + data?.name);

            alert(`Welcome back ${localStorage.getItem('name')}!`);
            document.title = localStorage.getItem('name');

            // window.location.replace(`/profile/${localStorage.getItem('name')}`);
        }
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
                const response = await fetch(`${API_PROFILES}/${localStorage.getItem('name')}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                setData(json);
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
                data,
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