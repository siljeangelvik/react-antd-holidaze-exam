import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {useContext} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {VenueList} from '../components/VenuesList';

export default function Home() {
    const {isAuthenticated, userData} = useContext(AuthenticationContext);

    return (
        <>
            <div style={{padding: "80px 40px", height: "95vh"}}>
                <Content style={{paddingBottom:"20px"}}>
                    <Title level={1}>Holidaze</Title>
                    {!isAuthenticated && <Title level={4}>Find your perfect holiday destination.</Title>}
                    {isAuthenticated && <Title level={4}>Your perfect holiday destination awaits, {userData?.name}!</Title>}
                     <VenueList/>
                </Content>
            </div>
        </>
    );
}