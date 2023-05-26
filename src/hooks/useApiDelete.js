import { useState, useEffect, useMemo } from 'react';

function useApiDelete(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // only recompute when url changes, not when isLoading changes
    const memoizedUrl = useMemo(() => url, [url]);

    useEffect(() => {
        async function deleteData() {
            try {
                setIsLoading(true);
                setIsError(false);
                const response = await fetch(memoizedUrl, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to delete data');
                }
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        deleteData().catch((error) => {
            console.log(error);
            setIsError(true);
        });
    }, [memoizedUrl]);

    return { isLoading, isError, data };
}

export default useApiDelete;
