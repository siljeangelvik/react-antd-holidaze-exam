import {Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import {Content} from 'antd/lib/layout/layout';
import React, {useContext, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useApiPost from '../hooks/useApiPost';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {VenuesContext} from '../context/VenuesContext';

const BookingCalendar = () => {
        const [selectedDates, setSelectedDates] = useState([]);
        const [selectedGuests, setSelectedGuests] = useState(1);

        const {isAuthenticated} = useContext(AuthenticationContext);

        const {allVenues, specificVenue, disabledDates} = useContext(VenuesContext);

        console.log(specificVenue?.bookings.length, "The amount of bookings on this Venue -  from calendar");

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

       /*
        const disabledDates = newBookingsList?.flatMap((booking) => {
            const dates = [];
            let currentDate = new Date(booking.dateFrom);
            while (currentDate <= new Date(booking.dateTo)) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
        });
*/

        const booking = {
            dateFrom: selectedDates[0],
            dateTo: selectedDates[1],
            guests: selectedGuests,
            venueId: specificVenue?.id,
        };

        const {data, isLoading, isError, postData } = useApiPost("https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_venue=true");

        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await postData(booking);
                if (response) {
                    console.log('Booking successful, Response:', response);
                    console.log('Booking successful, Booking:', booking);
                    return response;
                } else {
                    console.log('Booking failed');
                }
            } catch (error) {
                console.error('Error posting booking:', error);
            }
            if (isLoading) {
                return console.log('Booking is loading');
            }
            if (isError) {
                return console.log('Booking failed', data.errors[0].message);
            }
        };


        return (
            <div>
                {isError && <div>{data.errors[0].message}</div>}
                <form onSubmit={handleSubmit}>
                    <Calendar
                        className="calendar"
                        value={selectedDates}
                        onChange={setSelectedDates}
                        onClickDay={handleDateClick}
                        minDate={new Date()}
                        tileDisabled={specificVenue?.bookings?.dateFrom && specificVenue?.bookings?.dateTo && disabledDates}
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
                        <Title level={5}>Your selected {selectedGuests} number of guests</Title>
                    </Content>

                    <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                        <button type="button" className={"primary-button increase-decrease-buttons"} onClick={() => {
                            setSelectedGuests(selectedGuests - 1)
                        }}>-
                        </button>
                        <input onChange={(e) => setSelectedGuests(e.target.value)} type="text" value={selectedGuests}
                               max={specificVenue?.maxGuests}
                               min={0} style={{maxWidth: "60px", textAlign: "center"}}/>
                        <button type="button" className={"primary-button increase-decrease-buttons"} onClick={() => {
                            setSelectedGuests(selectedGuests + 1)
                        }}>+
                        </button>
                    </div>

                    {selectedGuests <= 0 &&
                        <Typography.Text level={5} type="danger">
                            Please select a valid number of guests
                        </Typography.Text>
                    }


                    {selectedGuests > specificVenue?.maxGuests &&
                        <Typography.Text level={5} type="danger">
                            You have exceeded the maximum amount of guests allowed
                        </Typography.Text>
                    }


                    <Content style={{paddingTop: "10px", paddingBottom: "10px"}}>
                        {selectedGuests > 0 && selectedGuests <= specificVenue?.maxGuests && selectedDates.length >= 1 && isAuthenticated
                            && (
                                <button type="submit" className="primary-button" >
                                    Book Now
                                </button>)
                        }
                    </Content>
                </form>
            </div>
        );
    }
;

export default BookingCalendar;


// const {id} = useParams();
// const {data} = useApiGet(`${API_VENUES}/${id}?_bookings=true`);
// https://nf-api.onrender.com/api/v1/holidaze/venues/0b421a07-f14d-4faa-825a-3b274c73355f?_bookings=true
// 0b421a07-f14d-4faa-825a-3b274c73355f
