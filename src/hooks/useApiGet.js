import { useState, useEffect } from 'react';

/**
 * Our API hook
 */
function useApiGet(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setIsError(false);
                const fetchedData = await fetch(url);
                const json = await fetchedData.json();
                setData(json);
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [url]);
    return { data, isLoading, isError };
}

export default useApiGet;