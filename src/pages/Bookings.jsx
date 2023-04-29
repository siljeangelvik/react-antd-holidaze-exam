import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import EmptyBookings from '../components/profile/EmptyBookings';
import {profileAccessToken} from '../utilities/constants';

function Bookings() {

    const [bookings, setBookings] = useState([]);

    return (
        <>
           <div>
               <Content style={{paddingBottom: "40px"}}>
                   <Title level={1}>Your Bookings</Title>
                   {profileAccessToken === null &&
                       <>
                           <Title level={4}>You need to be logged in to view your bookings.</Title>
                           <Button type="primary" href="/login">Go to login page</Button>
                       </>
                   }

                   {profileAccessToken !== null &&
                       <>
                           <Title level={4}>Hi {localStorage.getItem("name")}, You have no bookings yet.</Title>
                           {bookings.length > 0 &&
                               <>
                                   <Title level={4}>You have {bookings.length} bookings.</Title>
                                   {/*<BookingsList bookings={bookings}/>*/}
                               </>
                            }
                           <EmptyBookings/>
                       </>
                   }
               </Content>
           </div>

        </>
    );
}

export default Bookings;