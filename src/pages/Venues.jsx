import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import YourVenuesList from '../components/YourVenuesList';
import {PostVenue} from '../components/form/venue/PostVenue';
import {VenuesContext} from '../context/VenuesContext';
import useToggle from '../hooks/useToggle';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Venues() {
    const {updateVenues, userVenues } = useContext(VenuesContext);
    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);

    const [toggle, setToggle] = useToggle(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    return (
        <div style={{padding: "80px 20px 120px 20px", minHeight: "95vh"}}>
            <Content>
                <Title level={1}>Your Venues</Title>
                {isAuthenticated
                    && userProfile
                    && <Title level={4}>Hi {userProfile?.name}, you are currently managing <em>{userVenues?.length}</em> venues.</Title>}
            </Content>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-between",
                padding: "40px 0",
                maxWidth: "480px"
            }}>
                <button className="primary-button" onClick={setToggle}>Create a Venue</button>
          </div>

            <YourVenuesList venues={userVenues} updateVenues={updateVenues} />

            {toggle && <PostVenue handleToggle={handleToggle}/>}
        </div>
    );
}

export default Venues;