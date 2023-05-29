import {Button, Input} from '@mui/material';
import Title from 'antd/es/typography/Title';
import React, {useContext, useEffect} from 'react';
import useManagerStatus from '../hooks/useManagerStatus';
import {AuthenticationContext} from '../context/AuthenticationContext';
import useApiPut from '../hooks/useApiPut';
import {API_PROFILE} from '../utilities/constants';

const RegisterAsManager = () => {

    const {isManager} = useManagerStatus();
    const {userProfile} = useContext(AuthenticationContext);
    const validEmail = userProfile?.email && userProfile?.email.endsWith('@noroff.no');

    const {data, isLoading, isError, putData} = useApiPut(`${API_PROFILE}`)

    const handleRegisterAsManager = () => {
        if (!isManager && validEmail) {
            putData({
                ...data,
                venueManager: true
            })
            return localStorage.setItem('venueManager', true);
        }
        console.log(isManager ? 'Already registered as manager' : 'Register as manager');
        console.log('Register as manager');
    };


    useEffect(() => {
        if (data) {
            return userProfile?.venueManager;
        }
    }, [data, userProfile?.venueManager]);

    return (
        <div>
            {isManager && <p>You are already registered as a Manager</p>}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}

            {validEmail ? (
                <>
                    <Title level={3}>You are eligible to register as a Manager!</Title>
                    <Title level={5}>A Manager has the ability to create, update and delete Venues.</Title>
                    <div style={{display: "flex", flexWrap: "nowrap", gap: "10px"}}>
                        <Input type="checkbox"/>
                        <p>Yes, I want to register as a Venue Manager</p>
                    </div>
                    <Button onClick={handleRegisterAsManager}>Register as Manager</Button>
                </>

            ) : (
                <p>You are not eligible to register as a Venue manager.</p>
            )}
        </div>
    );
};

export default RegisterAsManager;