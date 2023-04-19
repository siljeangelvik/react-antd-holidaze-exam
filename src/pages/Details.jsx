import {Button, Image, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import Calendar from '../components/Calendar';
import {useMediaHandler} from '../hooks/useMediaHandler';
import {formatCurrency} from '../utilities/formatCurrency';
import {VenuesContext} from '../context/VenuesContext';

function Details({venue}) {

    console.log(venue, "venueTestId From VenuesContext");

    const {id} = useParams();
    const {venues} = useContext(VenuesContext);
    const chosenVenue = venues.find(venue => venue.id === id);
    const media = useMediaHandler(chosenVenue);

    console.log(chosenVenue?.meta || "No meta found", "chosenVenue.meta");
    console.log(chosenVenue?.owner?.name || "No owner found", "chosenVenue.owner");

    let [openCalendar, setOpenCalendar] = useState(false);

    const handleCalendar = () => {
        setOpenCalendar(<Calendar venue={chosenVenue} />);
    }

    return (
        <>

            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>{chosenVenue?.name}</Title>
                <Title level={4}>{formatCurrency(chosenVenue?.price)} / night</Title>
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


            {!openCalendar &&
                <Content style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                    <Button type="primary" onClick={() => setOpenCalendar(true)} style={{width:"300px"}}>Reserve</Button>
                </Content>
            }


            {openCalendar &&
                <Content style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                    <Calendar venue={chosenVenue} />
                    <Button type="primary" onClick={() => handleCalendar()} style={{width:"300px"}}>Book Now</Button>
                    <Button type="primary" onClick={() => setOpenCalendar(false)} style={{width:"300px"}}>Close Calendar</Button>
                </Content>
            }

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



            <Content style={{display: "flex", flexWrap: "wrap", maxWidth: "100%", gap: "20px", alignItems: "center"}}>
                {chosenVenue?.owner && (
                    <>
                        <Image
                            src={chosenVenue.owner.avatar}
                            alt={chosenVenue.owner.name}
                            style={{width: "40px", height: "40px", borderRadius: "50%"}}
                        />

                        <div>
                            <Title level={5}>Host:</Title>
                            <Typography.Paragraph>{chosenVenue.owner.name}</Typography.Paragraph>

                            <Title level={5}>Contact:</Title>
                            <Typography.Paragraph>{chosenVenue.owner.email}</Typography.Paragraph>
                        </div>
                    </>
                )}
            </Content>

        </>
    );
}

export default Details;