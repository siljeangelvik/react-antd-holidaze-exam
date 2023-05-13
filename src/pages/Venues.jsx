import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import useToggle from '../hooks/useToggle';
import {AuthenticationContext} from '../context/AuthenticationContext';
import CreateVenue from '../components/profile/CreateVenue';

function Venues() {
    const [toggle, setToggle] = useToggle(false);

    const {userData} = useContext(AuthenticationContext);

    return (
        <>
            <Title level={1}>Your Venues</Title>
            <Title level={4}>Hi {userData?.name}, you currently have <em>{userData?.venues?.length}</em> bookings listed.</Title>

            <div style={{padding:"80px 40px", minHeight:"95vh"}}>
                <Content style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "20px",
                }}>

                    <div>
                        <button onClick={setToggle} className={"primary-button"}>Create a Venue</button>
                    </div>

                    {toggle && (<CreateVenue setToggle={setToggle} />)}
                </Content>
            </div>

        </>

    );
}

export default Venues;
