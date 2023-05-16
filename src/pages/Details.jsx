import React, {useContext} from 'react';

import {Content} from 'antd/es/layout/layout';
import {Link} from 'react-router-dom';
import Availability from '../components/details/Availability';
import Owner from '../components/details/Owner';
import Location from '../components/details/Location';
import Amenities from '../components/details/Amenities';
import Info from '../components/details/Info';
import Header from '../components/details/Header';
import {VenuesContext} from '../context/VenuesContext';

function Details() {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            <div style={{padding: "80px 40px", paddingBottom: "120px", height: "95vh"}}>
                <Link to="/"><button className="primary-button">Back</button></Link>
                {/* ROW */}
                <div className={"desktop-row"}>
                    <Content>
                      <Header />
                       <Info/>
                    </Content>

                    <Content>
                       <Amenities/>
                       <Location/>
                    </Content>
                </div>

                {/* ROW */}
                <div className={"desktop-row last-section"}>
                    <Content>
                        <Availability/>
                    </Content>

                    <Content>
                       <Owner/>
                    </Content>
                </div>
            </div>
        </>
    );
}

export default Details;