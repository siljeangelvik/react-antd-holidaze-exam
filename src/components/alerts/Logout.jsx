import React, {useContext} from 'react';
import {notification, Space } from 'antd';
import {useNavigate} from 'react-router-dom';
import {AuthenticationContext} from '../../context/AuthenticationContext';

const close = () => {
    console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const Logout = () => {
    const [api, contextHolder] = notification.useNotification();
    const {handleUserLogout, isAuthenticated, userProfile} = useContext(AuthenticationContext);
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
                <button className="primary-button" type="link" onClick={() => api.destroy()}>
                    No, stay logged in 😊
                </button>
                <button className="secondary-button" onClick={() => logout(key)}>Yes, logout 😞</button>
            </Space>
        );
        api.open({
            message: `Oh no, ${userProfile?.name}!` ,
            description:
            `Are you sure you want to logout?`,
            btn,
            key,
            onClose: close,
        });
    };
    return (
        <>
            {contextHolder}
            {isAuthenticated &&
                <button className="secondary-button logout-button" onClick={openNotification} style={{fontWeight:"bold"}}>
                    Logout
                </button>
            }
        </>
    );
};

export default Logout;