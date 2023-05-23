import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const EditBookings = () => {
    const {toggleEditBookings} = useContext(VenuesContext);
    return (
        <div>
            <button
            className="primary-button"
            onClick={toggleEditBookings}
            >Edit Bookings</button>
        </div>
    );
};

export default EditBookings;
