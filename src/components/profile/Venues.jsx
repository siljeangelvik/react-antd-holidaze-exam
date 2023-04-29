import {Row, Col} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {Key} from 'react';
import React from 'react';
import {API_PROFILES, profileName} from '../../utilities/constants';
import useApiGet from '../../hooks/useApiGet';
import VenueItem from '../../components/VenueItem';

export function YourVenues() {

    const {venues} = useApiGet(`${API_PROFILES}/${profileName}/venues`);

    return (
        <Content style={{paddingBottom: "40px"}}>
            <Title level={5}>Search to find a venue</Title>

            <Row gutter={[16, 16]} style={{display: "flex", flexWrap: "wrap", rowGap: "50px"}}>
                {venues?.map((venue: { id: Key }) => (
                    <Col xs={24} sm={12} md={10} lg={8} style={{display: "flex", justifyContent: "center"}}>
                        <VenueItem key={venue?.id} venue={venue}/>
                    </Col>
                ))}
            </Row>
        </Content>
    );
}