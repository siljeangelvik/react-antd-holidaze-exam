import { Col, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../context/AuthenticationContext';
import VenueItem from '../components/VenueItem';

export function BookingsList() {
    const [bookings, setBookings] = useState([]);

    const { userProfileData } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userProfileData?.bookings?.length > 0) {
            setBookings(userProfileData.bookings.map(booking => (
                <Col xs={24} sm={12} md={10} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <VenueItem key={booking.id} venue={booking} />
                </Col>
            )));
        }
    }, [userProfileData]);

    const bookingsLength = userProfileData?.bookings?.length || 0;

    return (
        <Content style={{ paddingBottom: '40px' }}>
            <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px' }}>
                {bookingsLength === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Title level={4}>You have {bookingsLength} upcoming bookings.</Title>
                        <Typography.Text type="secondary">
                            You can book your next adventure from the <Link to="/">Venues</Link> page.
                        </Typography.Text>
                    </div>
                ) : (
                    bookings
                )}
            </Row>
        </Content>
    );
}