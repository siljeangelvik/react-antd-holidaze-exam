import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {API_LOGIN} from '../../utilities/constants';
import useApiPost from '../../hooks/useApiPost';

export function LoginForm() {
    const navigate = useNavigate();
    // Call the useApiPost hook with the desired URL
    const {postData, isLoading, isError, data} = useApiPost(API_LOGIN);

    // Define state variables for the login form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Define an event handler for the form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call the postData function with the form data
        await postData({email, password});
        alert("You successfully logged in");

        setTimeout(() => {
            navigate(`/profile`)
        }, 1500)
    };

    return (
        <>
            <Content style={{paddingBottom: "40px"}}>
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

                <button type="submit" disabled={isLoading}
                        style={{
                            padding: "9px",
                            background: "transparent",
                            border: "2px solid transparent",
                            borderRadius: "7px",
                            backgroundColor: "#3dbd7d",
                            color: "white",
                            fontWeight: "bold",
                        }}>Login
                </button>
                {isError && <div>Error submitting form</div>}
                {data && <div>{data.message}</div>}
            </form>

        </>

    );
}