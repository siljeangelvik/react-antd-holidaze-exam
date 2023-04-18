import {Card, Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/skeleton/Title';
import React from 'react';
import {Link} from 'react-router-dom';
import {formatCurrency} from '../utilities/formatCurrency';

export function VenueItem({venue}) {

    const id = venue?.id;

    return (
        <>
            <Link to={`/${id}`}>
                <Card
                    style={{
                        maxWidth: '320px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        transition: '0.3s',
                        borderRadius: '5px',
                    }}
                    cover={
                        <Image
                            src={
                                venue?.media && venue?.media[0]
                                    ? venue?.media[0]
                                    : 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg'
                            }
                            alt={venue?.name}
                            height={"213px"}
                        />
                    }
                >
                    <Title>{venue?.name}</Title>

                    <Content>
                        <Typography.Paragraph
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                maxWidth: '85ch',
                            }}
                        >
                            {venue?.description}
                        </Typography.Paragraph>
                        <Typography>4 Jun - 2 Jul</Typography>
                        <Typography>
                            <strong>{formatCurrency(venue?.price)}</strong> night
                        </Typography>
                    </Content>
                </Card>
            </Link>
        </>
    );
}
