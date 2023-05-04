import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';

function HandleLogout () {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('manager');
        console.log("You logged out.");

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    return (
        <Button
            onClick={logout}
           style={{
               background: "#fff",
               color:"#ff4d4f",
               boxShadow: 'none',

               border: 'none',
               cursor: 'pointer',
               fontWeight: 'bold',
               outline: 'none',
           }}
        >
            Log out
        </Button>
    );
}

export default HandleLogout;