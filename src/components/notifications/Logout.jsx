import React, {useContext} from 'react';
import { Button, notification, Space } from 'antd';
import {useNavigate} from 'react-router-dom';
import {AuthenticationContext} from '../../context/AuthenticationContext';

const close = () => {
    console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const Logout = () => {
    const [api, contextHolder] = notification.useNotification();
    const {handleUserLogout, isAuthenticated} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const openNotification = () => {
        const logout = () => {
            api.destroy(key);
            handleUserLogout();
            navigate('/login');
        };
        // unique key for notification to avoid duplication of notifications
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button type="link" size="medium" onClick={() => api.destroy()}>
                    No, stay logged in
                </Button>
                <button className="primary-button" onClick={() => logout(key)}>Yes, logout</button>
            </Space>
        );
        api.open({
            message: 'Are you sure you want to logout?',
            description:
                'Logging out will clear all your data, from this device only.',
            btn,
            key,
            onClose: close,
        });
    };
    return (
        <>
            {contextHolder}
            {isAuthenticated &&
                <Button type="primary" onClick={openNotification} style={{fontWeight:"bold"}}>
                    Logout
                </Button>
            }
        </>
    );
};

export default Logout;