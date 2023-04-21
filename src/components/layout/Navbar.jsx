import React, {useState} from 'react';
import {
    BookOutlined,
    HeatMapOutlined,
    LoginOutlined, LogoutOutlined,
    SearchOutlined, UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import {handleLogout} from '../../utilities/handleLogout';
import {profileName, profileToken} from '../../utilities/constants';

const items: MenuProps['items'] = [
    {
        label: (<Link to={"/"}/>),
        key: 'logo',
        icon: <HeatMapOutlined/>,
    },
    {
        label: (<Link to={"/"}>Explore</Link>),
        key: 'home',
        icon: <SearchOutlined/>,
    },
    {
        label: (<Link to={"/login"}>Login</Link>),
        key: 'login',
        icon: <LoginOutlined/>,
    },
    {
        label: (<Link to={`/bookings`}>Your Bookings</Link>),
        key: 'bookings',
        icon: <BookOutlined/>,
    },
    {
        label: (<Link to={`/profile/${profileName}`}>Your Profile</Link>),
        key: 'profile',
        icon: <UserOutlined/>,
    },
    {
        label: (<Link to={"/"}>Logout</Link>),
        key: 'logout',
        icon: <LogoutOutlined/>,
    },
];

const App: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);

        if (e.key === "logout") {
            handleLogout();
            setCurrent("home");
        }
        setCurrent(e.key);
    };

    return <Menu onClick={onClick}
                 selectedKeys={[current]}
                 mode="horizontal"
                 items={items}/>;

};

export default App;
