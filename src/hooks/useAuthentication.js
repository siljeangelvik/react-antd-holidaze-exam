import {useEffect, useState} from 'react';

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
        checkLoginStatus();
    }, [isToken]);
    return isLoggedIn;
}

export default useAuthentication;