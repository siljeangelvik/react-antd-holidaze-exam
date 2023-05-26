import React, {useContext} from 'react';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {VenuesContext} from '../context/VenuesContext';
import {AuthenticationContext} from '../context/AuthenticationContext';
import BookingsList from '../components/BookingsList';

function Bookings() {
    const {updateBookings, userHasBookings} = useContext(VenuesContext);
    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);

    return (
            <div style={{padding:"80px 20px 120px 20px", minHeight: "95vh"}}>
                <Content>
                    <Title level={1}>Your Bookings</Title>
                    {isAuthenticated && userProfile
                        && <Title level={4}>
                            Hi {userProfile?.name}, you currently have <em>{userProfile?.bookings?.length}</em> upcoming
                            bookings.
                        </Title>}
                </Content>

                {userHasBookings && <BookingsList update={updateBookings} />}
            </div>
    );
}

export default Bookings;