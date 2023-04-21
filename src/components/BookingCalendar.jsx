import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useParams} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES_URL} from '../utilities/constants';

const BookingCalendar = () => {

    const {id} = useParams();
    // https://nf-api.onrender.com/api/v1/holidaze/venues/73a67858-9f1b-4f46-a0a9-6827655bafc3?_owner=true&_bookings=true
    const {data: bookings} = useApiGet(`${API_VENUES_URL}/${id}?_owner=true&_bookings=true`);

    console.log(bookings, "bookings from calendar");

    const availableForBooking = [];

    bookings?.bookings?.map(booking => {
        const dateFrom = new Date(booking.dateFrom);
        const dateTo = new Date(booking.dateTo);
        const diffTime = Math.abs(dateTo - dateFrom);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays, "diffDays");
        for (let i = 0; i < diffDays; i++) {
            availableForBooking.push(new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + i));
        }
    });

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateClick = (date) => {
        {availableForBooking
                ? console.log("available") && setSelectedDate(availableForBooking)
                : console.log("not available")}
        setSelectedDate(date);
    };

    const disabledDates = [new Date(2022, 3, 25), new Date(2022, 3, 27)];

    return (
        <div>
            <Calendar
                value={selectedDate}
                onClickDay={handleDateClick}
                activeStartDate={new Date()}
                goToRangeStartOnSelect={true}
                disabledDates={disabledDates}
                tileDisabled={({date}) => availableForBooking.includes(date)}
            />
        </div>
    );
};

export default BookingCalendar;