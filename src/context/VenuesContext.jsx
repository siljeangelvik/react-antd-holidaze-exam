import React, { createContext } from 'react';
import useApiGet from '../hooks/useApiGet';
import {API_URL} from '../utilities/constants';

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
    const { data: venues, isLoading, isError } = useApiGet(API_URL);

    console.log(venues);

    return (
        <VenuesContext.Provider value={{ venues, isLoading, isError }}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};