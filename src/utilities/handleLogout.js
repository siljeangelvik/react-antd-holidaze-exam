export const handleLogout = ({userLogout}) => {
    if (localStorage.getItem('accessToken')) {
        console.log("You're logged in");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('manager');
    } else {
        console.log("You're not logged in");
    }
    userLogout();
};
