import {Rating} from '@mui/material';
import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext, useEffect, useState} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const Info = () => {
    const {specificVenue} = useContext(VenuesContext);

    const rating = specificVenue?.rating;
    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {
        if (rating) {
            setRatingValue(rating);
        }

    }, );

    return (
        <>
            {/* Description, Max Guests, Rating */}
            <div>
                <Title level={5}>Description:</Title>
                <Typography.Paragraph>{specificVenue?.description ? specificVenue?.description : "N/A"}</Typography.Paragraph>
                <Title level={5}>Max Guests:</Title>
                <Typography.Paragraph>{specificVenue?.maxGuests}</Typography.Paragraph>
                <Title level={5}>Rating:</Title>
                <Typography.Paragraph>
                    <Rating name="read-only" value={ratingValue} readOnly/>
                    &nbsp; <span>{ratingValue} / 5</span>
                </Typography.Paragraph>
            </div>
        </>
    );
};

export default Info;
