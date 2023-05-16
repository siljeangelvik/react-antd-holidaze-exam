import React, { useContext, useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { API_PROFILES } from '../utilities/constants';
import { AuthenticationContext } from '../context/AuthenticationContext';
import BookingsList from '../components/BookingsList';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const { userData } = useContext(AuthenticationContext);

    useEffect(() => {
        // Fetch booking data from an API endpoint
        fetch(`${API_PROFILES}/${userData?.name}/bookings`)
            .then((response) => response.json())
            .then((data) => {
                // Update the value of bookings with the new data
                setBookings(data);
            });
    }, [userData?.name]);

    return (
        <>
            <div style={{ padding: '80px 40px', height: '95vh', paddingBottom: '120px' }}>
                <Content style={{ paddingBottom: '20px' }}>
                    <Title level={1}>Your Bookings</Title>
                    <Title level={4}>
                        Hi {userData?.name}, you currently have <em>{userData?.bookings?.length}</em> upcoming bookings.
                    </Title>
                </Content>

                <BookingsList bookings={bookings} />
            </div>
        </>
    );
}

export default Bookings;