import React, { createContext, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticationContext } from './AuthenticationContext';

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
    const [userBookings, setUserBookings] = useState([]);
    const { id } = useParams();
    const { userData, isAuthenticated } = useContext(AuthenticationContext);
    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [displayedVenues, setDisplayedVenues] = useState(9);

    const specificVenue = venues?.find(venue => venue.id === id);
    const getSpecificVenue = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true&sort=desc`);

    useEffect(() => {
        const fetchVenues = async () => {
            const data = await fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues?_bookings=true&_owner=true`);
            setVenues(data);
        };

        fetchVenues();
    }, []);

    useEffect(() => {
        const fetchUserBookings = async () => {
            if (!isAuthenticated) {
                return;
            }
            const data = await fetchData(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${userData?.name}/bookings?_sort=desc&_limit=${displayedVenues}`);
            setUserBookings(data);
        };

        fetchUserBookings();
    }, [userData, isAuthenticated, displayedVenues]);

    useEffect(() => {
        const filtered = venues.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVenues(filtered);
    }, [searchTerm, venues]);

    const updateBookings = (newBookings) => {
        setUserBookings(newBookings);
    };

    const value = {
        allVenues: venues.slice(0, displayedVenues),
        handleSearch: (e) => setSearchTerm(e.target.value),
        filteredVenues,
        hasVenues: userData?.venues?.length > 0,
        specificVenue: venues?.find((venue) => venue.id === id),
        getSpecificVenue: async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true&sort=desc`),
        disabledDates: (current) => {
            if (!specificVenue || !specificVenue.bookings || specificVenue.bookings.length === 0) {
                return false;
            }
            const currentDate = current.toISOString().slice(0, 10);
            for (const booking of specificVenue.bookings) {
                if (booking && booking.dateFrom && booking.dateTo) {
                    const { dateFrom, dateTo } = booking;
                    if (currentDate >= dateFrom && currentDate <= dateTo) {
                        return true;
                    }
                }
            }
            return false;
        },
        userBookings,
        updateBookings
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            setDisplayedVenues((prevDisplayedVenues) => prevDisplayedVenues + 9);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>;
};

export default VenuesProvider;