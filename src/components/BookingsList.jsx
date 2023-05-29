import React, {useContext, useEffect, useState} from 'react';
import {VenuesContext} from '../context/VenuesContext';
import {AuthenticationContext} from '../context/AuthenticationContext';
import VenueItem from './VenueItem';
import EmptyTab from './EmptyTab';

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const {userBookings} = useContext(VenuesContext);
    const {userProfile} = useContext(AuthenticationContext);

    useEffect(() => {
        const bookings = userProfile?.bookings?.map((booking) => {
            return {
                ...booking,
                venue: userBookings?.find((venue) => venue.id === booking.venue.id)
            }
        });
        if (bookings) {
            setBookings(userProfile?.bookings); // bookings / userBookings
        }
    }, [userProfile, bookings, userBookings]);

    return (
        <>
            <p>If you dont see your most recently booked venue, please refresh the browser.</p>
            <div className="venues-list">
                {userBookings ? (
                    bookings.map((booking) => (
                        <div>
                            {booking.venue && <VenueItem venue={booking.venue} />}
                        </div>
                    ))) : (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <EmptyTab/>
                    </div>)}
            </div>
        </>
    );
}

export default BookingsList;