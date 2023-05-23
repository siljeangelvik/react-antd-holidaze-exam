import Title from 'antd/es/typography/Title';
import React from 'react';
import {Content} from 'antd/es/layout/layout';
import Registration from '../components/form/register/Registration';

function Register(onSubmit) {

    return (
        <>
            <div style={{padding: "80px 40px", height: "95vh"}}>
                <Content style={{paddingBottom: "20px"}}>
                    <Title level={1}>Register</Title>
                    <Title level={4}>Sign up for a new account!</Title>
                </Content>

                <Content style={{paddingBottom: "20px"}}>
                    <Registration onSubmit={onSubmit} />
                </Content>
            </div>
        </>
    );
}

export default Register;