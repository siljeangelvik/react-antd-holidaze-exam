import {useState, useEffect, useContext} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';

function useUpdateAvatar() {
    const [isAvatar, setIsAvatar] = useState("");
    const {userProfileData} = useContext(AuthenticationContext);

    const avatar = localStorage.getItem('avatar');

    const handleUpdateAvatar = () => {
        if (avatar === 'String') {
            setIsAvatar(avatar);
        } else if (avatar !== 'String') {
            localStorage.setItem('avatar', userProfileData.avatar);
            setIsAvatar(userProfileData.avatar);
        }
    }

    useEffect(() => {
        handleUpdateAvatar();
    }, [userProfileData]);

    return avatar;
}

export default useUpdateAvatar();