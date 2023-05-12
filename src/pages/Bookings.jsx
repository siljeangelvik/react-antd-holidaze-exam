import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext, useEffect, useState} from 'react';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES} from '../utilities/constants';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {BookingsList} from '../components/BookingsList';

function Bookings() {
    const [bookings, setBookings] = useState([]);

    const {userData} = useContext(AuthenticationContext);

    const {data: userDataBookings} = useApiGet(`${API_PROFILES}/${userData?.name}/bookings`);

    console.log((JSON.stringify(userData, null, 2)));
    console.log((JSON.stringify(userDataBookings, null, 2)));

    useEffect(() => {
        // TODO: Fetch bookings from API
        setBookings(userDataBookings);
        console.log(bookings);
    });


    return (
        <>
            <div style={{minHeight: '95vh', padding: '80px 40px'}}>
                <Content style={{paddingBottom: '20px'}}>
                    <Title level={1}>Your Bookings</Title>
                        <Title level={4}>
                            Hi {userData?.name}, you currently have <em>{userDataBookings?.length}</em> upcoming bookings.
                        </Title>

                    <BookingsList bookings={bookings}/>
                </Content>
            </div>
        </>
    );
}

export default Bookings;
