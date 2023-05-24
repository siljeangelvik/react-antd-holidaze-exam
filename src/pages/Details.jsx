import {Button} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {default as VenueDetails} from '../components/details';

function Details() {

    return (
        <div style={{padding: "80px 40px", paddingBottom: "120px", height: "95vh"}}>
            <Button type="primary"><Link to={`/`}>Back Home</Link></Button>
            <VenueDetails/>
        </div>
    );
}

export default Details;