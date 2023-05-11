import {Row, Col, Input} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {Key, useEffect} from 'react';
import React, {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import {API_VENUES} from '../utilities/constants';
import useApiGet from '../hooks/useApiGet';
import VenueItem from '../components/VenueItem';
import {VenuesContext} from '../context/VenuesContext';

export function VenueList() {

  /*
    const {data, venues, getVenues, venue} = useContext(VenuesContext);
    console.log(venue);

    const dataList = venues?.map((item: { title: string }) => item.title);

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        getVenues();
    }, []);

   */

    const {id} = useParams();
    const {data} = useContext(VenuesContext);
    const {venue} = useApiGet(`${API_VENUES}/${id}`);
    const [searchInput, setSearchInput] = useState('');
    const dataList = venue?.map((item: { title: string }) => item.title);



    return (
        <Content style={{paddingBottom: "40px"}}>
            <Title level={5}>Search your way to you next adventure.</Title>
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

            <Row gutter={[16, 16]} style={{display:"flex", flexWrap:"wrap", rowGap:"30px"}}>
                {/* eslint-disable-next-line array-callback-return */}
                {data?.filter((venue: { name: string }) => {
                    if (searchInput === "") {
                        return venue
                    } else if (venue.name.toLowerCase().includes(searchInput.toLowerCase())) {
                        return venue
                    }
                }).map((venue: { id: Key }) => (
                    <Col xs={24} sm={16} md={12} lg={8} style={{display:"flex", justifyContent:"space-around"}}>
                        <VenueItem key={venue?.id} venue={venue}/>
                    </Col>
                ))}
            </Row>
        </Content>
    );
}