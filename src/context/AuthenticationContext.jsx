import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES} from '../utilities/constants';
import useAuthentication from '../hooks/useAuthentication';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {
    const {data: userProfile} = useApiGet(`${API_PROFILES}/${localStorage.getItem('name')}?_bookings=true&_venues=true`);


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let [userData, setUserData] = useState(null);


    const navigate = useNavigate();
    const isLoggedIn = useAuthentication();


    useEffect(() => {
        if (!isLoggedIn) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, [isLoggedIn, userData]);

    const handleUserLogin = (data, userFormData) => {
        setIsAuthenticated(true);
        if (data && userFormData) {
            setUserData(data);
            console.log(typeof data, data);
            console.log('You successfully logged in!');
            document.title = `Holidaze | ${localStorage.getItem('name')}`;
            console.log(`Welcome back ${localStorage.getItem("name")}!`);
            navigate(`/profile/${localStorage.getItem('name')}`);
        }
    };

    const handleUserRegister = (response, userFormData) => {
        localStorage.clear();
        if (response && userFormData) {
            console.log('You successfully registered a new account!');
            alert('You successfully registered a new account!');
            navigate('/login');
        }
    };

    const handleUserLogout = () => {
        console.log(`Sad to see you logout, see you soon!\n${userProfile?.name}`);
        document.title = 'Holidaze';
        [
            'accessToken',
            'name',
            'email',
            'avatar',
            'venueManager',
        ].forEach((key) => localStorage.removeItem(key));
        setIsAuthenticated((prevState) => !prevState);
    };

    const userDataAvatar = (
        <img
            src={userProfile?.avatar}
            alt={userProfile?.name}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
            }}
        />
    );

    const value = {
        isAuthenticated,
        userProfile,
        userDataAvatar,
        handleUserRegister,
        handleUserLogin,
        handleUserLogout,
    };

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export {AuthenticationContext, AuthenticationProvider};
