const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
});

export function formatDate(date: Date | string) {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return DATE_FORMATTER.format(dateObj);
}


/*
 const formattedBookings = bookings?.bookings?.map(booking => ({
     ...booking,
     dateFrom: new Date(booking.dateFrom),
     dateTo: new Date(booking.dateTo),
     created: new Date(booking.created),
     updated: new Date(booking.updated)
 }));

 console.log(formattedBookings, "formattedBookings");
 */

