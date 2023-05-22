import {capitalize} from '@mui/material';
import { Card, Image, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';
import useCheckMediaProperty from '../hooks/useCheckMediaProperty';
import { formatCurrency } from '../utilities/formatCurrency';

const VenueItem = ({ venue }) => {
    const { id, name, media, description, price, maxGuests, number, bookings } = venue;

    const mediaType = useCheckMediaProperty(media);

    /*
    const mediaCarousel = () => {
        if (venue?.media?.length > 0) {
            return venue?.media?.map((media, index) => {
                return (
                    <Image
                        key={index}
                        src={media}
                        alt={name}
                        width="100%"
                        height="213px"
                        loading="lazy"
                    />
                );
            });
        }
        else {
            return (
                <Image
                    src={mediaType}
                    alt={name}
                    width="100%"
                    height="213px"
                    loading="lazy"
                />
            );
        }
    };
    const handleClickMediaCarousel = () => {
        setCount(count + 1);
        console.log(count);

                            <button onClick={handleMediaCarousel}>Click me</button>
                        {mediaCarousel()}
    };
   */

    return (
        <>
            <Link to={`/details/${id}`}>
                <Card
                    style={{
                        width: '320px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        transition: '0.3s',
                        borderRadius: '5px',
                        height: '435px',
                    }}
                    cover={
                        <Image
                            src={mediaType}
                            alt={name}
                            width="100%"
                            height="213px"
                            loading="lazy"
                            aria-label={name}
                        />
                    }
                >
                    <Title level={4}
                           style={{
                               overflow: 'hidden',
                               whiteSpace: 'nowrap',
                               textOverflow: 'ellipsis',
                               maxWidth: '85ch',
                           }}
                    >{capitalize(name)}</Title>
                    <Content>
                        <Typography>{number}</Typography>
                        <Typography.Paragraph
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                maxWidth: '85ch',
                            }}
                        >
                            {description}
                        </Typography.Paragraph>
                        <Typography>
                            <strong>Max Guests:</strong> {maxGuests}
                        </Typography>

                        {bookings && (
                            <Typography>
                                <strong>Bookings:</strong> {bookings.length}
                            </Typography>
                        )}
                        <Typography>
                            <strong>{formatCurrency(price)}</strong> /night
                        </Typography>
                    </Content>
                </Card>
            </Link>
        </>
    );
};

export default VenueItem;