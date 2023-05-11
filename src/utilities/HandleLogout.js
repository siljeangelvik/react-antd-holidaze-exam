/* import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';

const HandleLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('manager');
        console.log("You logged out.");
        navigate('/login');
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

export default HandleLogout; */