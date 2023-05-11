import { useState } from "react";
import {useParams} from 'react-router-dom';
import {API_BOOKINGS} from '../utilities/constants';

const useBooking = (venueId, selectedDates, guests) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const {id} = useParams();

    const createBooking = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // `${API_VENUES}/${venueId}?_bookings=true`
        try {
            const response = await fetch(`${API_BOOKINGS}/${id}?_bookings=true`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dateFrom: selectedDates[0],
                    dateTo: selectedDates[1],
                    guests: guests,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create booking.");
            }

            setSuccess(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, createBooking };
};

export default useBooking;
