const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
});

export function formatDate(date: string | Date) {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return DATE_FORMATTER.format(parsedDate);
}


/*
import useApiGet from '../hooks/useApiGet';
import {API_VENUES_URL} from '../utilities/constants';

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
});
*/

/*
export function formatDate(date: Date | string) {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return DATE_FORMATTER.format(dateObj);
}
*/

/*
const {data: bookings} = useApiGet(`${API_VENUES_URL}/${id}?_owner=true&_bookings=true`);
export const formattedBookings = bookings?.bookings?.map(booking => ({
    ...booking,
    dateFrom: new Date(booking.dateFrom),
    dateTo: new Date(booking.dateTo),
    created: new Date(booking.created),
    updated: new Date(booking.updated)
}));

console.log(formattedBookings, "formattedBookings");

*/




