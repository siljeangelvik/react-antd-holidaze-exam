import {useState, useEffect, useMemo} from 'react';

function useApiGet(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const memoizedUrl = useMemo(() => url, [url]);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setIsError(false);
                const response = await fetch(memoizedUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                setData(json);
                console.log(JSON.stringify(json, null, 2));
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getData().then(r => console.log(JSON.stringify(r, null, 2)));
    }, [memoizedUrl]);

    return {data, isLoading, isError};
}

export default useApiGet;
