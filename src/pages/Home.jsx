import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {VenueList} from '../components/VenuesList';
import Searchbar from '../components/Searchbar';

function Home() {

    return (
        <>

            <Content style={{paddingBottom:"40px"}}>
                <Title level={1}>Holidaze</Title>
                <Title level={4}>Find your perfect holiday destination.</Title>
                <Searchbar/>
            </Content>


            <VenueList/>

        </>
    );
}

export default Home;

