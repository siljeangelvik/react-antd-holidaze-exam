import React, {createContext} from 'react';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES} from '../utilities/constants';

const VenuesContext = createContext();

export const VenuesProvider = ({children}) => {

    const {data, isLoading, isError} = useApiGet(API_VENUES);
    console.log(data, "venues From VenuesContext");


    // 73a67858-9f1b-4f46-a0a9-6827655bafc3

    return (
        <VenuesContext.Provider value={{data, isLoading, isError}}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};