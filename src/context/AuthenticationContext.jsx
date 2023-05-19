import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {API_PROFILES} from '../utilities/constants';
import useManagerStatus from '../hooks/useManagerStatus';
import useAuthentication from '../hooks/useAuthentication';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthentication();
    const isManager = useManagerStatus;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);


    /**
     *  Used to update the isAuthenticated state
     *  based on the value of the isLoggedIn variable.
     *  If the user is not logged in, the isAuthenticated state is set to false.
     *  @returns {void}
     */
    useEffect(() => {
        if (!isLoggedIn) {
            setIsAuthenticated(false);
        }
        setIsAuthenticated(true);
    }, [isLoggedIn]);

    const handleUserLogin = () => {
        setIsAuthenticated(true);
        isManager();
        console.log(`Welcome back ${localStorage.getItem("name")}!`);
        document.title = `Holidaze | ${localStorage.getItem("name")}`;
        navigate(`/profile/${localStorage.getItem('name')}`);
    };

    /**
     * Retrieves the user profile data from the API.
     * @returns {Promise<void>} A promise that resolves when the user profile data is fetched and set.
     */
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
                    console.log(JSON.stringify(json, null, 2));
                } catch (error) {
                    console.error(error);
                    setIsError(true);
                } finally {
                    setIsLoading(false);
                }
            }
        getUserProfile().catch(error => console.error(error));
    }, [isLoggedIn, isAuthenticated]);

    const handleUserRegister = () => {
        console.log('You successfully registered a new account!');
    };

    const handleUserLogout = () => {
        console.log(`Sad to see you logout, see you soon!\n${userData?.name}`);
        document.title = 'Holidaze';
        ['accessToken', 'name', 'email', 'avatar', 'manager'].forEach(key => localStorage.removeItem(key));
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
        isLoading,
        isError,
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