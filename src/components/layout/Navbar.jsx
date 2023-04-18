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
        label: (<Link to={"/bookings"}>Your Bookings</Link>),
        key: 'bookings',
        icon: <BookOutlined/>,
        disabled: false,
    },
    {
        label: (<Link to={"/profile"}>Your Profile</Link>),
        key: 'profile',
        icon: <UserOutlined/>,
        disabled: false,
    },
    {
        label: (<Link to={"/login"}>Login</Link>),
        key: 'login',
        icon: <LoginOutlined />,
        disabled: false,
    },
    {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
        disabled: false,
    },


];

const App: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};

export default App;
