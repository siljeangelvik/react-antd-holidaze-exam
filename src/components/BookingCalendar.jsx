import React, {useContext, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {VenuesContext} from '../context/VenuesContext';

const BookingCalendar = () => {

    const {data: bookings} = useContext(VenuesContext);
    console.log(bookings?.id, "bookings from calendar");


    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const disabledDates = [new Date(2022, 3, 25), new Date(2022, 3, 27)];

    return (
        <div>
            <Calendar
                value={selectedDate}
                onClickDay={handleDateClick}
                tileDisabled={({activeStartDate, date, view}) =>
                    view === 'month' &&
                    disabledDates.some((disabledDate) =>
                        date.getFullYear() === disabledDate.getFullYear() &&
                        date.getMonth() === disabledDate.getMonth() &&
                        date.getDate() === disabledDate.getDate()
                    )
                }
            />
        </div>
    );
};

export default BookingCalendar;