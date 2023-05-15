import {useEffect, useState} from 'react';

/**
 * A custom React hook to check the user's authentication status.
 * @returns {boolean} Whether the user is authenticated or not.
 */
function useAuthentication() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Checks the login status by checking the, presence of the access token in localStorage.
        function checkLoginStatus() {
            if (localStorage.getItem('accessToken')) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        checkLoginStatus();
    }, []);

    return isLoggedIn;
}

export default useAuthentication;