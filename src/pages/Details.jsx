import {Content} from 'antd/es/layout/layout';
import React from 'react';
import {VenueItem} from '../components/VenueItem';
import Title from 'antd/es/typography/Title';

function Details() {

    return (
        <>

            <Content style={{paddingBottom:"40px"}}>
                <Title level={1}>Holidaze</Title>
            </Content>

          <VenueItem/>

        </>
    );
}

export default Details;