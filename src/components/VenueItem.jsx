import {Card, Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {Link} from 'react-router-dom';
import {useMediaHandler} from '../hooks/useMediaHandler';
import {formatCurrency} from '../utilities/formatCurrency';

const VenueItem = ({venue}) => {

    const {id, name, description, price, maxGuests} = venue;
    console.log(id);

    const media = useMediaHandler(venue);

    return (
        <>
            <Link to={`/details/${id}`}>
                <Card
                    style={{
                        maxWidth: '320px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        transition: '0.3s',
                        borderRadius: '5px',
                        height: '435px',
                    }}
                    cover={
                        <Image
                            src={media}
                            alt={name}
                            height={"213px"}
                        />
                    }
                >
                    <Title level={4}>{name}</Title>

                    <Content>
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
                        <Typography><strong>Max Guests:</strong> {maxGuests}</Typography>
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