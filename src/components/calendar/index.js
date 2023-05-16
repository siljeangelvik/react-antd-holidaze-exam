import React, {useState, useContext} from 'react';
import { Calendar, Box, TextInput, Button } from 'grommet';
import {API_BOOKINGS} from '../../utilities/constants';
import {VenuesContext} from '../../context/VenuesContext';

const MyCalendar = () => {
    const [bookings, setBookings] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookingGuests, setBookingGuests] = useState(0);

    const {specificVenue} = useContext(VenuesContext);

    // Handle user input and post booking to API
    const handleAddBooking = () => {
        const newBooking = {
            dateFrom: startDate,
            dateTo: endDate,
            guests: bookingGuests,
        };

        // Replace 'api/events' with your API endpoint for creating events
        fetch(API_BOOKINGS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBooking),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update events state with the newly created event
                setBookings([...bookings, data]);
                // Reset input fields
                setStartDate('');
                setEndDate('');
                setBookingGuests(0);
            })
            .catch((error) => console.error('Error adding event:', error));
    };

    return (
        <Box align="center" pad="medium">
            <Calendar
                size="small"
                date={(startDate && new Date(endDate)) || undefined}
                onSelect={(date) => setStartDate(date.toISOString()) && setEndDate(date.toISOString()) }
                daysOfWeek
                events={bookings.map((booking) => ({
                    date: new Date(booking.date),
                    color: 'accent-1',
                    // You can customize the event display here
                    // For example, you can show event text on hover
                    // or render a custom component for each event
                }))}
            />

            <Box direction="row" gap="medium" align="center">
                <TextInput
                    placeholder={bookingGuests}
                    value={bookingGuests}
                    onChange={(event) => setBookingGuests(event.target.value)}
                />
                <Button
                    primary
                    label="Add Booking"
                    onClick={handleAddEvent}
                    disabled={!startDate || !bookingGuests}
                />
            </Box>
        </Box>
    );
};

export default MyCalendar;
