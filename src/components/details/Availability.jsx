import React, {useContext} from 'react';
import Title from 'antd/es/typography/Title';
import {VenuesContext} from '../../context/VenuesContext';
import BookingCalendar from '../BookingCalendar';

const Availability = () => {
    const {specificVenue} = useContext(VenuesContext);
    console.log(specificVenue?.bookings?.length, 'specificVenue?.bookings?.length - Availability');

    return (
        <>
            {/* Availability Section */}
            <Title level={2}>Availability</Title>

            {specificVenue?.bookings.length === 0
                ? (<h4><span style={{color: "#7d7d7d"}}>{specificVenue?.name}</span> has no bookings yet</h4>)
                : (<h4><span style={{color: "#7d7d7d"}}>{specificVenue?.name}</span> currently
                    got <em>{specificVenue?.bookings.length}</em>
                    {specificVenue?.bookings.length === 1 ? " booking" : " bookings"}
                </h4>)
            }

            {/*<PerfectCalendar/>*/}
            <BookingCalendar/>
        </>
    );
};

export default Availability;