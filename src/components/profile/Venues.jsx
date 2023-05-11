import {Row, Col, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {Key, useContext} from 'react';
import React from 'react';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import {API_PROFILES} from '../../utilities/constants';
import useApiGet from '../../hooks/useApiGet';
import VenueItem from '../../components/VenueItem';

export const Venues = () => {

    const {isAuthenticated, isManager} = useContext(AuthenticationContext);
    const {data: venues} = useApiGet(`${API_PROFILES}/${localStorage.getItem("name")}/venues`);
    console.log(venues, "data from venues page - YOUR VENUES!");
    console.log(isManager, "isManager from venues page - YOUR VENUES!");


    return (
        <>
            {isAuthenticated && (
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={3}>Your Venues to Manage</Title>
                    <Title level={5}>You are currently managing <em>{venues.length}</em> venues.</Title>
                    <Typography><strong>Venues:</strong> {venues}</Typography>

                    <Title level={5}>Search to find a venue</Title>

                    <Row gutter={[16, 16]} style={{display: "flex", flexWrap: "wrap", rowGap: "50px"}}>
                        {venues?.map((venue: { id: Key }) => (
                            <Col xs={24} sm={12} md={10} lg={8} style={{display: "flex", justifyContent: "center"}}>
                                <VenueItem key={venue?.id} venue={venue}/>
                            </Col>
                        ))}
                    </Row>
                </Content>
            )}

            {isAuthenticated && isManager && (
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={3}>Your Venues to Manage</Title>
                    <Title level={5}>You are currently managing <em>{venues.length}</em> venues.</Title>
                    <Typography><strong>Venues:</strong> {venues}</Typography>

                    <Title level={5}>Search to find a venue</Title>

                    <Row gutter={[16, 16]} style={{display: "flex", flexWrap: "wrap", rowGap: "50px"}}>
                        {venues?.map((venue: { id: Key }) => (
                            <Col xs={24} sm={12} md={10} lg={8} style={{display: "flex", justifyContent: "center"}}>
                                <VenueItem key={venue?.id} venue={venue}/>
                            </Col>
                        ))}
                    </Row>
                </Content>
            )}

        </>
    );
}