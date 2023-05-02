import {Col, Row, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {Key, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import VenueItem from '../components/VenueItem';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES, profileName} from '../utilities/constants';

export function BookingsList() {
    const {data} = useApiGet(`${API_PROFILES}/${profileName}?_bookings=true`);
    console.log(data);

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (data?.bookings) {
            setBookings(data?.bookings?.map((booking: { id: Key }) => (
                <Col xs={24} sm={12} md={10} lg={8} style={{display: "flex", justifyContent: "center"}}>
                    <VenueItem key={booking?.id} venue={booking}/>
                </Col>
            )));
        }
    }, [data]);

    console.log(bookings, "bookings from bookingsList");

    return (
        <Content style={{paddingBottom: "40px"}}>
            <Row gutter={[16, 16]} style={{display: "flex", flexWrap: "wrap", rowGap: "50px"}}>
                {/*{bookings.map((venue: { id: Key }) => (
                    <Col xs={24} sm={12} md={10} lg={8} style={{display:"flex", justifyContent:"center"}}>
                        <VenueItem key={venue?.id} venue={venue}/>
                    </Col>
                ))}*/}

                {data?.bookings?.length === 0
                    ? <div style={{display:"flex", flexDirection:"column"}}>
                        <Title level={4}>You have {bookings?.length} upcoming bookings.</Title>
                        <Typography.Text type="secondary">You can book your next adventure from the <Link to="/">Venues</Link> page.</Typography.Text>
                    </div>
                    : bookings
                }
            </Row>
        </Content>
    );
}