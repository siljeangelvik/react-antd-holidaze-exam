import {Box, Button} from '@mui/material';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import {RegisterForm} from '../components/forms/RegisterForm';
import {LoginForm} from '../components/forms/LoginForm';


function Login() {

    const [toggle, setToggle] = useState(true);

/*
    const {data, postData} = useApiPost(API_LOGIN_URL, onSubmit);
    console.log(data);



    const handleSubmitLogin = () => {
        // fetch(API_LOGIN_URL)
     //   postData(onSubmit).then(r => console.log(r, data));

        postData(onSubmit).then(r => console.log(r));
        console.log(API_LOGIN_URL);
        console.log(data);
        console.log(onSubmit);
    }
/*
    const handleSubmitRegister = () => {
        // fetch(API_REGISTER_URL)
       postData(API_REGISTER_URL, onSubmit)
           .then( r =>  localStorage.setItem("accessToken", r.accessToken))
    }
*/
    return (
        <Box>
            {toggle
                ? <>
                    <Title level={1}>Login</Title>
                    <Title level={4}>Please enter your credentials to login.</Title>
                </>
                : <>
                    <Title level={1}>Register</Title>
                    <Title level={4}>Sign up to register an account.</Title>
                </>
            }

            {toggle
                ? <LoginForm/>
                : <RegisterForm/>}

            <Button type="link" onClick={() => setToggle(!toggle)}>
                {toggle
                    ? 'Don\'t have an account? Register here.'
                    : 'Already have an account? Login here.'}
            </Button>
        </Box>
    );
}

export default Login;

/*
import { useState } from 'react';
import Home from './Home';
import useApiPost from '../hooks/useApiPost';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data, isLoading, isError, postData } = useApiPost('https://nf-api.onrender.com/api/v1/holidaze/auth/login');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = { email, password };
        await postData(payload);
        console.log("LOGIN PAYLOAD", payload);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong...</div>;
    }

    if (data && data.success) {
        localStorage.getItem("accessToken", data.accessToken);
        localStorage.setItem("id", data.id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("avatar", data.avatar);
        localStorage.setItem("manager", data.manager);

        console.log("LOGIN DATA", data);
        // The login was successful, redirect the user to the dashboard page
        setTimeout(() => {
            return <Home/>
        }, 3000);
    }

    return (
        <form onSubmit={handleSubmit} style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop:"40px"}}>
            <label htmlFor="email">Email:</label>
            <input onChange={handleEmailChange}
                   type="email"
                   id="email"
                   placeholder="Please enter your email"
                   value={email}
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>


            <label htmlFor="password">Password:</label>
            <input onChange={handlePasswordChange}
                   type="password"
                   id="password"
                   value={password}
                   placeholder="Enter your password"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <button type="submit"
                    style={{
                        padding: "9px",
                        background: "transparent",
                        border: "2px solid transparent",
                        borderRadius: "7px",
                        backgroundColor:"#3dbd7d",
                        color:"white",
                        fontWeight:"bold",
                    }}>Login
            </button>
     </form>
    );
}

export default Login;
*/