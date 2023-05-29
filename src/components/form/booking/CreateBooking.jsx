import { Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { Content } from 'antd/lib/layout/layout';
import React, {useContext, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Link} from 'react-router-dom';
import SuccessBookings from '../../alerts/SuccessBooking';
import { API_BOOKINGS } from '../../../utilities/constants';
import useApiPost from '../../../hooks/useApiPost';
import { AuthenticationContext } from '../../../context/AuthenticationContext';
import { VenuesContext } from '../../../context/VenuesContext';

const CreateBooking = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedGuests, setSelectedGuests] = useState(1);

    const { isAuthenticated } = useContext(AuthenticationContext);
    const { allVenues, specificVenue, userBookings } = useContext(VenuesContext);

    const newBookingsList = allVenues?.bookings?.map((booking) => { // map through the bookings list and convert the date strings to date objects
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

    const booking = {
        dateFrom: selectedDates[0],
        dateTo: selectedDates[1],
        guests: selectedGuests,
        venueId: specificVenue?.id,
    };

    const {
        data,
        isLoading,
        isError,
        postData
    } = useApiPost(API_BOOKINGS, isAuthenticated, booking);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postData(booking);
            if (response) {
                // Update the bookings in the context
                userBookings.push({...booking});
                return userBookings;
            } else {
                console.log('Booking failed');
            }
        } catch (error) {
            console.error('Error posting booking:', error);
        }
    };

    return (
        <div>
            {data && booking && <SuccessBookings booking={data} />}
            {isLoading && <div>Loading...</div>}
            {isError && <div>{data.errors[0].message}</div>}
            <form onSubmit={handleSubmit}>
                <Calendar
                    className="calendar"
                    value={selectedDates}
                    onChange={setSelectedDates}
                    onClickDay={handleDateClick}
                    minDate={new Date()}
                    selectRange={true}
                    tileDisabled={({date}) =>
                        disabledDates?.some((disabledDate) => date >= disabledDate.dateFrom && date <= disabledDate.dateTo)
                    }
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
                        <Typography.Text type="secondary">
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
                    <Title level={5}>Your selected {selectedGuests} number of guests</Title>
                </Content>
                <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                    <button type="button" className="primary-button increase-decrease-buttons" onClick={() => {setSelectedGuests(selectedGuests - 1)
                    }}>-
                    </button>
                    <input onChange={(e) => setSelectedGuests(e.target.value)} type="text" value={selectedGuests}
                           max={specificVenue?.maxGuests}
                           min={0}
                           className="guests-input"
                    />
                    <button type="button" className="primary-button increase-decrease-buttons" onClick={() => {
                        setSelectedGuests(selectedGuests + 1)
                    }}>+
                    </button>
                </div>


                {selectedGuests <= 0 && <Typography.Text level={5} type="danger">Please select a valid number of guests</Typography.Text>}
                {selectedGuests > specificVenue?.maxGuests && selectedGuests <= 0 && "Please select a valid number of guests"}
                {selectedGuests > specificVenue?.maxGuests && <Typography.Text level={5} type="danger">You have exceeded the maximum amount of guests allowed</Typography.Text>}
                {selectedGuests > 0 && selectedDates.length >= 2 && !isAuthenticated && (
                    <Title level={5}>You need to be <Link to="/login">logged in</Link> to book a venue</Title>)}

                <Content style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    {selectedGuests > 0
                        && selectedGuests <= specificVenue?.maxGuests
                        && selectedDates.length >= 1 && isAuthenticated
                        && (<button type="submit" className="primary-button">Book Now</button>)}
                </Content>
            </form>
        </div>
    );
}

export default CreateBooking;