import React, { useContext} from 'react';
import { Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import {VenuesContext} from '../context/VenuesContext';
import EmptyTab from '../components/profile/EmptyTab';

export function YourVenuesList() {

    const { userProfileVenues} = useContext(VenuesContext);
    // const { userData } = useContext(AuthenticationContext);

    return (
        <Content style={{ paddingBottom: '40px' }}>
            <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px' }}>
                {userProfileVenues && userProfileVenues.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {userProfileVenues}
                    </div>
                ) : (
                    <div>
                        <EmptyTab/>
                    </div>
                )}
            </Row>
        </Content>
    );
}