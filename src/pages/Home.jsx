import React, {useContext} from 'react';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {VenuesList} from '../components/VenuesList';
import {AuthenticationContext} from '../context/AuthenticationContext';

export default function Home() {
    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);

    return (
        <div style={{padding: "80px 20px 120px 20px", minHeight: "95vh"}}>
            <Content>
                <Title level={1}>Holidaze</Title>
                {isAuthenticated ? (
                    <Title level={4}>Your perfect holiday destination awaits, {userProfile?.name}!</Title>
                ) : (
                    <Title level={4}>Find your perfect holiday destination.</Title>
                )}
            </Content>
            <VenuesList/>
        </div>
    );
}