import {useState} from 'react';

function useApiPost(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function postData(payload) {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(url, {
                method: 'POST',
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

    return {data, isLoading, isError, postData};
}

export default useApiPost;