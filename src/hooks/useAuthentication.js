import {useEffect, useState} from 'react';
import {profileAccessToken} from '../utilities/constants';

function useAuthentication() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        function checkLoginStatus() {
            if (profileAccessToken) {
                return setIsLoggedIn(true);
            }
            return setIsLoggedIn(false);
        }

        checkLoginStatus();
    }, []);

    return isLoggedIn;
}

export default useAuthentication;