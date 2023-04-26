import {Button} from '@mui/material';
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useParams} from 'react-router-dom';
import {getDatesBetween} from '../components/bookings/getDatesBetween';
import {BookingsModal} from '../components/modals/BookingsModal';
import {formatDate} from '../utilities/formatDate';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES_URL} from '../utilities/constants';


const BookingCalendar = () => {

    // https://nf-api.onrender.com/api/v1/holidaze/venues/73a67858-9f1b-4f46-a0a9-6827655bafc3/?_owner=true&_bookings=true
    const {id} = useParams();
    const {data} = useApiGet(`${API_VENUES_URL}/${id}?_owner=true&_bookings=true`);
    console.log(data, "DATA from BookingCalendar");

    const availableDatesArray = getDatesBetween(new Date(data.bookings?.dateFrom), new Date(data.bookings?.dateTo));
    console.log(availableDatesArray, "availableDatesArray");

    console.log(availableDatesArray.length);



    let myStartDates = data?.bookings?.map((items) => {
        return items.dateFrom
    });
    console.log(parseFloat(myStartDates), "parseFloat myStartDates")


    const formattedDateFromDates = data?.bookings?.dateFrom?.map((dateString) => formatDate(dateString));
    console.log(formattedDateFromDates, "formattedDateFromDates");

    const [selectedDates, setSelectedDates] = useState([]);

    const availableDates = data?.bookings?.flatMap(() => {
        const startDate = data?.bookings?.dateFrom;
        const endDate = data?.bookings?.dateTo;
        const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
        console.log(diffTime, "DiffTime");
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays, "DiffDays");
        return Array.from({length: diffDays}, (_, i) =>
            new Date(startDate).setDate(new Date(startDate).getDate() + i)
        );
    }) || [];


    const availableDatesFrom = data?.bookings?.map((items) => {
        return items.dateFrom
    });
    console.log(availableDatesFrom, "DATA BOOKINGS MAP ITEMS DATEFROM");

    const availableDatesTo = data?.bookings?.map((items) => {
        return items.dateTo.getDate
    });
    console.log(availableDatesTo, "DATA BOOKINGS MAP ITEMS DATETO");


    /*
        datesFrom?.map((item) => {
            return item?.dateFrom;
        })
        console.log(new Date(datesFrom), "datesFrom");

        datesTo?.map((item) => {
            return item?.dateTo;
        })
        console.log(new Date(datesTo), "datesTo");
    */


    const checkAvailableDates = () => {
        if (!availableDates) {
            alert("Date is not available for booking.");
            console.log("Date is not available for booking.");
        }
    }

//    const dateObjects = datesFrom.map(dateString => new Date(dateString));

    const [value, onChange] = useState(new Date());


    console.log([availableDates], "AVAILABLE DATES");

    /*
    {
      "id": "73a67858-9f1b-4f46-a0a9-6827655bafc3",
      "name": "South Park Villa",
      "description": "Beautifull villa with room for 5 people and massive living area.",
      "media": [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      ],
      "price": 200,
      "maxGuests": 5,
      "created": "2023-04-13T18:52:25.666Z",
      "updated": "2023-04-13T18:52:25.666Z",
      "meta": {
        "wifi": true,
        "parking": true,
        "breakfast": true,
        "pets": true
      },
      "owner": {
        "name": "Mich",
        "email": "michthebish@noroff.no",
        "avatar": ""
      },
      "bookings": [
        {
          "id": "b7abdb4b-d9ec-4318-bf86-622f5fd007d8",
          "dateFrom": "2023-04-13T15:03:50.902Z",
          "dateTo": "2023-04-14T15:03:50.902Z",
          "guests": 1,
          "created": "2023-04-14T05:45:41.789Z",
          "updated": "2023-04-14T05:45:41.789Z"
        }
      ]
    }
     */

    /**
     * Initialize an array (`availableDates`) of all available dates
     * by iterating through the bookings in the data object.
     *
     * For each booking, calculate the difference
     * between start and end date, and create an array
     * of all the dates within the booking range.
     *
     * The resulting arrays are then concatenated into a single array
     * of all available dates, which is returned as the output.
     *
     * If there is no bookings in the data object, an empty array is returned.
     * @type {*|*[]}
     */
    /*
        const availableDates = data?.bookings?.flatMap(() => {

            const diffTime = Math.abs(new Date(dateFrom) - new Date(dateTo));
            console.log(diffTime, "DiffTime");
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffDays, "DiffDays");
            return Array.from({length: diffDays}, (_, i) =>
                new Date(dateFrom).setDate(new Date(dateFrom).getDate() + i)
            );
        }) || [];

        const [selectedDates, setSelectedDates] = useState([]);
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);

        const handleDateClick = (date) => {
            if (availableDates.includes(date)) {
                if (!startDate) {
                    setStartDate(date);
                    setSelectedDates([date]);
                } else if (startDate && !endDate && date >= availableDates) {
                    setEndDate(date);
                    setSelectedDates([startDate, date]);
                } else if (startDate && endDate) {
                    setStartDate(date);
                    setEndDate(null);
                    setSelectedDates([date]);
                }
            }
        };
    */

    const [open, setOpen] = useState(false);

    return (
        <div>

            {/*
                <p><strong>toDateString:</strong> {new Date(venueCreated).toDateString()}</p>
                <p><strong>toLocaleDateString:</strong> {new Date(venueCreated).toLocaleDateString()}</p>
                <p><strong>toTimeString:</strong> {new Date(venueCreated).toTimeString()}</p>
                <p><strong>toLocaleTimeString:</strong> {new Date(venueCreated).toLocaleTimeString()}</p>
                <p><strong>toString:</strong> {new Date(venueCreated).toString()}</p>
                <p><strong>toLocaleString:</strong> {new Date(venueCreated).toLocaleString()}</p>
                <p><strong>toISOString:</strong> {new Date(venueCreated).toISOString()}</p>
                <p><strong>toUTCString:</strong> {new Date(venueCreated).toUTCString()}</p>
                <p><strong>formattedDate:</strong> {formatDate(venueCreated)}</p>
                */}


            <Calendar
                selectRange={[availableDatesArray]}
                tileDisabled={checkAvailableDates}
                minDate={new Date(availableDatesFrom)}
                maxDate={new Date(availableDatesTo)}
                value={value}
                onChange={onChange}
                activeStartDate={new Date()}
                onClickDay={()=>setSelectedDates(selectedDates)}

            />

            <Button onClick={() => setOpen(true)}>
                Reserve Venue
            </Button>

            <BookingsModal open={open}/>
        </div>
    );
}

export default BookingCalendar;


/*
 minDate={data?.bookings?.dateFrom}
     minDate={availableStartDate}
                maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                tileDisabled={({activeStartDate, date, view}) =>
                    view === 'month' && !availableDates.includes(date)
                }
                selectRange={true}
                value={selectedDates}
                onChange={setSelectedDates}
                onClickDay={handleDateClick}
 */


/*
     goToRangeStartOnSelect={true}
                disabledDates={({date}) => availableDates.includes(date)}
                tileDisabled={({date}) => availableDates.includes(date)}

 */


// const disabledDates = [new Date(2022, 3, 25), new Date(2022, 3, 27)];

/*
const formattedBookings = bookings?.bookings?.map(booking => ({
    ...booking,
    dateFrom: new Date(booking.dateFrom),
    dateTo: new Date(booking.dateTo),
    created: new Date(booking.created),
    updated: new Date(booking.updated)
}));
console.log(formattedBookings, "formattedBookings from BookingCalendar");
*/

// https://nf-api.onrender.com/api/v1/holidaze/venues/73a67858-9f1b-4f46-a0a9-6827655bafc3?_owner=true&_bookings=true


/*
   const formattedBookings = data?.bookings?.map(booking => ({
       ...booking,
       dateFrom: new Date(booking.dateFrom),
       dateTo: new Date(booking.dateTo),
       created: new Date(booking.created),
       updated: new Date(booking.updated)
   }));
   console.log(formattedBookings, "FORMATTED BOOKINGS")
   */