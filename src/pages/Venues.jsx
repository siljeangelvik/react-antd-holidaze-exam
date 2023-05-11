import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../context/VenuesContext';
import useToggle from '../hooks/useToggle';
import {AuthenticationContext} from '../context/AuthenticationContext';
import CreateVenue from '../components/profile/CreateVenue';

function Venues() {
    const [toggle, setToggle] = useToggle(false);

    const {isManager, userProfileData} = useContext(AuthenticationContext);

    const {data} = useContext(VenuesContext);
    console.log(data);

    return (
        <div style={{padding:"80px 40px", minHeight:"95vh"}}>
            <Content style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
            }}>

                <div>
                    <button onClick={setToggle}
                            className={"primary-button"}>Create a Venue</button>
                </div>

                {toggle && (<CreateVenue setToggle={setToggle} />)}

                {/* If user is already a manager */}
                {isManager ? (
                    <>
                        <Title level={3}>Your Venues</Title>
                        <Title level={5}>You are currently managing {userProfileData?.venues?.length} venues.</Title>

                    </>
                ) : (
                    <>
                        <Title level={3}>Your Bookings</Title>
                        <Title level={5}>There are currently {userProfileData?.bookings?.length} venues.</Title>
                    </>
                )}
            </Content>
        </div>
    );
}

export default Venues;
