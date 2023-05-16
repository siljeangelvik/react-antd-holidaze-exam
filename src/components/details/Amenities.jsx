import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const Amenities = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* Amenities Section */}
            <div>
                {specificVenue?.meta && (
                    <>
                        <Title level={2}>Amenities</Title>
                        <Title level={5}>WiFi:</Title>
                        <Typography.Paragraph>{specificVenue?.meta.wifi ? "Yes" : "No"}</Typography.Paragraph>
                        <Title level={5}>Breakfast:</Title>
                        <Typography.Paragraph>{specificVenue?.meta.breakfast ? "Yes" : "No"}</Typography.Paragraph>
                        <Title level={5}>Parking:</Title>
                        <Typography.Paragraph>{specificVenue?.meta.parking ? "Yes" : "No"}</Typography.Paragraph>
                        <Title level={5}>Pets Allowed:</Title>
                        <Typography.Paragraph>{specificVenue?.meta.pets ? "Yes" : "No"}</Typography.Paragraph>
                    </>
                )}
            </div>
        </>
    );
};

export default Amenities;
