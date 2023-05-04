import React, {createContext, useEffect, useState} from 'react';
import Login from '../pages/Login';
import useAuthentication from '../hooks/useAuthentication';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES} from '../utilities/constants';

const AuthenticationContext = createContext();

//`${API_PROFILES}/${localStorage.getItem("name")}?_bookings=true&_venues=true`;

// https://nf-api.onrender.com/api/v1/holidaze/profiles/SiAvAng?_bookings=true&_venues=true

export const AuthenticationProvider = ({children}) => {

    // true or false, default value is false, if user is logged in then it will be true
    const isLoggedIn = useAuthentication();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {data: userProfileData, isLoading, isError} = useApiGet(`${API_PROFILES}/${localStorage.getItem("name")}?_bookings=true&_venues=true`);

    useEffect(() => {
        if (!isLoggedIn) {
            document.title = "Holidaze";
            setIsAuthenticated(false); // if user is not logged in then set isAuthenticated to false
            return;
        }

        document.title = localStorage.getItem('name');
        setIsAuthenticated(true); // if user is logged in then set isAuthenticated to true

    }, [isLoggedIn, userProfileData]);

    // const [userProfileData, setUserProfileData] = useState(null);


    const handleUserRegister = () => {
        setTimeout(() => {
            return <Login/>;
        })
        console.log("You successfully registered a new account!");
    };

    const handleUserLogin = () => {
            setIsAuthenticated(true);


        console.log("You successfully logged into your account!\n" + userProfileData.name);

        document.title = localStorage.getItem('name');
        localStorage.getItem('name');
    };



    const handleUserLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('manager');

        console.log("Sad to see you logout, see you soon!\n" + localStorage.getItem("name"));
    };



    return (
        <AuthenticationContext.Provider value={{
            isLoggedIn, // true or false
            isAuthenticated, // true or false (default value is false)
            userProfileData, // user profile data from the API
            isLoading, // true or false (default value is true)
            isError, // true or false (default value is false)



            handleUserRegister, // function to register a new user
            handleUserLogin, // function to set isAuthenticated to true
            handleUserLogout,   // function to set isAuthenticated to false
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export {AuthenticationContext};