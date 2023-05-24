import React, { useContext, useEffect, useState } from 'react';
import {VenuesContext} from '../context/VenuesContext';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import VenueItem from './VenueItem';
import EmptyTab from './profile/EmptyTab';

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const {userBookings} = useContext(VenuesContext);
    const { userProfile } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userProfile?.bookings?.length > 0) {
            setBookings(userProfile?.bookings);
        }
    }, [userProfile, bookings, userBookings]);

    return (
        <Content style={{ paddingBottom: '40px' }}>
            <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px' }}>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <Col key={booking.id} xs={24} sm={12} md={10} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
                            {booking.venue && <VenueItem venue={booking.venue} />}
                        </Col>
                    ))
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <EmptyTab />
                    </div>)}
            </Row>
        </Content>
    );
}

export default BookingsList;