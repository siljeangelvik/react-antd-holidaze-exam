import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const Location = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* Location Section */}
            <div>
                <Title level={2}>Location</Title>
                <Typography.Paragraph><strong>Address:</strong> {specificVenue?.location.address ? specificVenue?.location.address : "N/A"}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>City:</strong> {specificVenue?.location.city ? specificVenue?.location.city : "N/A"}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>Zip:</strong> {specificVenue?.location.zip ? specificVenue?.location.zip : "N/A"}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>Country:</strong> {specificVenue?.location.country ? specificVenue?.location.country : "N/A"}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>Continent:</strong> {specificVenue?.location.contient ? specificVenue?.location.contient : "N/A"}
                </Typography.Paragraph>
            </div>
        </>
    );
};

export default Location;
