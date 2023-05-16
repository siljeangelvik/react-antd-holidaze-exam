import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';
import BookingCalendar from '../../components/BookingCalendar';

const Availability = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* Availability Section */}
            <Title level={2}>Availability</Title>
            <BookingCalendar bookings={specificVenue?.bookings}/>
        </>
    );
};

export default Availability;