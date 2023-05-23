import React, {createContext, useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
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
    const {userProfile} = useContext(AuthenticationContext);

    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [limit, setLimit] = useState(9);
    const [userBookings, setUserBookings] = useState([]);
    const [userVenues, setUserVenues] = useState([]);

    const specificVenue = venues.find((venue) => venue.id === id);

    const {data: getAllVenues} = useApiGet(`${API_VENUES}?_bookings=true&_venues=true&_owner=true&_limit=${limit}`);

    useEffect(() => {
        if (getAllVenues) {
            setVenues(getAllVenues);
        }
    }, [getAllVenues]);

    useEffect(() => {
        const filtered = venues.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.location.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVenues(filtered);
    }, [searchTerm, venues]);

    const updateBookings = (newBookings) => { // Update bookings array
        setUserBookings(newBookings);
    };

    const updateVenues = (newVenues) => { // Update venues array
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

    const value = {
        allVenues: venues.slice(0, limit), // Used for the list
        handleSearch: (e) => setSearchTerm(e.target.value),
        filteredVenues,
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
        updateBookings,
        updateVenues,
        toggleEditBookings,
    };

    return <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>;
};

export default VenuesProvider;