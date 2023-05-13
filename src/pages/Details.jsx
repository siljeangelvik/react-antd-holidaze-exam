import {Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import {formatCurrency} from '../utilities/formatCurrency';
import {VenuesContext} from '../context/VenuesContext';

function Details() {
    const {id} = useParams();
    const {venues} = useContext(VenuesContext);
    const chosenVenue = venues.find(venue => venue.id === id);
    const media = chosenVenue?.media?.length ? chosenVenue?.media : "https://via.placeholder.com/150";
    console.log(chosenVenue?.meta || "No meta found", "chosenVenue.meta");

    return (
        <>
            <div style={{padding: "80px 40px", paddingBottom: "120px", height: "95vh"}}>
                <button className="primary-button">Back</button>

                {/* ROW */}
                <div className={"desktop-row"}>
                    <Content>
                        {/* title, price, image, created, updated */}
                        <div>
                            <Title level={1}>{chosenVenue?.name}</Title>
                            <Title level={4}>{formatCurrency(chosenVenue?.price)} / night</Title>
                            <Image src={media} alt={chosenVenue?.name}/>
                            <div style={{display: "flex", gap: "40px", fontSize: "12px"}}>
                                <p><strong>Created:</strong><em
                                    style={{display: "block"}}>{new Date(chosenVenue?.created).toDateString()}</em></p>
                                <p><strong>Last Updated:</strong><em
                                    style={{display: "block"}}>{new Date(chosenVenue?.updated).toDateString()}</em></p>
                            </div>
                        </div>
                        {/* Description, Max Guests, Rating*/}
                        <div>
                            <Title level={5}>Description:</Title>
                            <Typography.Paragraph>{chosenVenue?.description}</Typography.Paragraph>
                            <Title level={5}>Max Guests:</Title>
                            <Typography.Paragraph>{chosenVenue?.maxGuests}</Typography.Paragraph>
                            <Title level={5}>Rating:</Title>
                            <Typography.Paragraph>{chosenVenue?.rating}/6</Typography.Paragraph>
                        </div>
                    </Content>

                    <Content>
                        {/* Amenities Section */}
                        <div>
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
                        </div>
                        {/* Location Section */}
                        <div>
                            <Title level={2}>Location</Title>
                            <Typography.Paragraph><strong>Address:</strong>{chosenVenue?.location.address}
                            </Typography.Paragraph>
                            <Typography.Paragraph><strong>City:</strong> {chosenVenue?.location.city}
                            </Typography.Paragraph>
                            <Typography.Paragraph><strong>Zip:</strong> {chosenVenue?.location.zip}
                            </Typography.Paragraph>
                            <Typography.Paragraph><strong>Country:</strong> {chosenVenue?.location.country}
                            </Typography.Paragraph>
                            <Typography.Paragraph><strong>Continent:</strong> {chosenVenue?.location.contient}
                            </Typography.Paragraph>
                        </div>
                    </Content>
                </div>


                {/* ROW */}
                <div className={"desktop-row last-section"}>
                    {/* Availability Section */}
                    <Content>
                        <Title level={2}>Availability</Title>
                        <BookingCalendar bookings={chosenVenue?.bookings}/>
                    </Content>

                    {/* Owner "Section" */}
                    <Content>
                        <Image
                            src={chosenVenue?.owner.avatar}
                            alt={chosenVenue?.owner.name}
                            style={{width: "40px", height: "40px", borderRadius: "50%"}}
                        />
                        <Title level={5}>Host:</Title>
                        <Typography.Paragraph>{chosenVenue?.owner.name}</Typography.Paragraph>
                        <Title level={5}>Contact:</Title>
                        <Typography.Paragraph>{chosenVenue?.owner.email}</Typography.Paragraph>
                    </Content>
                </div>
            </div>
        </>
    );
}

export default Details;