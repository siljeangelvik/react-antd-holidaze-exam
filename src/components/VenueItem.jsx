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
                        />
                    }
                >
                    <Title level={4}>{name}</Title>
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
                        <Typography>
                            <strong>{formatCurrency(price)}</strong> /night
                        </Typography>
                        {bookings && (
                            <Typography>
                                <strong>Bookings:</strong> {bookings.length}
                            </Typography>
                        )}
                    </Content>
                </Card>
            </Link>
        </>
    );
};

export default VenueItem;