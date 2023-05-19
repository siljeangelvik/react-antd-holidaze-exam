import React from 'react';
import {Link} from 'react-router-dom';
import {default as VenueDetails} from '../components/details';

function Details() {

    return (
        <div style={{padding: "80px 40px", paddingBottom: "120px", height: "95vh"}}>

            <Link to="/">
                <button className="primary-button" style={{width:"100px"}}>Back</button>
            </Link>

            <VenueDetails/>
        </div>
    );
}

export default Details;