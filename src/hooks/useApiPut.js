import { useState } from 'react';

function useApiPut(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function putData(payload) {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { data, isLoading, isError, putData };
}

export default useApiPut;