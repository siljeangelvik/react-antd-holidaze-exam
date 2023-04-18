import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {Link} from 'react-router-dom';

export function Bookings() {
    return (
        <>
           <div>
               <Content style={{paddingBottom: "40px"}}>
                   <Title level={1}>Your Bookings</Title>
                   {localStorage.getItem("token") === null &&
                       <>
                           <Title level={4}>You need to be logged in to view your bookings.</Title>
                           <Button type="primary" href="/login">Go to login page</Button>
                       </>
                   }

                   {localStorage.getItem("token") !== null &&
                       <>
                           <Title level={4}>Hi {localStorage.getItem("name")}, You have no bookings yet.</Title>
                           <Title level={5}>Start <Link to="/"> exploring</Link> our <Link to="/"> collection</Link> of
                               amazing <Link to="/"> venues</Link></Title>
                       </>
                   }
               </Content>
           </div>

        </>
    );
}