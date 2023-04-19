import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

const Form = () => {
    const [toggle, setToggle] = useState(true);

    return (
        <div>
            <Content style={{marginBottom: "40px"}}>
                {toggle
                    ? <Title level={1}>Login</Title>
                    : <Title level={1}>Register</Title>}
                {toggle
                    ? <Title level={4}>Please enter your credentials to login.</Title>
                    : <Title level={4}>Please fill out the form below to register your account.</Title>}
                <Button type="link" onClick={() => setToggle(!toggle)}>
                    {toggle
                        ? 'Don\'t have an account? Register here.'
                        : 'Already have an account? Login here.'}
                </Button>
            </Content>

            {toggle
                ? <Login/>
                : <Register/>}
        </div>
    );
};

export default Form;