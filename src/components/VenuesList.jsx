import {Row, Col, Input} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {Key} from 'react';
import React, {useContext, useState} from 'react';
import {API_VENUES_URL} from '../utilities/constants';
import useApiGet from '../hooks/useApiGet';
import VenueItem from '../components/VenueItem';
import {VenuesContext} from '../context/VenuesContext';

export function VenueList() {

    const {data: venues} = useContext(VenuesContext);
    const {venue} = useApiGet(API_VENUES_URL);
    const [searchInput, setSearchInput] = useState('');
    const dataList = venue?.map((item: { title: string }) => item.title);

    return (
        <Content style={{paddingBottom: "40px"}}>
            <Title level={5}>Search to find a venue</Title>
            <Input.Search
                placeholder="What are you looking for?"
                value={searchInput}
                style={{
                    marginBottom: '2rem',
                    width: "300px",
                    padding: "0.35rem",
                    borderRadius: "0.25rem",
                }}
                onChange={e => setSearchInput(e.target.value)}
            />


            <datalist id="dataList">
                {dataList?.map((item: string, index: Key) => {
                    return (
                        <option key={index} value={item}/>
                    )
                })}
            </datalist>

            <Row gutter={[16, 16]} style={{display:"flex", flexWrap:"wrap", rowGap:"50px"}}>
                {/* eslint-disable-next-line array-callback-return */}
                {venues?.filter((venue: { name: string }) => {
                    if (searchInput === "") {
                        return venue
                    } else if (venue.name.toLowerCase().includes(searchInput.toLowerCase())) {
                        return venue
                    }
                }).map((venue: { id: Key }) => (
                    <Col xs={24} sm={12} md={10} lg={8} style={{display:"flex", justifyContent:"center"}}>
                        <VenueItem key={venue?.id} venue={venue}/>
                    </Col>
                ))}
            </Row>
        </Content>
    );
}