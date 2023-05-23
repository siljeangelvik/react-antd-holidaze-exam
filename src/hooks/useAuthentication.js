import {useEffect, useState} from 'react';

/**
 * A custom React hook to check the user's authentication status.
 * @returns {boolean} Whether the user is authenticated or not.
 */
function useAuthentication() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isToken = localStorage.getItem('accessToken'); // Checks if the access token is present in localStorage.
    useEffect(() => {
        // Checks the login status by checking the, presence of the access token in localStorage.
        function checkLoginStatus() {
            if (isToken !== null || undefined) { // If the access token is present, the user is logged in.
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        // Calls the function to check the login status.
        checkLoginStatus();

        // The empty array is passed as the second argument to prevent the function from being called on every render.
    }, []);

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