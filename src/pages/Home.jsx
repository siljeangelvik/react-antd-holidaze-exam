import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {profileAccessToken, profileName} from '../utilities/constants';
import {VenueList} from '../components/VenuesList';


export default function Home() {

    const isLoggedIn = profileAccessToken;

    return (
        <>
            <Content style={{padding:"20px"}}>
                <Title level={1}>Holidaze</Title>

                {!isLoggedIn && <Title level={4}>Find your perfect holiday destination.</Title>}
                {isLoggedIn && <Title level={4}>Your perfect holiday destination awaits, {profileName}!</Title>}
            </Content>

            <VenueList />

        </>
    );
}

