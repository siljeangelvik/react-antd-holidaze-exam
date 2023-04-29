import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateVenue from './CreateVenue';
import EmptyTab from './EmptyTab';
import Bookings from './Bookings';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfileMenu() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Bookings/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EmptyTab/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CreateVenue/>
            </TabPanel>

        </Box>
    );
}

/*
import { Tabs } from 'antd';
import {Content} from 'antd/es/layout/layout';
import React from 'react';
import CreateVenue from './CreateVenue';
import EmptyTab from './EmptyTab';
import Bookings from './Bookings';

const { TabPane } = Tabs;

export default function ProfileMenu () {

    let one = <Bookings/>;
    let two = <EmptyTab/>;
    let three = <CreateVenue/>;

    const tabs = [
       one, two, three
    ]


    return(
        <Content style={{marginTop:"40px"}}>

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
*/