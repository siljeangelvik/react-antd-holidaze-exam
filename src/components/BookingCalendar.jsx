import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useParams} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES} from '../utilities/constants';

const BookingCalendar = () => {

    const {id} = useParams();
    const response = useApiGet(`${API_VENUES}/${id}?_bookings=true`);
    console.log(response, "bookingsData from calendar");
    const {data} = response;
    console.log(data, "data from calendar");

    const dateFromObj = data[0]?.bookings[0]?.dateFrom;
    console.log(dateFromObj, "dateFromObj from calendar");


    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const disabledDates = [new Date(2022, 3, 25), new Date(2022, 3, 27)];

    return (
        <div>
            {dateFromObj}
            <Calendar
                value={selectedDate}
                onClickDay={handleDateClick}
                minDate={new Date()}
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