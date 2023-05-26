import React, {useContext, useEffect, useState} from 'react';
import {VenuesContext} from '../context/VenuesContext';
import {AuthenticationContext} from '../context/AuthenticationContext';
import VenueItem from './VenueItem';
import EmptyTab from './profile/EmptyTab';

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const {userBookings} = useContext(VenuesContext);
    const {userProfile} = useContext(AuthenticationContext);

    useEffect(() => {
        if (userProfile?.bookings?.length > 0) {
            setBookings(userProfile?.bookings);
        }
    }, [userProfile, bookings, userBookings]);

    return (
        <>
            <div className="venues-list">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div>
                            {booking.venue && <VenueItem venue={booking.venue}/>}
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