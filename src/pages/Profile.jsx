import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';

export function Profile() {
    return (
        <div>

            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>Your Profile</Title>
                <Title level={4}>You are currently logged out.</Title>
            </Content>

        </div>
    );
}