import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import CreateVenue from '../../components/modals/CreateVenue';
import useToggle from '../../hooks/useToggle';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import './styles.css';
const RegisterVenueManager = () => {

    const {isManager, userProfileData} = useContext(AuthenticationContext);

    const [toggle, setToggle] = useToggle(false);

    return (
        <div>
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
                {isManager && (
                    <>
                        <Title level={3}>Your Venues</Title>
                        <Title level={5}>You are currently managing {userProfileData?.bookings?.length} venues.</Title>

                    </>
                )}
            </Content>
        </div>
    );
};

export default RegisterVenueManager;