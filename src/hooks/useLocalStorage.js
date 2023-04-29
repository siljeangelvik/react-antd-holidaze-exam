import { useState } from 'react';

function useLocalStorage(key) {
    const getLocalStorage = () => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    };

    const setLocalStorage = (data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    return { getLocalStorage, setLocalStorage };
}

export function useLoginRegisterData() {
    const { getLocalStorage, setLocalStorage } = useLocalStorage('accessToken');

    const [userData, setUserData] = useState(getLocalStorage() || {});

    const handleLogin = (userData) => {
        setUserData(userData);
        setLocalStorage(userData);
    };

    const handleRegister = (userData) => {
        setUserData(userData);
        setLocalStorage(userData);
    };

    return { userData, handleLogin, handleRegister };
}
