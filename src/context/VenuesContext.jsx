import React, {createContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES} from '../utilities/constants';

const VenuesContext = createContext();

export const VenuesProvider = ({children}) => {
    const [limit, setLimit] = useState(9);
    const [offset, setOffset] = useState(0);

    const {id} = useParams();

    const {data, isLoading, isError} = useApiGet(`${API_VENUES}?limit=${limit}&offset=${offset}`);
    // console.log(data, "venues From VenuesContext");
    // 73a67858-9f1b-4f46-a0a9-6827655bafc3

    const venues = [...data];
    console.log(venues, "venues From VenuesContext");

    const venue = venues?.find((venue) => venue?.id === id);
    console.log(venue, "venue From VenuesContext");

    // Get Venues
    const getVenues = async () => {
        setOffset((prevOffset) => prevOffset + limit);
        const response = await fetch(`${API_VENUES}?limit=${limit}&offset=${offset}`);
        return await response.json();
    };

    // Sorting
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
        <VenuesContext.Provider
            value={{data, venues, venue, isLoading, isError, getVenues, sortDataByRecent, sortDataByPopular}}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};