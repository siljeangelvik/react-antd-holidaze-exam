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

// HOW TO USE

/*
function myComponent() {
    const isLoggedIn = useAuthentication();

    return (
        <div>
            {isLoggedIn ? <p>Welcome Back!</p> : <p>Please login</p>}
        </div>
    );

}
*/