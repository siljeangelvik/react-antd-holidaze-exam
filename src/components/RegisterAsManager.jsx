import {Button, Input} from '@mui/material';
import Title from 'antd/es/typography/Title';
import React from 'react';

const RegisterAsManager = () => {
    const profileEmail = localStorage.getItem('email');
    const canRegisterAsManager = profileEmail && profileEmail.endsWith('@stud.noroff.no') || profileEmail && profileEmail.endsWith('@noroff.no');
    console.log(canRegisterAsManager);

    const handleRegisterAsManager = () => {
        console.log('Register as manager');
    };

    return (
        <div>
            {canRegisterAsManager ? (
                <>
                    <Title level={3}>You are eligible to register as a Manager!</Title>
                    <Title level={5}>A Manager has the ability to create, update and delete Venues.</Title>
                    <div style={{display:"flex", flexWrap:"nowrap", gap:"10px"}}>
                        <Input type="checkbox" />
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