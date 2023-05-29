import React from 'react';
import {Link} from 'react-router-dom';

const VenueSuccess = () => {
    return (
        <div className="venue-success-notification">
            <h1>Thank you for your submission</h1>
            <Link to="/venues" className="primary-button">View your venues</Link>
            <button className="secondary-button">Cancel</button>
        </div>
    );
};

export default VenueSuccess;
