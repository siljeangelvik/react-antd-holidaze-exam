import {UserOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import useManagerStatus from '../../../hooks/useManagerStatus';
import Logout from '../../../components/notifications/Logout';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import useToggle from "../../../hooks/useToggle";
import "./styles.css";
import Logo from '../../../utilities/Logo';

const Navbar = () => {
    const [toggle, setToggle] = useToggle(false);
    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);

    const isManager = useManagerStatus();

    const handleNavbar = () => {
        setToggle(!toggle);
    };

    const handleNavbarClose = () => {
        setToggle(false);
    };

    return (
        <div className="navbar-container">
            <Link to="/">
                <Logo/>
            </Link>
            <button className="navbar-button" onClick={handleNavbar}>
                {isAuthenticated ? (
                    <span className="navbar-button-emoji" aria-label="navbar-button-emoji" role="img" style={{backgroundColor: "transparent", border: "none", transition: "none"}}>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            {userProfile?.avatar
                                ? <Avatar size='large' icon={<img src={userProfile?.avatar} alt={userProfile?.name}/>}/>
                                : <Avatar size='large' icon={<UserOutlined/>}/>
                            }
                        </Space>
                    </Space>
                    </span>
                ) : (
                    <span className="navbar-button-emoji" aria-label="navbar-button-emoji" role="img">&#129409;</span>)}
            </button>

            <nav className="navbar-container-mobile" style={{display: toggle && "flex"}} onClick={handleNavbarClose}>
                <ul className="navbar-list-mobile" id="slide">
                    {isAuthenticated && <li><em style={{fontWeight: "bold"}}>Logged in as {userProfile?.name}</em></li>}
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isAuthenticated ? (<>
                            <li><Link to={`/profile/${userProfile?.name}`}>Profile</Link></li>
                            <li><Link to={`/bookings`}>Bookings</Link></li>
                            {isManager && <li><Link to={`/venues`}>Venues</Link></li>}
                            <li><Logout/></li>
                        </>
                    ) : (<>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>)}
                </ul>
            </nav>

        </div>
    );
};

export default Navbar;