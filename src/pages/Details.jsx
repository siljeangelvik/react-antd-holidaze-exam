import React from 'react';
import {Link} from 'react-router-dom';
import {default as VenueDetails} from '../components/details';

function Details() {

    return (
        <div style={{padding: "80px 40px", paddingBottom: "120px", height: "95vh"}}>
            <Link to={`/`} className="primary-button">Back Home</Link>

            <VenueDetails/>
        </div>
    );
}

export default Details;