import {Card, Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {formatCurrency} from '../utilities/formatCurrency';
import {VenuesContext} from '../context/VenuesContext';

function Venue(props) {
    return (
        <Link to={`/details/${props.venue.id}`}>
            <Typography.Title level={3}>{props.venue.name}</Typography.Title>
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
                        src={props.venue.media}
                        alt={props.venue.name}
                        height={"213px"}
                        width={"320px"}
                    />
                }
            >
                <Title level={4}>{props.venue.name}</Title>

                <Content>
                    <Typography.Paragraph
                        style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            maxWidth: '85ch',
                        }}
                    >
                        {props.venue.description}
                    </Typography.Paragraph>
                    <Typography><strong>Max Guests:</strong> {props.venue.maxGuests}</Typography>
                    <Typography>
                        <strong>{props.venue.price}</strong> /night
                    </Typography>
                </Content>
            </Card>
        </Link>
    );
}


function AllVenues() {

    const {allVenues} = useContext(VenuesContext);

    const venueInfo = {
        id: allVenues.id,
        name: allVenues.name,
        media: allVenues.media,
        description: allVenues.description,
        price: formatCurrency(allVenues.price),
        maxGuests: allVenues.maxGuests,

    }

    return (
        <>
            {allVenues.map(() => (
                <Venue key={allVenues.id} venue={venueInfo}/>
            ))}
        </>
    );
}

export default AllVenues;