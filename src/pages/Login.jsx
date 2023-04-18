import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import RegisterForm from '../components/forms/register/RegisterForm';
import LoginForm from '../components/forms/login/LoginForm';

export function Login() {
    const [toggle, setToggle] = useState(false);

    return (
        <div>

            {toggle ?
                <>
                    <Content>
                        <Title level={1}>Register</Title>
                        <Title level={4}>
                            Please fill out the form below to register your account.
                        </Title>
                    </Content>
                    <RegisterForm/>
                </>
                :
                <>
                    <Content>
                        <Title level={1}>Login</Title>
                        <Title level={4}>Please enter your credentials to login.</Title>
                    </Content>
                    <LoginForm/>
                </>
            }

            <Button type="link" onClick={() => setToggle(!toggle)}>
                {toggle ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
            </Button>

        </div>
    );
}