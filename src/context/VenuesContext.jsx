import React, {createContext} from 'react';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES} from '../utilities/constants';

const VenuesContext = createContext();

export const VenuesProvider = ({children}) => {

    const {data, isLoading, isError} = useApiGet(API_VENUES);
    // console.log(data, "venues From VenuesContext");
    // 73a67858-9f1b-4f46-a0a9-6827655bafc3

    const sortDataByRecent = (data) => {
        return data?.sort((a, b) => {
            return new Date(b?.createdAt) - new Date(a?.createdAt);
        });
    };

    const sortDataByPopular = (data) => {
        return data?.sort((a, b) => {
            return b?.rating?.length - a?.rating?.length;
        });
    };


    return (
        <VenuesContext.Provider value={{data, isLoading, isError, sortDataByRecent, sortDataByPopular}}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};