import React, {createContext} from 'react';
import useApiGet from '../hooks/useApiGet';
import {API_BASE_URL} from '../utilities/constants';

const VenuesContext = createContext();

export const API_VENUES_URL = `${API_BASE_URL}/venues`;

export const VenuesProvider = ({children}) => {

    const {data, isLoading, isError} = useApiGet(API_VENUES_URL);

    const venues = data;
    console.log(venues, "venues From VenuesContext");


    // 73a67858-9f1b-4f46-a0a9-6827655bafc3

    return (
        <VenuesContext.Provider value={{venues, isLoading, isError}}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};