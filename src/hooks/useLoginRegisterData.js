import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

export function useLoginRegisterData() {
    const { setLocalStorage, getLocalStorage } = useLocalStorage({
        accessToken: '',
        name: '',
        email: '',
        avatar: '',
        manager: false,
    });

    const [userData, setUserData] = useState(getLocalStorage());

    const handleLogin = (data) => {
        setUserData(data);
        setLocalStorage('accessToken', data.accessToken);
        setLocalStorage('name', data.name);
        setLocalStorage('email', data.email);
        setLocalStorage('avatar', data.avatar);
        setLocalStorage('manager', data.manager);
    };

    const handleRegister = (data) => {
        setUserData(data);
        setLocalStorage('accessToken', data.accessToken);
        setLocalStorage('name', data.name);
        setLocalStorage('email', data.email);
        setLocalStorage('avatar', data.avatar);
        setLocalStorage('manager', data.manager);
    };

    return { userData, handleLogin, handleRegister };
}