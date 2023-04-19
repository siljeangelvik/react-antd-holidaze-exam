import {useParams} from 'react-router-dom';
import useApiGet from '../../hooks/useApiGet';

function VenueBookings () {

    const {id} = useParams();
    const {bookings} = useApiGet(`/venues/${id}/bookings`);
    console.log(bookings);



    return (

        <div>

            <h1>Bookings</h1>


        </div>

    );


}

export default VenueBookings;