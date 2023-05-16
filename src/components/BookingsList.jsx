import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import {VenuesContext} from '../context/VenuesContext';
import EmptyTab from '../components/profile/EmptyTab';
import { AuthenticationContext } from '../context/AuthenticationContext';
import VenueItem from '../components/VenueItem';

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const {userBookings} = useContext(VenuesContext);
    const { userData } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userData?.bookings?.length > 0) {
            setBookings(userData?.bookings);
        }
    }, [userData, bookings, userBookings]);

    // Sort bookings by the most recently added
    const sortBookingsByUpdated = bookings.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA;
    });

    // Sort bookings by the oldest added
    const sortBookingsByCreated = bookings.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });

    // Sort bookings by price, toggle button lowest to highest and vice versa
    const sortBookingsByPrice = bookings.slice().sort((a, b) => {
        const priceA = a.venue.price;
        const priceB = b.venue.price;
        return priceA - priceB;
    });

    return (
        <Content style={{ paddingBottom: '40px' }}>

            <div style={{display:"flex", justifyContent:"space-between", padding:"40px 0"}}>
                <button className="primary-button" onClick={() => sortBookingsByUpdated}>Most Recent</button>
                <button className="primary-button" onClick={() => sortBookingsByCreated}>Oldest</button>
                <button className="primary-button" onClick={() => sortBookingsByPrice}>{sortBookingsByPrice ? "Highest to lowest" : "Lowest to highest"}</button>
            </div>
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
                    </div>
                )}
            </Row>
        </Content>
    );
}

export default BookingsList;