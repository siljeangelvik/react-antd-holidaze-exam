import {useEffect, useState} from 'react';

/**
 * A custom React hook to check the user's authentication status.
 * @returns {boolean} Whether the user is authenticated or not.
 */
function useAuthentication() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isToken = localStorage.getItem('accessToken');
    useEffect(() => {
        function checkLoginStatus() {
            if (isToken !== undefined
                && isToken !== null
                && isToken !== 'null'
                && isToken !== 'undefined') {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                [
                    'accessToken',
                    'name',
                    'email',
                    'avatar',
                    'venueManager',
                ].forEach((key) => localStorage.removeItem(key));
            }
        }

        // Calls the function to check the login status.
        checkLoginStatus();

        // The empty array is passed as the second argument to prevent the function from being called on every render.
    }, [isToken]);

    return isLoggedIn;
}

export default useAuthentication;

// HOW TO USE
/*
 const isLoggedIn = useAuthentication();
 if (isLoggedIn) {
     // Do something
 } else {
     // Do something else
 }
*/