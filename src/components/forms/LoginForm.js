import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLoginRegisterData} from '../../hooks/useLoginRegisterData';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import {API_LOGIN} from '../../utilities/constants';
import useApiPost from '../../hooks/useApiPost';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const {handleUserLogin} = useContext(AuthenticationContext);
    const {isLoading, isError, data} = useApiPost(API_LOGIN);
    const {handleLogin} = useLoginRegisterData();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        handleLogin(Object.fromEntries(formData));
        // const response = await postData({email, password});

        setTimeout(() => {
                const user = JSON.parse(localStorage.getItem('user'));
                navigate(`/profile/${user?.name}`);
            }, 2000);


            // handleUserLogin(data);
            /*
            setTimeout(() => {
                navigate(`/profile/${localStorage.getItem('name')}`);
            }, 2000);
            */

        if (isLoading) {
            console.log("Loading...");
        }
        if (isError) {
            console.log("Error...");
        }
    };

    return (
        <>
            <Content style={{paddingBottom: "20px"}}>
                <Title level={1}>Login</Title>
                <Title level={4}>Log in to you account</Title>
            </Content>

            <form onSubmit={handleSubmit} id={"loginForm"}
                  style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       name="email"
                       id="email"
                       placeholder="Please enter your email"
                       aria-label="email"
                       required={true}
                       autoComplete="email"
                       maxLength="255"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="password">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       name="password"
                       id="password"
                       placeholder="Enter your password"
                       aria-label="password"
                       required={true}
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <button type="submit" disabled={isLoading} onClick={handleUserLogin}
                        className={"primary-button"}
                >
                    Login
                </button>
                {isError && <div>Error submitting form</div>}
                {data && <div>{data.message}</div>}
            </form>
        </>
    );
}