import React, {useContext} from 'react';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {VenuesContext} from '../context/VenuesContext';
import {AuthenticationContext} from '../context/AuthenticationContext';
import BookingsList from '../components/BookingsList';

function Bookings() {
    const {userBookings, updateBookings} = useContext(VenuesContext);
    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);

    return (
        <>
            <div style={{padding: '80px 40px', height: '95vh', paddingBottom: '120px'}}>
                <Content style={{paddingBottom: '20px'}}>
                    <Title level={1}>Your Bookings</Title>
                    {isAuthenticated && userProfile
                        && <Title level={4}>
                            Hi {userProfile?.name}, you currently have <em>{userProfile?.bookings?.length}</em> upcoming
                            bookings.
                        </Title>}
                </Content>

                <BookingsList userBookings={userBookings && updateBookings} /> {/* Pass the bookings state */}
            </div>
        </>
    );
}

export default Bookings;