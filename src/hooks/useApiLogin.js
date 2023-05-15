import { useState } from 'react';
import {API_LOGIN} from '../utilities/constants';

function useApiLogin() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function loginUser(credentials) {
        setIsLoading(true);
        setIsError(false);
        try {
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            };
            const response = await fetch(API_LOGIN, options);
            const json = await response.json();

            setData(json);
            localStorage.setItem('accessToken', json.accessToken);
            localStorage.setItem('name', json.name);
            localStorage.setItem('email', json.email);
            localStorage.setItem('avatar', json.avatar);
            localStorage.setItem('manager', json.manager);
            console.log(json, 'useApiLogin response');
        } catch (error) {
            setIsError(true);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    return { data, isLoading, isError, loginUser };
}

export default useApiLogin;