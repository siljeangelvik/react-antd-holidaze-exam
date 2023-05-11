import {Row, Col, Input} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {Key, useEffect} from 'react';
import React, {useContext, useState} from 'react';
import VenueItem from '../components/VenueItem';
import {VenuesContext} from '../context/VenuesContext';

export function VenueList() {

    // const {id} = useParams();
    const {data, getVenues} = useContext(VenuesContext);
    // const {venue} = useApiGet(`${API_VENUES}/${id}`);
    const [searchInput, setSearchInput] = useState('');
    const dataList = data?.map((item: { name: string }) => item.name);

    // Lazy Loading
    const lazyLoader = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            getVenues().then(r => {
                console.log(r, "r");
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', lazyLoader);
        return () => window.removeEventListener('scroll', lazyLoader);
    }, []);

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

            <Row gutter={[16, 16]} style={{display: "flex", flexWrap: "wrap", rowGap: "30px"}}>
                {data?.filter((venue: { name: string }) => {
                    if (searchInput === "") {
                        return venue
                    } else if (venue.name.toLowerCase().includes(searchInput.toLowerCase())) {
                        return venue
                    }
                }).map((venue: { id: Key }) => (
                    <Col xs={24} sm={16} md={12} lg={8} style={{display: "flex", justifyContent: "space-around"}}>
                        <VenueItem key={venue?.id} venue={venue}/>
                    </Col>
                ))}
            </Row>
        </Content>
    );
}