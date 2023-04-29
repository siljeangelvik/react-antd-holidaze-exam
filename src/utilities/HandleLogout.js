import {Button} from 'antd';

const HandleLogout = () => {

    const logout = () => {
        if (localStorage.getItem("accessToken")) {
            console.log("You're logged in");
            localStorage.removeItem('accessToken');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('avatar');
            localStorage.removeItem('manager');
            window.location.replace("/login");
        }
        console.log("You logged out.")
    }

    return (
        <Button
            onClick={logout}
            color={"danger"}
            type="primary"
        >
            Log out
        </Button>
    );
}

export default HandleLogout;