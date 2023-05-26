import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SuccessRegistered from '../../components/alerts/SuccessRegistered';
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

    // Define a function to generate the email validation regex pattern based on whether the user is a venue manager or not
    const getEmailPattern = (email) => {
        const domain = email ? 'stud.noroff.no' : 'noroff.no';
        return new RegExp(`^[a-z0-9_æøå]{4,25}@(stud\\.)?${domain}$`, 'i');
    };

    // Get the email pattern based on the manager state
    const emailPattern = getEmailPattern(manager);

    // Define a function to check if the email is valid for venue manager registration
    const isVenueManagerEmail = (email) => {
        return emailPattern.test(email);
    };

    // Define an event handler for the form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call the postData function with the form data
        await postData({email, password, manager});

        return (
            <>
                <SuccessRegistered />
                {setTimeout(() => {
                    navigate(`/login`)
                }, 3000)}
            </>
        );
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
                       type="text" name="name" id="name" placeholder="Please enter your name"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="email">Email:</label>
                <input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       name="email"
                       id="email"
                       placeholder="Please enter your email"
                       aria-label="email"
                       required={true}
                       pattern={emailPattern}
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

                {/* Add the manager checkbox only if the email
                 is valid for venue manager registration */}
                {isVenueManagerEmail(email) && (
                    <div>
                        <label htmlFor="manager">Manager:</label>
                        <div style={{marginTop:"10px"}}>
                            <input value={manager} onChange={(e) => setManager(e.target.checked)}
                                   type="checkbox" id="manager" aria-checked={manager}
                                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                            <Typography.Text>Register as a Venue Manager?</Typography.Text>
                        </div>
                    </div>
                )}

                <button type="submit" disabled={isLoading} style={{
                    padding: "9px",
                    background: "transparent",
                    border: "2px solid transparent",
                    borderRadius: "7px",
                    backgroundColor: "#3dbd7d",
                    color: "white",
                    fontWeight: "bold",
                }}>
                    Register
                </button>
                {isError && <div>Error submitting form</div>}
                {data && <div>{data.message}</div>}
            </form>
        </>
    );
}