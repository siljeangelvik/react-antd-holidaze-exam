import {Button} from '@mui/material';
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

    const handleDeleteBooking = (bookingId) => {
        const newBookings = bookings.filter(booking => booking.id !== bookingId);
        setBookings(newBookings);
    }

    return (
        <>
            <div style={{minHeight:"95vh", padding: "80px 40px",}}>
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


                    <Button variant={"contained"} color={"error"}>Delete booking</Button>

                </Content>
            </div>
        </>
    );
}

export default Bookings;