import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../context/VenuesContext';
import {YourVenuesList} from '../components/YourVenuesList';
import {PostVenue} from '../components/form/venue/PostVenue';
import useToggle from '../hooks/useToggle';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Venues() {
    const [toggle, setToggle] = useToggle(false);
    const {userData} = useContext(AuthenticationContext);

    const {hasVenues} = useContext(VenuesContext);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <div style={{padding: "80px 40px", minHeight: "95vh"}}>

                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>Your Venues</Title>
                    <Title level={4}>Hi {userData?.name}, you are currently
                        managing <em>{userData?.venues?.length}</em> venues.</Title>
                </Content>

                <div style={{display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between"}}>
                    <button className={"primary-button"} onClick={setToggle}>Create a Venue</button>
                    {hasVenues && <button className={"secondary-button"}>Edit a Venue</button>}
                    {!hasVenues && <button className={"secondary-button"} onClick={setToggle}>Delete a Venue</button>}
                </div>

                {toggle && <PostVenue handleToggle={handleToggle}/>}

                <YourVenuesList/>
            </div>
        </>
    );
}

export default Venues;