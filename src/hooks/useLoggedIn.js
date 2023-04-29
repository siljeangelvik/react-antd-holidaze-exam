import { useEffect, useState } from 'react';

function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    return loggedIn;
}
