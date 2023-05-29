import { useState, useMemo } from 'react';

function useApiDelete(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const memoizedUrl = useMemo(() => url, [url]);

    const deleteData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
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
        } catch (error) {
            // console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, isError, deleteData };
}

export default useApiDelete;