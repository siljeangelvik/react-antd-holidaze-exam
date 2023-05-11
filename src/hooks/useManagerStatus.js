import {useState, useEffect, useContext} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';

function useManagerStatus() {
    const [isManager, setIsManager] = useState(false);
    const {userProfileData} = useContext(AuthenticationContext);

    const manager = localStorage.getItem('manager');
    console.log(manager);

    useEffect(() => {
        function checkManagerStatus () {
            if (manager !== "true") {
                localStorage.setItem('manager', false);
                setIsManager(false);
                console.log('not a manager');
            } else {
                localStorage.getItem('manager');
                setIsManager(true);
                console.log('is a manager');
            }
        }

        checkManagerStatus();
    }, [userProfileData]);

    return isManager;
}

export default useManagerStatus;