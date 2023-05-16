// https://nf-api.onrender.com/api/v1/holidaze/venues/73a67858-9f1b-4f46-a0a9-6827655bafc3?_bookings=true&_owner=true

import React, {createContext, useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {AuthenticationContext} from './AuthenticationContext';

export const VenuesContext = createContext();

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data;
}

export const VenuesProvider = ({children}) => {
    const [venues, setVenues] = useState([]);
    const [displayedVenues, setDisplayedVenues] = useState(9);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);

    const {id} = useParams();
    const{userData} = useContext(AuthenticationContext);

    const getSpecificVenue = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`);
    const getSpecificVenueBookings = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_bookings=true`);
    const getSpecificVenueOwner = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true`);

    useEffect(() => {
        async function fetchVenues() {
            const data = await fetchData('https://nf-api.onrender.com/api/v1/holidaze/venues?_bookings=true&_owner=true');
            setVenues(data);
        }

        fetchVenues();
    }, []);

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            setDisplayedVenues(displayedVenues + 9);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [displayedVenues, handleScroll]);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const filtered = venues.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVenues(filtered);
    }, [searchTerm, venues]);




    const hasVenues = userData?.venues?.length > 0;

    const specificVenue = venues.find(venue => venue.id === id);



    const value = {
        allVenues: venues.slice(0, displayedVenues),
        handleSearch,
        filteredVenues,
        hasVenues,
        specificVenue,
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