import {Card, Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {Link} from 'react-router-dom';
import {formatCurrency} from '../utilities/formatCurrency';

const VenueItem = ({venue}) => {
    const {id, name, media, description, price, maxGuests, number} = venue;

    function checkMediaProperty() {
        const placeholderUrl = 'https://cdn.pixabay.com/photo/2016/10/22/18/52/beach-1761410_1280.jpg';
        if (media.length > 0) {
            return media;
        } else {
            return placeholderUrl;
        }
    }

    return (
        <>
            <Link to={`/details/${id}`}>
                <Card style={{
                    maxWidth: '320px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                    borderRadius: '5px',
                    height: '435px',
                }}
                      cover={
                          <Image
                              src={checkMediaProperty(media)}
                              alt={name}
                              height={"213px"}
                              width={"320px"}
                              loading={"lazy"}
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