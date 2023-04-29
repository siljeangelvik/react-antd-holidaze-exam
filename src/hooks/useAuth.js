import {useEffect, useState} from 'react';

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        function checkLoginStatus() {
            const token = localStorage.getItem("accessToken");
            return Boolean(token);
        }

        const loggedIn = checkLoginStatus();
        setIsLoggedIn(loggedIn);
    }, []);

    return isLoggedIn;
}

export default useAuth;


// HOW TO USE

/*
function myComponent() {
    const isLoggedIn = useAuth();

    return (
        <div>
            {isLoggedIn ? <p>Welcome Back!</p> : <p>Please login</p>}
        </div>
    );

}
*/