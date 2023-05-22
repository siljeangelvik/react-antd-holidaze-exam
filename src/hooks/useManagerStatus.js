import { useState, useEffect } from 'react';

function useManagerStatus() {
    const [isManager, setIsManager] = useState(false);
    const manager = localStorage.getItem('venueManager');

    useEffect(() => {

        if (manager === true || manager === 'true') {
            setIsManager(true)
        } else {
            setIsManager(false)
        }

        // Cleanup function to remove the storedManagerStatus from localStorage
        return () => {
            localStorage.removeItem('venueManager');
        };
    }, [manager]);

    return isManager;
}

export default useManagerStatus;
