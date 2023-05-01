import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useApiPost from '../../hooks/useApiPost';
import {API_REGISTER} from '../../utilities/constants';

export function RegisterForm() {
    const navigate = useNavigate();
    // Call the useApiPost hook with the desired URL
    const {postData, isLoading, isError, data} = useApiPost(API_REGISTER);

    // Define state variables for the login form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(true);
    const [manager, setManager] = useState('');

    // Define an event handler for the form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call the postData function with the form data
        await postData({email, password});
        alert("You successfully registered a new account");

        setTimeout(() => {
            navigate(`/login`)
        }, 3000);
    };

    return (
        <>
            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>Register</Title>
                <Title level={4}>Sign up for a new account!</Title>
            </Content>

            <form onSubmit={handleSubmit}
                  style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>
                <label htmlFor="name">Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                       type="text" name="name" id="name" placeholder="Please enter your name" style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       name="email"
                       id="email"
                       placeholder="Please enter your email"
                       aria-label="email"
                       required={true}
                       pattern="/^[\w.-]+@\w+[\w.-]*\.\w{2,3}$/"
                       autoComplete="email"
                       minLength="64"
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

                <label htmlFor="manager">Manager:</label>
                <div>
                    <input value={manager} onChange={(e) => setManager(e.target.value)}
                           type="checkbox" id="manager" aria-checked={true}
                           style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                    <Typography.Text>Register as a Venue Manager?</Typography.Text>
                </div>

                <button type="submit" disabled={isLoading} style={{padding: "9px", background: "transparent", border: "2px solid transparent", borderRadius: "7px", backgroundColor: "#3dbd7d", color: "white", fontWeight: "bold",}}>
                    Register
                </button>
                {isError && <div>Error submitting form</div>}
                {data && <div>{data.message}</div>}
            </form>

        </>
    );
}