import React, {useContext} from 'react';
import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import CreateBooking from '../form/booking/CreateBooking';
import {VenuesContext} from '../../context/VenuesContext';

export const Availability = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* Availability Section */}
            <Title level={2}>Availability</Title>
            {specificVenue?.bookings.length === 0 ? (
                <Typography.Text>
                    {specificVenue?.name} has no bookings yet
                </Typography.Text>
            ) : (
                <Typography.Text>
                    {specificVenue?.name} currently has {specificVenue?.bookings.length}{' '}
                    {specificVenue?.bookings.length === 1 ? 'booking' : 'bookings'}
                </Typography.Text>
            )}
            <CreateBooking />
        </>
    );
};

