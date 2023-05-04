import React, {createContext, useState} from 'react';
import useAuthentication from '../hooks/useAuthentication';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES, profileName} from '../utilities/constants';

const AuthenticationContext = createContext();

// https://nf-api.onrender.com/api/v1/holidaze/profiles/SiAvAng?_bookings=true&_venues=true

export const AuthenticationProvider = ({children}) => {

    const isLoggedIn = useAuthentication(); // true or false

    const {data: userProfileData} = useApiGet(API_PROFILES + "/" +  localStorage.getItem("name") + '?_bookings=true&_venues=true');

    if (isLoggedIn) {
        console.log(userProfileData + "/" +  localStorage.getItem("name"));
        document.title = localStorage.getItem("name");

    } else {
        document.title = "Holidaze";
    }


    // true or false, default value is false, if user is logged in then it will be true
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleUserLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('accessToken', userProfileData.accessToken);
        localStorage.setItem('id', userProfileData.id);
        localStorage.setItem('name', userProfileData.name);
        localStorage.setItem('email', userProfileData.email);
        localStorage.setItem('avatar', userProfileData.avatar);
        localStorage.setItem('manager', userProfileData.manager);

        console.log(localStorage.getItem('profileName'));
        document.title = localStorage.getItem('profileName');
    };

    const handleUserLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('manager');
    };

    return (
        <AuthenticationContext.Provider value={{userProfileData,
            isAuthenticated, // true or false
            handleUserLogin, // function to set isAuthenticated to true
            handleUserLogout,   // function to set isAuthenticated to false
          isLoggedIn // true or false
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export {AuthenticationContext};