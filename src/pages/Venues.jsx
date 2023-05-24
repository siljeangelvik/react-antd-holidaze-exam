import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import CreateVenue from '../components/form/venue/CreateVenue';
import VenuesTable from '../components/table/VenuesTable';
import EditVenues from '../components/buttons/EditVenues';
import {VenuesContext} from '../context/VenuesContext';
import YourVenuesList from '../components/YourVenuesList';
import useToggle from '../hooks/useToggle';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Venues() {
    const [toggle, setToggle] = useToggle(false);
    const {userProfile} = useContext(AuthenticationContext);
    const {userHasVenues} = useContext(VenuesContext);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    console.log(userHasVenues);

    return (
        <>
            <div style={{padding: "80px 40px", minHeight: "95vh"}}>
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>Your Venues</Title>
                    <Title level={4}>Hi {userProfile?.name}, you are currently
                        managing <em>{userProfile?.venues?.length}</em> venues.</Title>
                </Content>

                <div style={{display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between"}}>
                    <button className={"primary-button"} onClick={setToggle}>Create a Venue</button>
                    <EditVenues /> {/* Button to edit bookings */}
                    {userHasVenues && <button className={"secondary-button"}>Edit a Venue</button>}
                    {userHasVenues && <button className={"secondary-button"} onClick={setToggle}>Delete a Venue</button>}
                </div>

                {toggle &&  <CreateVenue handleToggle={handleToggle}/>}
                <VenuesTable/>

                {/*
                 {toggle && <PostVenue handleToggle={handleToggle}/>}
                */}

                <YourVenuesList/>
            </div>
        </>
    );
}

export default Venues;