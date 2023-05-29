import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import VenueItem from '../components/VenueItem';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES} from '../utilities/constants';
import {PostVenue} from '../components/form/venue/PostVenue';
import {VenuesContext} from '../context/VenuesContext';
import useToggle from '../hooks/useToggle';
import {AuthenticationContext} from '../context/AuthenticationContext';

function Venues() {
    const { userVenues } = useContext(VenuesContext);
    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);
    const {data, isLoading, isError} = useApiGet(`${API_PROFILES}/${userProfile?.name}/venues`);
    const [toggle, setToggle] = useToggle(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

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

            <div className="venues-list">
                {userVenues?.map(venue => <VenueItem key={venue.id} venue={venue} />)}
            </div>
            {toggle && <PostVenue handleToggle={handleToggle}/>}
        </div>
    );
}

export default Venues;