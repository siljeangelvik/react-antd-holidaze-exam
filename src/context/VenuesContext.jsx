import React, {createContext} from 'react';
import {useParams} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES_URL} from '../utilities/constants';

const VenuesContext = createContext();

export const VenuesProvider = ({children}) => {

    const {data, isLoading, isError} = useApiGet(API_VENUES_URL);
    console.log(data, "venues From VenuesContext");

    const {id} = useParams();
    const {venues: bookings, owner} = useApiGet(API_VENUES_URL + "/" + id)
    console.log(bookings, "bookings From VenuesContext");
    console.log(owner, "owner From VenuesContext");

    // 73a67858-9f1b-4f46-a0a9-6827655bafc3

    return (
        <VenuesContext.Provider value={{data, isLoading, isError}}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};