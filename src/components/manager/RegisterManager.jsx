import {Button, Input} from '@mui/material';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import './styles.css';
const RegisterVenueManager = () => {

    const {isManager} = useContext(AuthenticationContext);

    const canRegisterAsManager = (() => {
        const email = localStorage.getItem('email');
        const noroffDomain = email.slice(email.indexOf('@') + 1);
        const eligibleForRegistry = noroffDomain === 'stud.noroff.no' || noroffDomain === 'noroff.no';
        return eligibleForRegistry;
    })();

    return (
        <div>
            <Content style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
            }}>
                {/* If user is not a manager but can register as one */}
                {isManager && canRegisterAsManager && (
                    <>
                        <Title level={3}>You are not registered as a Manager!</Title>
                        <Title level={5}>A Manager has the ability to create, update and delete Venues.</Title>
                        <div style={{display: "flex", flexWrap: "nowrap", gap: "10px"}}>
                            <Input type="checkbox" id={"manager"}/>
                            <p>Yes, I want to register as a Venue Manager</p>
                        </div>
                        <Button variant="contained" color="success">
                            Submit Registration
                        </Button>
                    </>
                )}
            </Content>
        </div>
    );
};

export default RegisterVenueManager;