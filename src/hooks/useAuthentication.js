import {useEffect, useState} from 'react';

/**
 * A custom React hook to check the user's authentication status.
 * @returns {boolean} Whether the user is authenticated or not.
 */
function useAuthentication() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Checks the login status by checking the, presence of the access token in localStorage.
        function checkLoginStatus() {
            if (localStorage.getItem('accessToken')) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }

        checkLoginStatus();
    }, []);

    return isAuthenticated;
}

export default useAuthentication;

// HOW TO USE
/*
 const isAuthenticated = useAuthentication();
 if (isAuthenticated) {
     // Do something
 } else {
     // Do something else
 }
*/