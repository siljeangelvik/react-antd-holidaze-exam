function ListBookings ({ bookings }) {
    return (
        <div>
            <h1>Bookings</h1>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        {booking.id} - {booking.name} - {booking.hotelName} - {booking.arrivalDate} - {booking.departureDate}
                    </li>
                ))}
            </ul>
        </div>
    )
}