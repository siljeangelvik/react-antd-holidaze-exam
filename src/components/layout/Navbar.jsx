import React, {useState} from 'react';
import {
    BookOutlined,
    HeatMapOutlined,
    LoginOutlined,
    LogoutOutlined,
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import {profileName} from '../../utilities/constants';


const items: MenuProps['items'] = [
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
        label: (<Link to={"/login"}>Login</Link>),
        key: 'login',
        icon: <LoginOutlined/>,
        disabled: false,
    },
    {
        label: (<Link to={"/"}>Logout</Link>),
        key: 'logout',
        icon: <LogoutOutlined/>,
        disabled: true,
    },
];

const App: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};

export default App;
