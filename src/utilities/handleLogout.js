import {profileToken} from './constants';

export const handleLogout = () => {
    if (profileToken) {
        console.log("You're logged in");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('manager');
    }
};