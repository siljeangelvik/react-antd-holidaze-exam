import {Button, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {BookingsList} from '../components/BookingsList';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILES, profileAccessToken, profileName} from '../utilities/constants';

function Bookings() {

    const [bookings, setBookings] = useState([]);

    const profileBookings = useApiGet(`${API_PROFILES}/${profileName}/bookings`, profileAccessToken, (response) => {
            setBookings(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        }
    );

    useEffect(() => {
        if (profileBookings.data !== undefined) {
            setBookings(profileBookings.data);
        }
        console.log(profileBookings.data)
    }, [profileBookings]);


    return (
        <>
            <div>
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>Your Bookings</Title>
                    {profileAccessToken === null && <>
                        <Title level={4}>You need to be logged in to view your bookings.</Title>
                        <Button type="primary" href="/login">Go to login page</Button></>
                    }

                    {profileAccessToken !== null && <>
                        <Title level={4}>Hi {localStorage.getItem("name")}, You have no bookings yet.</Title>
                        {bookings.length > 0 && <>
                            <Title level={4}>You have {bookings.length} bookings.</Title>
                            <BookingsList bookings={bookings}/>
                        </>
                        }
                        <Typography.Text type="secondary">You can book a venue from the <Link to="/">Venues</Link> page.</Typography.Text>
                        </>
                    }
                </Content>
            </div>
        </>
    );
}

export default Bookings;