import {useEffect, useState} from 'react';

function useAuthentication() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        function checkLoginStatus() {
            if (localStorage.getItem("accessToken")) {
                return setIsLoggedIn(true);

            }
            return setIsLoggedIn(false);
        }

        checkLoginStatus();
    }, []);

    return isLoggedIn;
}

export default useAuthentication;