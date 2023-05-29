import {Content} from 'antd/es/layout/layout';
import React, {useContext} from 'react';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import Amenities from '../../components/details/Amenities';
import {Availability} from '../../components/details/Availability';
import Header from '../../components/details/Header';
import Info from '../../components/details/Info';
import Location from '../../components/details/Location';
import Owner from '../../components/details/Owner';

const Details = () => {
    const {isAuthenticated} = useContext(AuthenticationContext);

    return (
        <>
            <div className={"desktop-row"}>
                <Content>
                    <Header/>
                    <Info/>
                </Content>
                <Content>
                    <Amenities/>
                    <Location/>
                </Content>
            </div>
            <div className={"desktop-row last-section"}>
                <Content>
                    <Availability/>
                </Content>
                <Content>
                    {isAuthenticated && <Owner/>}
                </Content>
            </div>
        </>
    );
};

export default Details;