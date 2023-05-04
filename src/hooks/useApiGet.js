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
                const fetchedData = await fetch(memoizedUrl, {

                });
                const json = await fetchedData.json();
                setData(json);
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getData().then(r => console.log(r));
    }, [memoizedUrl]);

    return {data, isLoading, isError};
}

export default useApiGet;
