import React, {createContext} from 'react';
import {useParams} from 'react-router-dom';
import {API_BOOKINGS, API_VENUES} from '../utilities/constants';
import useApiGet from '../hooks/useApiGet';

// 73a67858-9f1b-4f46-a0a9-6827655bafc3


const VenuesContext = createContext();

export const VenuesProvider = ({children}) => {
    const {id} = useParams();

    const {data, isLoading, isError} = useApiGet(API_VENUES);
    console.log(data, "VENUES From VenuesContext");

    const {venue} = useApiGet(`${API_VENUES}/${id}?_owner=true&_bookings=true`);
    console.log(id, "VENUE From VenuesContext");


    const {bookings} = useApiGet(`${API_BOOKINGS}/${id}?_customer=true&_venue=true`)
    console.log(bookings, "bookings from VenuesContext")



    return (
        <VenuesContext.Provider value={{data, venue, isLoading, isError}}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};

