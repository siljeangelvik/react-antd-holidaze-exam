import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES} from '../utilities/constants';
import useAuthentication from '../hooks/useAuthentication';

const AuthenticationContext = createContext();


const AuthenticationProvider = ({children}) => {
   // const {data: userProfile} = useApiGet(`${API_PROFILES}/${localStorage.getItem('name')}?_bookings=true&_venues=true`);

    const userProfile = useApiGet(`${API_PROFILES}/${localStorage.getItem('name')}?_bookings=true&_venues=true`);


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({} || null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    const isLoggedIn = useAuthentication();

    useEffect(() => {
        if (!isLoggedIn) {
            setIsAuthenticated(false);
        }
        setIsAuthenticated(true);
        setUserData(userProfile);
    }, [isLoggedIn]);


    const handleUserLogin = (data, userFormData) => {
        setIsAuthenticated(true);
        if (isAuthenticated && localStorage.getItem('name')) {
            setUserData(data);
            console.log(data);
            document.title = `Holidaze | ${localStorage.getItem('name')}`;
            console.log('You successfully logged in!');
            console.log(document.title);

            console.log(`Welcome back ${localStorage.getItem('name')}!`);
            navigate(`/profile/${localStorage.getItem('name')}`);
        }
    };



    const handleUserRegister = () => {
        console.log('You successfully registered a new account!');
        alert('You successfully registered a new account!');
        navigate('/login');
    };

    const handleUserLogout = () => {
        console.log(`Sad to see you logout, see you soon!\n${userData?.name}`);
        document.title = 'Holidaze';
        ['accessToken', 'name', 'email', 'avatar', 'venueManager'].forEach(key => localStorage.removeItem(key));
        setIsAuthenticated(prevState => !prevState);
    };

    const userDataAvatar = <img src={userData?.avatar} alt={userData?.name} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%"
    }}/>;

    const value = {
        isAuthenticated,
        userData,
        userDataAvatar,
        handleUserRegister,
        handleUserLogin,
        handleUserLogout,
    };

    return (
        <AuthenticationContext.Provider
            value={value}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export {AuthenticationContext, AuthenticationProvider};