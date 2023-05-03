import {Button, Input} from '@mui/material';
import Title from 'antd/es/typography/Title';
import React, {createContext, useState} from 'react';
import useAuthentication from '../hooks/useAuthentication';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES, profileEmail, profileName} from '../utilities/constants';

const AuthenticationContext = createContext();

// https://nf-api.onrender.com/api/v1/holidaze/profiles/SiAvAng?_bookings=true&_venues=true

export const AuthenticationProvider = ({children}) => {

    const isLoggedIn = useAuthentication();

    const getUserProfileData = async () => {
        const response = await fetch(`${API_PROFILES}/${profileName}?_bookings=true&_venues=true`);
        const data = await response.json();
        console.log(data, 'data from getUserProfileData');
        return data;
    };

    const userProfileData = useApiGet(getUserProfileData, null, isLoggedIn);
    console.log(userProfileData, 'userProfileData from AuthenticationProvider');

    // true or false, default value is false, if user is logged in then it will be true
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

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

    const RegisterAsManager = () => {
        const canRegisterAsManager = profileEmail && profileEmail.endsWith('@stud.noroff.no') || profileEmail && profileEmail.endsWith('@noroff.no');
        console.log(canRegisterAsManager);

        const handleRegisterAsManager = () => {
            console.log('Register as manager');
        };

        return (
            <div>
                {canRegisterAsManager ? (
                    <>
                        <Title level={3}>You are eligible to register as a Manager!</Title>
                        <Title level={5}>A Manager has the ability to create, update and delete Venues.</Title>
                        <div style={{display:"flex", flexWrap:"nowrap", gap:"10px"}}>
                            <Input type="checkbox" />
                            <p>Yes, I want to register as a Venue Manager</p>
                        </div>
                        <Button onClick={handleRegisterAsManager}>Register as Manager</Button>
                    </>

                ) : (
                    <p>You are not eligible to register as a Venue manager.</p>
                )}
            </div>
        );
    };


    return (
        <AuthenticationContext.Provider value={{userProfileData, RegisterAsManager,
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