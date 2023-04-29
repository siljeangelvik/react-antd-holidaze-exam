import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useParams} from 'react-router-dom';
import useApiGet from '../../hooks/useApiGet';
import {API_VENUES_URL} from '../../utilities/constants';

export default function BasicDateTimePicker() {

    const {id} = useParams();
    const {data} = useApiGet(`${API_VENUES_URL}/${id}?_owner=true&_bookings=true`);
    console.log(data, "DATA from BookingCalendar");

  //  const datesTo = data?.bookings?.dateTo;  // undefined
    const datesFrom = data?.bookings?.dateFrom;  // undefined
    const availableStartDates = new Date(datesFrom); // invalid date
    console.log(datesFrom, availableStartDates, "datesFrom & availableStartDate");


    let myStartDates = data?.bookings?.map((items) => {
        return items.dateFrom
    });
    console.log(new Date(myStartDates).toDateString(), "parseFloat myStartDates")


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Basic date time picker" />
            </DemoContainer>
        </LocalizationProvider>
    );
}