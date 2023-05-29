import {useContext, useState} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';

export function ProfileBookingsList () {
    const {userProfile} = useContext(AuthenticationContext);
    const [bookings, setBookings] = useState([]);

    return (
        <div>
            <h1>Your Bookings</h1>



        </div>
    )
}