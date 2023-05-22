import {useState, useEffect, useMemo} from 'react';

function useApiGet(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // only recompute when url changes, not when data or isLoading changes
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

        getData().catch((error) => {
            console.log(error);
            setIsError(true);
        });
    }, [memoizedUrl]);

    return {data, isLoading, isError};
}

export default useApiGet;