import {Button} from '@mui/material';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import useToggle from '../hooks/useToggle';
import {AuthenticationContext} from '../context/AuthenticationContext';
import CreateVenue from '../components/modals/CreateVenue';

function Venues() {
    const {isManager, userProfileData} = useContext(AuthenticationContext);

    const [toggle, setToggle] = useToggle(false);

    return (
        <div style={{padding:"80px 40px", minHeight:"95vh"}}>
            <Content style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
            }}>

                <div>
                    <Button onClick={setToggle}>Create a Venue</Button>
                </div>

                {toggle && (<CreateVenue setToggle={setToggle} />)}


                {/* If user is already a manager */}
                {isManager ? (
                    <>
                        <Title level={3}>Your Venues</Title>
                        <Title level={5}>You are currently managing {userProfileData?.bookings?.length} venues.</Title>

                    </>
                ) : (
                    <>
                        <Title level={3}>Venues</Title>
                        <Title level={5}>There are currently {userProfileData?.bookings?.length} venues.</Title>
                    </>
                )}
            </Content>
        </div>
    );
}

export default Venues;
