import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const Info = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* Description, Max Guests, Rating */}
            <div>
                <Title level={5}>Description:</Title>
                <Typography.Paragraph>{specificVenue?.description ? specificVenue?.description : "N/A"}</Typography.Paragraph>
                <Title level={5}>Max Guests:</Title>
                <Typography.Paragraph>{specificVenue?.maxGuests}</Typography.Paragraph>
                <Title level={5}>Rating:</Title>
                <Typography.Paragraph>{specificVenue?.rating}/6</Typography.Paragraph>
            </div>
        </>
    );
};

export default Info;
