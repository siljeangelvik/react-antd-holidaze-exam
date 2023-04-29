import {Col, Row} from 'antd';
import {Content} from 'antd/es/layout/layout';
import React, {Key} from 'react';
import VenueItem from '../components/VenueItem';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES, profileName} from '../utilities/constants';

export function BookingsList() {

    const {data: bookings} = useApiGet(`${API_PROFILES}/${profileName}/bookings`);

    return (
        <Content style={{paddingBottom: "40px"}}>
            <Row gutter={[16, 16]} style={{display:"flex", flexWrap:"wrap", rowGap:"50px"}}>
                {bookings.map((venue: { id: Key }) => (
                    <Col xs={24} sm={12} md={10} lg={8} style={{display:"flex", justifyContent:"center"}}>
                        <VenueItem key={venue?.id} venue={venue}/>
                    </Col>
                ))}
            </Row>
        </Content>
    );
}