import {Button} from '@mui/material';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import EmptyTab from '../components/profile/EmptyTab';
import { AuthenticationContext } from '../context/AuthenticationContext';
import VenueItem from '../components/VenueItem';

export function BookingsList() {
    const [bookings, setBookings] = useState([]);

    const { userData } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userData?.bookings?.length > 0) {
            setBookings(userData.bookings.map(booking => (
                <Col xs={24} sm={12} md={10} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <VenueItem key={booking.id} venue={booking} />
                </Col>
            )));
        }
    }, [userData]);

    return (
        <Content style={{ paddingBottom: '40px' }}>
            <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px' }}>
                {bookings ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <EmptyTab/>
                    </div>
                ) : (
                    <div>
                        <Button variant={'contained'} color={'error'}>Cancel bookings</Button>
                        {bookings}
                    </div>
                )}
            </Row>
        </Content>
    );
}