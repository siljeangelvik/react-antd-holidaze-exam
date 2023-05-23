import {Typography} from '@mui/material';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {Link} from 'react-router-dom';
import LoginForm from '../components/form/login/LoginForm';

function Login(onSubmit) {

    return (
        <>
            <div style={{padding: "80px 40px", height: "95vh"}}>
                <Content style={{paddingBottom: "20px"}}>
                    <Title level={1}>Login</Title>
                    <Title level={4}>Log in to you account</Title>
                </Content>
                <Content style={{paddingBottom: "20px"}}>
                    <LoginForm onSubmit={onSubmit}/>
                </Content>

                <Typography>Don't have an account? <Link to="/register" style={{fontWeight:"bold"}}>Register</Link></Typography>
            </div>
        </>
    );
}

export default Login;