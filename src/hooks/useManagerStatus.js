import {useState, useEffect, useContext} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';

function useManagerStatus() {
    const [isManager, setIsManager] = useState(false);
    const {userProfileData} = useContext(AuthenticationContext);

    const manager = localStorage.getItem('venueManager');
    console.log(manager);

    const checkManagerStatus = () => {
        if (manager !== "true") {
            localStorage.setItem('venueManager', false);
            setIsManager(false);
            console.log('not a manager');
        } else {
            localStorage.getItem('venueManager');
            setIsManager(true);
            console.log('is a manager');
        }
    }

    useEffect(() => {
        checkManagerStatus();
    }, [userProfileData]);

    return isManager;
}

export default useManagerStatus;