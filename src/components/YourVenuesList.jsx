import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import EmptyTab from '../components/profile/EmptyTab';
import { AuthenticationContext } from '../context/AuthenticationContext';
import VenueItem from '../components/VenueItem';

export function YourVenuesList() {
    const [yourVenues, setYourVenues] = useState([]);

    const { userData } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userData?.venues.length > 0) {
            setYourVenues(userData?.venues.map(venue => (
                <Col xs={24} sm={12} md={10} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <VenueItem key={venue.id} venue={yourVenues} />
                </Col>
            )));
        }
    }, [userData]);

    return (
        <Content style={{ paddingBottom: '40px' }}>
            <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px' }}>
                {yourVenues && userData?.venues.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {yourVenues}
                    </div>
                ) : (
                    <div>
                        <EmptyTab/>
                    </div>
                )}
            </Row>
        </Content>
    );
}