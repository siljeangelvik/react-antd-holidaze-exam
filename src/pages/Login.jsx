import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';

export function Login () {
    return (
        <div>

            <Content style={{paddingBottom:"40px"}}>
                <Title level={1}>Login</Title>
                <Title level={4}>Welcome to the login page. Please enter your credentials to continue.</Title>
            </Content>

            {/* Login Form Component Here */}
        </div>
    );
}