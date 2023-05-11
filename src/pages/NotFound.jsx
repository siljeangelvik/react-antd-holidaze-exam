import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';

function NotFound() {
    return (
        <>
            <div style={{padding: "80px 40px", height: "95vh"}}>
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>404</Title>
                    <Title level={4}>Oops, sorry...Page not found!</Title>
                </Content>
            </div>
        </>
    );
}

export default NotFound;