import {Button, DatePicker, Radio, Space} from 'antd';
import {useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import useApiGet from '../../hooks/useApiGet';


const {RangePicker} = DatePicker;

const CalendarFC = ({onBooking}) => {

    const dateFromRef = useRef();
    const dateToRef = useRef();


    const {id} = useParams();
    const bookings = useApiGet(`/venues/${id}/bookings/${id}`);
    console.log(bookings, "Bookings from CalendarFC");


    const booking = bookings?.filter(booking => booking.id === id);
    console.log(booking, "Booking from CalendarFC");






    console.log(booking);

    if (bookings?.id === id) {
        console.log(bookings && bookings.id === id);
    }


    bookings.forEach(booking => {
        const availableDates = bookings
            .filter(booking => booking.venueId === id)
            .map(booking => {
                const dateFrom = new Date(booking.dateFrom);
                const dateTo = new Date(booking.dateTo);
                const dates = [];
                while (dateFrom <= dateTo) {
                    dates.push(new Date(dateFrom));
                    dateFrom.setDate(dateFrom.getDate() + 1);
                }
                return dates;
            })
            .flat()
            .map(date => date.toISOString().split('T')[0]);

        console.log(availableDates);
    });


    function handleBooking() {
        const [dateFrom, dateTo] = dateFromRef.current.state.value;
        onBooking({dateFrom, dateTo});
    }


    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    return (
        <Space direction="vertical" size={12}>
            <Radio.Group value={size} onChange={handleSizeChange}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="middle">middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>

            <RangePicker
                ref={dateFromRef && dateToRef}
                onChange={handleBooking}
                size={size}
                disabledDates={bookings}
            />

            <Button type="primary" onClick={handleBooking}>Book</Button>
        </Space>
    );
};

export default CalendarFC;