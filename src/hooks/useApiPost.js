import {useState} from 'react';

function useApiPost(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function postData(payload) {
        setIsLoading(true);
        setIsError(false);
        try {
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(url, options);
            const json = await response.json();
            setData(json);
            console.log(data, "useApiPost json");
        } catch (error) {
            setIsError(true);
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }

    return {data, isLoading, isError, postData};
}

export default useApiPost;

/*
  if (json.manager === undefined || json.manager === null) {
                localStorage.setItem('manager', false);
            } else {
                localStorage.setItem('manager', true);
            }

         localStorage.setItem('accessToken', json.accessToken);
           localStorage.setItem('name', json.name);
            localStorage.setItem('email', json.email);
            localStorage.setItem('avatar', json.avatar);
            localStorage.setItem('manager', json.manager);

 */