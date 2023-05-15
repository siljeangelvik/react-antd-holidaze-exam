/*import React, {createContext, useState} from 'react';
import useApiGet from '../hooks/useApiGet';
import {API_VENUES} from '../utilities/constants';

const VenuesContext = createContext();
// 73a67858-9f1b-4f46-a0a9-6827655bafc3?_bookings=true
export const VenuesProvider = ({children}) => {
    const [limit, setLimit] = useState(9);
    const [offset, setOffset] = useState(0);

    const {data, isLoading, isError} = useApiGet(`${API_VENUES}`);
    const venues = [...data];

    // Get Venues
    const getVenues = async () => {
        setOffset((prevOffset) => prevOffset + limit);
        const response = await fetch(`${data}?limit=${limit}&offset=${offset}`);
        return await response.json();
    };


    // Get Venues List
    const dataList = venues?.map((item: { name: string }) => item.name);


    // Sorting
    const sortDataByRecent = (data) => {
        return data?.sort((a, b) => {
            return new Date(b?.createdAt) - new Date(a?.createdAt);
        });
    };

    return (
        <VenuesContext.Provider
            value={{data, venues, dataList, isLoading, isError, getVenues, sortDataByRecent}}>
            {children}
        </VenuesContext.Provider>
    );
};

export {VenuesContext};
*/

import React, { createContext, useState, useEffect } from 'react';

export const VenuesContext = createContext();

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data;
}

export const VenuesProvider = ({ children }) => {
    const [venues, setVenues] = useState([]);
    const [displayedVenues, setDisplayedVenues] = useState(9);

    useEffect(() => {
        async function fetchVenues() {
            const data = await fetchData('https://nf-api.onrender.com/api/v1/holidaze/venues');
            setVenues(data);
        }
        fetchVenues();
    }, []);

    const getSpecificVenue = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`);
    const getSpecificVenueBookings = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_bookings=true`);
    const getSpecificVenueOwner = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true`);

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            setDisplayedVenues(displayedVenues + 9);
        }
        if (window.scrollY > 100) {
            return <button className="primary-button to-top" onClick={() => scrollTop()}>^</button>;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll, displayedVenues]);

    const value = {
        allVenues: venues.slice(0, displayedVenues),
        getSpecificVenue,
        getSpecificVenueBookings,
        getSpecificVenueOwner,
    };

    return <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>;
};


/*
 // allVenues.then((data) => console.log(data));

    // const allVenuesList = allVenues?.value?.map((venue : { name: string }) => venue.name);

 */