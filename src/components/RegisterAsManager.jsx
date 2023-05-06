import {Button, Input} from '@mui/material';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import CreateVenue from '../components/modals/CreateVenue';
import {AuthenticationContext} from '../context/AuthenticationContext';
import useToggle from '../hooks/useToggle';

const RegisterAsManager = () => {

    const [toggle, setToggle] = useToggle(false);
    const {isManager} = useContext(AuthenticationContext);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const canRegisterAsManager = (() => {
        const email = localStorage.getItem('email');
        const noroffDomain = email.slice(email.indexOf('@') + 1);
        return noroffDomain === 'stud.noroff.no' || noroffDomain === 'noroff.no';
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

                {/* If user is already a manager */}
                {!isManager && (
                    <>
                        <Title level={3}>Your Venues to Manage</Title>
                        <Title level={5}>You are currently managing <em>0</em> venues.</Title>
                        <div style={{display: "flex", flexWrap: "nowrap"}}>
                            <Title level={3}>Create a Venue</Title>
                            <Button onClick={handleToggle} variant="text" size="small">
                                {toggle ? 'Close' : 'Open'}
                            </Button>
                        </div>
                        {toggle ?
                            <div className={"create-venue-modal"}>
                                <CreateVenue/>
                            </div>
                            : null}
                    </>
                )}
            </Content>
        </div>
    );
};

export default RegisterAsManager;