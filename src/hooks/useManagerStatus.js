import {useState, useEffect, useContext} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';

function useManagerStatus() {
    const [isManager, setIsManager] = useState(false);
    const {userData} = useContext(AuthenticationContext);

    const manager = localStorage.getItem('manager');

    useEffect(() => {
        function checkManagerStatus () {
            if (manager === true) {
                localStorage.getItem('manager');
                setIsManager(true);
                console.log(userData?.name + 'is a manager');
                return true;
            } else if (manager === undefined || manager === null) {
                localStorage.setItem("manager", false);
                setIsManager(false);
                console.log(userData?.name + 'is not a manager');
                return false;
            }
        }

        checkManagerStatus();
    }, [userData, manager]);

    return isManager;
}

export default useManagerStatus;