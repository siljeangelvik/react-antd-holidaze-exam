import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const EditVenues = () => {
    const {toggleEditBookings} = useContext(VenuesContext);
    return (
        <div>
            <button
                className="primary-button"
                onClick={toggleEditBookings}
            >Edit Venues</button>
        </div>
    );
};

export default EditVenues;
