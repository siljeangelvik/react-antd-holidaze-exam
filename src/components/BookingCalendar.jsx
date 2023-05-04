import {Button} from '@mui/material';
import {Typography} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useParams} from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';
import useBooking from '../hooks/useBooking';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES} from '../utilities/constants';

const BookingCalendar = () => {
    const isLoggedIn = useAuthentication();
    const {id} = useParams();
    const {data} = useApiGet(`${API_VENUES}/${id}?_bookings=true`);
    // console.log(data, "data from calendar");
    const bookingsList = data?.bookings;
    // console.log(bookingsList, "bookingsList from calendar");
    const newBookingsList = bookingsList?.map((booking) => {
        return {
            ...booking,
            dateFrom: new Date(booking.dateFrom),
            dateTo: new Date(booking.dateTo),
        };
    });

    console.log(newBookingsList, "newBookingsList from calendar");

    const [selectedDates, setSelectedDates] = useState([]);
    const handleDateClick = (date) => {
        if (selectedDates.length === 0) {
            // if no dates are selected yet, set the start date of the range
            setSelectedDates([date]);
        } else if (selectedDates.length === 1) {
            // if one date is already selected, set the end date of the range
            if (date >= selectedDates[0]) {
                // ensure that the end date is not before the start date
                setSelectedDates([selectedDates[0], date]);
            } else {
                setSelectedDates([date, selectedDates[0]]);
            }
        } else {
            // if two dates are already selected, start a new range with the clicked date
            setSelectedDates([date]);
        }
    };

    const disabledDates = newBookingsList?.flatMap((booking) => {
        const dates = [];
        let currentDate = new Date(booking.dateFrom);
        while (currentDate <= new Date(booking.dateTo)) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    });

    // console.log(disabledDates, "disabledDates from calendar");
    const {loading, error, success, createBooking} = useBooking(
        id,
        selectedDates
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            alert("Please log in to book a venue.");
            return;
        }
        return createBooking();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Calendar
                    value={selectedDates}
                    onChange={setSelectedDates}
                    onClickDay={handleDateClick}
                    minDate={new Date()}
                    tileDisabled={({date, view}) =>
                        view === "month" &&
                        disabledDates?.some(
                            (disabledDate) =>
                                date.getFullYear() === disabledDate.getFullYear() &&
                                date.getMonth() === disabledDate.getMonth() &&
                                date.getDate() === disabledDate.getDate()
                        )
                    }
                    selectRange={true}
                    tileClassName={({date}) =>
                        selectedDates.length === 2 &&
                        date >= selectedDates[0] &&
                        date <= selectedDates[1] &&
                        "selected-range"
                    }
                />
                <Content style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <Button variant="contained" color="primary" type="submit">
                        {loading ? "Loading..." : "Book Now"}
                    </Button>

                    {error && (
                        <Typography.Text type="danger">
                            {error?.message}
                        </Typography.Text>
                    )}
                    {success && (
                        <Typography.Text type="success">
                            Booking successful!
                        </Typography.Text>
                    )}

                </Content>
            </form>
        </div>
    );
};

export default BookingCalendar;

/*
  "bookings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dateFrom": "2023-04-19T01:36:11.758Z",
      "dateTo": "2023-04-19T01:36:11.758Z",
      "guests": 0,
      "created": "2023-04-19T01:36:11.758Z",
      "updated": "2023-04-19T01:36:11.758Z"
    }
  ]
 */

/*
      for (let i = 0; i < bookingsList.length; i++) {
          bookingsList[i].dateFrom = new Date(bookingsList[i].dateFrom);
          bookingsList[i].dateTo = new Date(bookingsList[i].dateTo);
          console.log(bookingsList[i].dateFrom, "bookingsList[i].dateFrom from calendar");
          console.log(bookingsList[i].dateTo, "bookingsList[i].dateTo from calendar");
      }
  */