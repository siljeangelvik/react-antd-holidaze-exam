import {useState, useEffect, useContext} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';

function useManagerStatus() {
    const [isManager, setIsManager] = useState(false);
    const {userData} = useContext(AuthenticationContext);

    useEffect(() => {
        const manager = userData?.venueManager;

        if (manager === true) {
            setIsManager(true);
            localStorage.setItem('manager', true);
        } else {
            setIsManager(false);
            localStorage.setItem('manager', false);
        }

        // Cleanup function to remove the storedManagerStatus from localStorage
        return () => {
            localStorage.removeItem('manager');
        };
    }, [userData]);

    return isManager;
}

export default useManagerStatus;