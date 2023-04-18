import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {Link} from 'react-router-dom';

export function Bookings() {
    return (
        <div>

            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>Your Bookings</Title>
                {localStorage.getItem("token") === null &&
                    <Title level={4}>You are not logged in. Please log in to see your bookings.</Title>
                }

                {localStorage.getItem("token") !== null &&
                    <>
                        <Title level={4}>Hi {localStorage.getItem("name")}, You have no bookings yet.</Title>
                        <Title level={5}>Start <Link to="/"> exploring</Link> our <Link to="/"> collection</Link> of amazing <Link to="/"> venues</Link></Title>
                    </>
                }
            </Content>

        </div>
    );
}