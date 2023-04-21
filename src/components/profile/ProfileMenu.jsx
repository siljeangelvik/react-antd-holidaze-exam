import {Tabs} from 'antd';
import {Content} from 'antd/es/layout/layout';
import React from 'react';
import CreateVenue from './CreateVenue';
import EmptyTab from './EmptyTab';
import Bookings from './Bookings';

const {TabPane} = Tabs;

export default function ProfileMenu() {

    let one = <Bookings/>;
    let two = <EmptyTab/>;
    let three = <CreateVenue/>;

    const tabs = [
        one, two, three
    ]


    return (
        <Content style={{marginTop: "40px"}}>
            <Tabs defaultActiveKey="one" size={tabs}>
                <TabPane tab="Bookings" key="one">
                    {one}
                </TabPane>
                <TabPane tab="Venues" key="two">
                    {two}
                </TabPane>
                <TabPane tab="Create Venue" key="three">
                    {three}
                </TabPane>
            </Tabs>
        </Content>
    );

}
