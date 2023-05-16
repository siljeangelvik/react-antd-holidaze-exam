import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import {Content} from 'antd/lib/layout/layout';
import React, {useContext, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {VenuesContext} from '../context/VenuesContext';
import {AuthenticationContext} from '../context/AuthenticationContext';

const BookingCalendar = (venueId) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [guests, setGuests] = useState(0);

    const {isAuthenticated} = useContext(AuthenticationContext);

    const {allVenues, specificVenue, handleCreateBooking} = useContext(VenuesContext);

    // const {id} = useParams();

   // const {data} = useApiGet(`${API_VENUES}/${id}?_bookings=true`);


    const bookingsList = allVenues?.bookings;

    const newBookingsList = bookingsList?.map((booking) => {
        return {
            ...booking,
            dateFrom: new Date(booking.dateFrom),
            dateTo: new Date(booking.dateTo),
        };
    });

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

    const handleCheckIdMatch = () => {
        console.log(specificVenue?.id, "data?.id from calendar");
        console.log(venueId, "venueId from calendar");
        return specificVenue?.id === specificVenue?.venueId;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        handleCheckIdMatch();

        if (isAuthenticated && selectedDates && setGuests(guests)) {
            handleCreateBooking(specificVenue, selectedDates[0], selectedDates[1], guests);
       console.log(specificVenue, selectedDates[0], selectedDates[1], guests);
        }
        if (!isAuthenticated) {
            alert("Please log in to book a venue.");
        }
    };

    return (
        <div>
            {specificVenue?.dateFrom}
            <form onSubmit={handleSubmit}>
                <Calendar
                    className={"calendar"}
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

                <Content style={{paddingTop: "20px"}}>
                    <Title level={5}>Your selected dates</Title>

                    {selectedDates.length === 0 && (
                        <Typography.Text type="danger">
                            Please select a date range
                        </Typography.Text>
                    )}

                    {selectedDates.length === 1 && (
                        <Typography.Text type="secondary">
                            Please select an end date
                        </Typography.Text>
                    )}

                    {selectedDates.length === 2 && (
                        <Typography.Text type="secondary">
                            {selectedDates[0].toDateString()} - {" "}
                            {selectedDates[1].toDateString()}
                        </Typography.Text>
                    )}
                </Content>

                <Content style={{paddingBottom: "20px"}}>
                    <Title level={5}>Your selected {guests} number of guests</Title>
                </Content>

                <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                    <button className={"primary-button increase-decrease-buttons"} onClick={() => {
                        setGuests(guests - 1)
                    }}>-
                    </button>
                    <input onChange={(e) => setGuests(e.target.value)} type="text" value={guests} max={specificVenue?.maxGuests}
                           min={0} style={{maxWidth: "60px", textAlign: "center"}}/>
                    <button className={"primary-button increase-decrease-buttons"} onClick={() => {
                        setGuests(guests + 1)
                    }}>+
                    </button>
                </div>

                {guests < 0 &&
                    <Typography.Text level={5} type="danger">Please select a valid number of guests</Typography.Text>}

                {guests > specificVenue?.maxGuests &&
                    <Typography.Text level={5} type="danger">You have exceeded the maximum amount of guests
                        allowed</Typography.Text>}
                <Content style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    {guests > 0 && guests <= specificVenue?.maxGuests
                        && (
                            <button type={"submit"} className={"primary-button"}>
                                {"Book Now"}
                            </button>)
                    }
                </Content>
            </form>
        </div>
    );
};

export default BookingCalendar;