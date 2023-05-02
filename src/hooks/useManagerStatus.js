import { useState, useEffect } from 'react';

function useManagerStatus() {
    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        const manager = localStorage.getItem('manager');
        if (manager === null || manager === undefined || manager === 'false') {
            setIsManager(false);
        } else if (manager === 'true') {
            setIsManager(true);
        }
    }, []);

    return isManager;
}

export default useManagerStatus;