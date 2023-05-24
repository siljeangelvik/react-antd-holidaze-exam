import React, {useContext, useEffect, useState} from 'react';
import {Col, Row} from 'antd';
import { Content } from 'antd/es/layout/layout';
import VenueItem from './VenueItem';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {VenuesContext} from '../context/VenuesContext';
import EmptyTab from './profile/EmptyTab';

function YourVenuesList() {
    const [venues, setVenues] = useState([]); // [

    const {userVenues, getUserVenues} = useContext(VenuesContext);
    const { userProfile } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userProfile?.venues?.length > 0) {
            setVenues(getUserVenues);
        }
    }, [userProfile, venues, userVenues]);

    return (
        <Content style={{ paddingBottom: '40px' }}>

            <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px' }}>
                {venues.length > 0 ? (
                    venues.map((venue) => (
                        <Col key={venue.id} xs={24} sm={12} md={10} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
                            {venue.venue && <VenueItem venue={venue.venue} />}
                        </Col>
                    ))
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <EmptyTab />
                    </div>
                )}
            </Row>
        </Content>
    );
}

export default YourVenuesList;