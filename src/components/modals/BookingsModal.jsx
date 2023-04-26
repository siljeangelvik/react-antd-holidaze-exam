import {Button, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {Form} from 'antd';
import {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import useApiGet from '../../hooks/useApiGet';
import {VenuesContext} from '../../context/VenuesContext';

export const BookingsModal = () => {

    const {id} = useParams();
    const {data: venue} = useContext(VenuesContext);
    const chosenVenue = venue.find(venue => venue.id === id);
    const chosenVenueBookings = useApiGet()
    console.log(chosenVenue);

    const [guests, setGuests] = useState(0);

    const maxGuests = chosenVenue?.maxGuests;
    console.log(maxGuests, "Max Guests!");

    function handleDecrementGuests() {
        setGuests(guests - 1);

        if (guests <= 0) {
            setGuests(0);
            console.log("You cannot book a venue without using the venue")
        }
    }

    function handleIncrementGuests() {
        setGuests(guests + 1);

        if (guests >= maxGuests) {
            setGuests(maxGuests);
            console.log(maxGuests, "Max Guests Reached");
        }
    }


    /**
     * After user has chosen their selected dates,
     * and their selected guests
     *
     */


    return (
        <Box style={{paddingTop: "20px"}}>
            <Typography variant={"h4"}>Make a reservation</Typography>

            <Form>
                <Typography variant={"h6"}>Guests:</Typography>
                <div style={{display: "flex", flexWrap: "nowrap"}}>
                    <Button onClick={handleDecrementGuests}>-</Button>
                    <div style={{padding: "10px", fontWeight: "bold", fontSize: "16px"}}>{guests}</div>
                    <Button onClick={handleIncrementGuests}>+</Button>
                </div>
            </Form>

            <Button type="submit">Book Now</Button>

        </Box>
    );
}

