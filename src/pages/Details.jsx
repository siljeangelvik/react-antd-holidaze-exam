import {Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import BasicDateTimePicker from '../components/calendar/DateTimePicker';
import BookingCalendar from '../components/BookingCalendar';
import {VenuesContext} from '../context/VenuesContext';
import {useMediaHandler} from '../hooks/useMediaHandler';
import {formatCurrency} from '../utilities/formatCurrency';

function Details() {

    const {id} = useParams();
    const {data: venues} = useContext(VenuesContext);

    const chosenVenue = venues.find(venue => venue.id === id);
    console.log(chosenVenue, "chosenVenue from Details.jsx");

    const media = useMediaHandler(chosenVenue);
    console.log(chosenVenue?.meta || "No meta found", "chosenVenue META");

    // const API_VENUE_BOOKINGS_URL = `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`;
    // console.log("FETCHING VENUE BOOKINGS",  fetch(API_VENUE_BOOKINGS_URL));

    /*
    const getBookings = () => {
        if (chosenVenue?.bookings) {
            return chosenVenue.bookings.map(booking => {
                return (
                    <Typography.Paragraph>
                        {booking.start} - {booking.end}
                    </Typography.Paragraph>
                );
            });
        } else {
            return <Typography.Paragraph>No bookings found</Typography.Paragraph>;
        }
    };
    */

    return (
        <>
            <Content style={{paddingBottom: ""}}>
                <Title level={1}>{chosenVenue?.name}</Title>
                <Title level={4}>{formatCurrency(chosenVenue?.price)} / night</Title>
            </Content>

            <Content style={{ display:"flex", justifyContent:"flex-end", flexWrap:"wrap", gap:"40px"}}>
                <Typography style={{fontSize:"11px"}}>
                    <strong style={{display:"block"}}>Created at:</strong>
                    <em> {new Date(chosenVenue?.created).toDateString()}</em>
                </Typography>

                <Typography style={{fontSize:"11px"}}>
                    <strong style={{display:"block"}}>Last updated:</strong>
                    <em style={{display:"block"}}> {new Date(chosenVenue?.updated).toDateString()}</em>
                </Typography>
            </Content>

            <Content>
                <Image
                    src={media}
                    alt={chosenVenue?.name}
                />

                <Title level={5}>Description:</Title>
                <Typography.Paragraph>{chosenVenue?.description}</Typography.Paragraph>

                <Title level={5}>Max Guests:</Title>
                <Typography.Paragraph>{chosenVenue?.maxGuests}</Typography.Paragraph>
            </Content>

            <Content>
                <Title level={2}>Availability</Title>
                <BookingCalendar />
            </Content>

            <Content>
                {chosenVenue?.meta && (
                    <>
                        <Title level={2}>Amenities</Title>

                        <Title level={5}>WiFi:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.wifi ? "Yes" : "No"}</Typography.Paragraph>

                        <Title level={5}>Breakfast:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.breakfast ? "Yes" : "No"}</Typography.Paragraph>

                        <Title level={5}>Parking:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.parking ? "Yes" : "No"}</Typography.Paragraph>

                        <Title level={5}>Pets Allowed:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.pets ? "Yes" : "No"}</Typography.Paragraph>
                    </>
                )}
            </Content>


            <Content>
                {chosenVenue?.owner && (
                    <>
                        <Title level={2}>Amenities</Title>

                        <Title level={5}>WiFi:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.wifi ? "Yes" : "No"}</Typography.Paragraph>

                        <Title level={5}>Breakfast:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.breakfast ? "Yes" : "No"}</Typography.Paragraph>

                        <Title level={5}>Parking:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.parking ? "Yes" : "No"}</Typography.Paragraph>

                        <Title level={5}>Pets Allowed:</Title>
                        <Typography.Paragraph>{chosenVenue?.meta?.pets ? "Yes" : "No"}</Typography.Paragraph>
                    </>
                )}
            </Content>

            <Content style={{display: "flex", flexWrap: "wrap", maxWidth: "100%", gap: "20px", alignItems: "center"}}>
                {chosenVenue?.owner && (
                    <>
                        <Image
                            src={chosenVenue?.owner.avatar}
                            alt={chosenVenue?.owner.name}
                            style={{width: "40px", height: "40px", borderRadius: "50%"}}
                        />

                        <div>
                            <Title level={5}>Host:</Title>
                            <Typography.Paragraph>{chosenVenue?.owner.name}</Typography.Paragraph>

                            <Title level={5}>Contact:</Title>
                            <Typography.Paragraph>{chosenVenue?.owner.email}</Typography.Paragraph>
                        </div>
                    </>
                )}
            </Content>

            <Content>
                <Title level={2}>Availability</Title>
                {/* <Typography.Paragraph>{getBookings()}</Typography.Paragraph> */}
            </Content>

        </>
    );
}

export default Details;