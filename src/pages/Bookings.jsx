import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';

export function Bookings() {
    return (
        <div>

            <Content style={{paddingBottom:"40px"}}>
                <Title level={1}>Your Bookings</Title>
                <Title level={4}>Here you can see all your bookings and manage them.</Title>
            </Content>

        </div>
    );
}