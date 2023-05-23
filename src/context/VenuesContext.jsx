import React, {createContext, useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {API_VENUES} from '../utilities/constants';
import {AuthenticationContext} from './AuthenticationContext';

export const VenuesContext = createContext();

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data;
};

export const VenuesProvider = ({children}) => {
    const {id} = useParams();
    const {userData, userProfile} = useContext(AuthenticationContext);

    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [limit, setLimit] = useState(9);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(9);
    const [userBookings, setUserBookings] = useState([]);
    const [userVenues, setUserVenues] = useState([]);



    console.log(userBookings);
    console.log(userVenues);


    const specificVenue = venues.find((venue) => venue.id === id);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const data = await fetchData(
                    `${API_VENUES}?_sort=${searchTerm}&_sortOrder=desc&_offset=${offset}&_limit=${limit}&_venues=true&_bookings=true&_owner=true`
                );
                setVenues(data);
                // setFilteredVenues(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchVenues().catch((error) => console.log(error));
    }, [limit]);

    useEffect(() => {
        const filtered = venues.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVenues(filtered);
    }, [searchTerm, venues, limit]);


    const updateBookings = (newBookings) => {
        setUserBookings(newBookings);
    };

    const updateVenues = (newVenues) => {
        setUserVenues(newVenues);
    };

    function addToBookings(venue) { // Add venue to bookings array
        setUserBookings((prevBookings) => [...prevBookings, venue]);
    }

    function removeFromBookings(venue) { // Remove venue from bookings array
        setUserBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== venue.id));
    }

    function toggleEditBookings(venue) { // Toggle venue in bookings array (add or remove)
        if (userBookings.some((booking) => booking.id === venue.id)) {
            removeFromBookings(venue);
        } else {
            addToBookings(venue);
        }
    }


    const value = {
        allVenues: venues.slice(0, limit), // Used for the list
        carouselVenues: venues.slice(0, count), // Used for the carousel
        setCount, // Used for the carousel
        // handle onclick loop through venue media if media.length > 0, else return default image

        handleSearch: (e) => setSearchTerm(e.target.value),
        filteredVenues, // Used for the list
        userHasVenues: userProfile?.venues?.length > 0,
        userHasBookings: userProfile?.bookings?.length > 0,
        specificVenue,
        getSpecificVenue: async (id) =>
            fetchData(
                `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true&sort=desc`
            ),
        disabledDates: (current) => {
            if (!specificVenue || !specificVenue.bookings || specificVenue.bookings.length === 0) {
                return false;
            }
            const currentDate = current.toISOString().slice(0, 10);
            for (const booking of specificVenue.bookings) {
                if (booking && booking.dateFrom && booking.dateTo) {
                    const {dateFrom, dateTo} = booking;
                    if (currentDate >= dateFrom && currentDate <= dateTo) {
                        return true;
                    }
                }
            }
            return false;
        },
        userBookings,
        userVenues,
        updateBookings: setUserBookings,
        updateVenues: setUserVenues,
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            setLimit((prevLimit) => prevLimit + 9);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>;
};

export default VenuesProvider;