import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useManagerStatus from '../hooks/useManagerStatus';
import {API_PROFILES} from '../utilities/constants';
import useAuthentication from '../hooks/useAuthentication';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {

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
        document.title = `Holidaze | ${localStorage.getItem("name")}`;
        console.log(document.title);
    }, [isLoggedIn]);


    const handleUserLogin = () => {
        setIsAuthenticated(true); // set isAuthenticated to true and set userData to userData
        console.log('You successfully logged in!');

        isAuthenticated && userData && navigate(`/profile/${localStorage.getItem('name')}`);


     //   return userData;

        /*
        alert('You successfully logged in!');
        console.log('You successfully logged in!');

        console.log(userData, "from handleUserLogin")

        console.log(`Welcome back ${localStorage.getItem("name")}!`);
        document.title = `Holidaze | ${localStorage.getItem("name")}`;
*/


        //  navigate(`/profile/${localStorage.getItem('name')}`);
       // navigate(`/profile/${userData?.name}`);
//        navigate(`/profile/${localStorage.getItem('name')}`);

    };


    useEffect(() => {
        async function getUserProfile() {
            try {
                setIsLoading(true);
                setIsError(false);
                const response = await fetch(
                    `${API_PROFILES}/${localStorage.getItem('name')}?_bookings=true&_venues=true`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const json = await response.json();
                setUserData(json);
               // console.log(JSON.stringify(json, null, 2));
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getUserProfile().catch(error => console.error(error));
    }, [isLoggedIn, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps


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