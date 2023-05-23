import React, {useContext} from 'react';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import EditBookings from '../components/buttons/EditBookings';
import {VenuesContext} from '../context/VenuesContext';
import {AuthenticationContext} from '../context/AuthenticationContext';
import BookingsList from '../components/BookingsList';

function Bookings() {
    const {userBookings} = useContext(VenuesContext);
    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);

    return (
        <>
            <div style={{padding: '80px 40px', height: '95vh', paddingBottom: '120px'}}>
                <Content style={{paddingBottom: '20px'}}>
                    <Title level={1}>Your Bookings</Title>
                    {isAuthenticated && userProfile
                        && <Title level={4}>
                            Hi {userProfile?.name}, you currently have <em>{userBookings?.length}</em> upcoming
                            bookings.
                        </Title>}
                </Content>


                <EditBookings/> {/* Button to edit bookings */}

                <BookingsList userBookings={userBookings}/> {/* Pass the bookings state */}
            </div>
        </>
    );
}

export default Bookings;