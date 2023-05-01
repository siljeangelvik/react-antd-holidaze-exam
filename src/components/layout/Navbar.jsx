import {BookOutlined, HeatMapOutlined, LoginOutlined, LogoutOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import HandleLogout from '../../utilities/HandleLogout';
import useAuthentication from '../../hooks/useAuthentication';
import {profileName} from '../../utilities/constants';

const items = [
    {
        label: (<Link to={"/"}/>),
        key: 'logo',
        icon: <HeatMapOutlined/>,
        disabled: true,
    },
    {
        label: (<Link to={"/"}>Explore</Link>),
        key: 'home',
        icon: <SearchOutlined/>,
        disabled: false,
    },
    {
        label: (<Link to={"/login"}>Login</Link>),
        key: 'login',
        icon: <LoginOutlined/>,
        disabled: false,
    },
];

const loggedInItems = [
    {
        label: (<Link to={"/"}/>),
        key: 'logo',
        icon: <HeatMapOutlined/>,
        disabled: true,
    },
    {
        label: (<Link to={"/"}>Explore</Link>),
        key: 'home',
        icon: <SearchOutlined/>,
        disabled: false,
    },
    {
        label: (<Link to={"/bookings"}>Your Bookings</Link>),
        key: 'bookings',
        icon: <BookOutlined/>,
    },
    {
        label: (<Link to={`/profile/` + profileName}>Your Profile</Link>),
        key: 'profile',
        icon: <UserOutlined/>,
    },
    {
        label: (<Link to={`/`}><HandleLogout/></Link>),
        key: 'logout',
        icon: <LogoutOutlined/>,
    },
];

const Navbar = () => {
    const [current, setCurrent] = useState();
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const isLoggedIn = useAuthentication();

    if (isLoggedIn) {
        return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={loggedInItems} />;
    }

    if (!isLoggedIn) {
        return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
    }

};

export default Navbar;