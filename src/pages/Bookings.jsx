import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext, useState} from 'react';
import EmptyTab from '../components/profile/EmptyTab';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {BookingsList} from '../components/BookingsList';

function Bookings() {

    const {userProfileData} = useContext(AuthenticationContext);
    const userProfileBookings = userProfileData?.bookings?.length > 0 ? userProfileData?.bookings : [];
    const [bookings, setBookings] = useState(userProfileBookings);

    const userHasBookings = userProfileBookings?.length > 0;

    return (
        <>
            <div style={{padding: "80px 40px", height:"'100vh"}}>
                <Content style={{paddingBottom: "20px"}}>
                    <Title level={1}>Your Bookings</Title>
                    <>
                        <Title level={4}>Hi {localStorage.getItem("name")}, You have {bookings.length} bookings.</Title>

                        {userHasBookings ? (
                            <BookingsList bookings={bookings}/>
                        ) : (
                            <>
                                <EmptyTab/>
                            </>
                        )}


                    </>


                </Content>
            </div>
        </>
    );
}

export default Bookings;