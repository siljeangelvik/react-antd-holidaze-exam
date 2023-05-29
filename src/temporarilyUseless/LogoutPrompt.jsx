import React from 'react';
import {Button, message, Space} from 'antd';

const LogoutPrompt = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const logout = () => {
        messageApi.open({
            type: 'error',
            content: 'You have been logged out.',
        });
    };

    return (
        <>
            {contextHolder}
            <Space>
                <Button onClick={logout}>Login</Button>
            </Space>
        </>
    );
};

export default LogoutPrompt;