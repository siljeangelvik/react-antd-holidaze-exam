import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import EmptyTab from '../components/profile/EmptyTab';
import { AuthenticationContext } from '../context/AuthenticationContext';
import VenueItem from '../components/VenueItem';

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const { userData } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userData?.bookings?.length > 0) {
            setBookings(userData.bookings);
        }
    }, [userData]);

    return (
        <Content style={{ paddingBottom: '40px' }}>
            <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px' }}>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <Col key={bookings.id} xs={24} sm={12} md={10} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
                            {booking.venue && <VenueItem venue={booking.venue} />}
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

export default BookingsList;
