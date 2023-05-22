import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const Location = () => {
    const {specificVenue} = useContext(VenuesContext);

    if (!specificVenue?.location) {
        return null; // TODO: Add loading spinner
    }

    const {address, city, zip, country, continent} = specificVenue?.location;
    const handleCheckValue = (value) => {
        if (value === "Unknown" || value === undefined || value === null) {
            return "N/A";
        } else {
            return value;
        }
    }

    return (
        <>
            {/* Location Section */}
            <div>
                <Title level={2}>Location</Title>
                <Typography.Paragraph><strong>Address:</strong> {handleCheckValue(address)}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>City:</strong> {handleCheckValue(city)}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>Zip:</strong> {handleCheckValue(zip)}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>Country:</strong> {handleCheckValue(country)}
                </Typography.Paragraph>
                <Typography.Paragraph><strong>Continent:</strong> {handleCheckValue(continent)}
                </Typography.Paragraph>
            </div>
        </>
    );
};

export default Location;