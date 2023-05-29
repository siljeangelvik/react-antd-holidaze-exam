import React, {createContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useApiGet from '../hooks/useApiGet';
import {API_PROFILE, API_VENUES} from '../utilities/constants';

export const VenuesContext = createContext();

export const VenuesProvider = ({children}) => {
    const {id} = useParams();

    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [limit, setLimit] = useState(9);
    const [userBookings, setUserBookings] = useState([]);
    const [userVenues, setUserVenues] = useState([]);

    // GET ALL VENUES / ALL USER VENUES / ALL USER BOOKINGS
    const {data: getAllVenues} = useApiGet(`${API_VENUES}?_bookings=true&_venues=true&_owner=true&_limit=${limit}`);
    const {data: getAllUserVenues} = useApiGet(`${API_PROFILE}/venues`);
    const {data: getAllUserBookings} = useApiGet(`${API_PROFILE}/bookings`);
    const {data: getSpecificVenue} = useApiGet(`${API_VENUES}/${id}?_bookings=true&_owner=true&_venue=true`);

    const specificVenue = venues.find((venue) => venue.id === id);


    // UPDATE USER-BOOKINGS AFTER BOOKING
    const updateBookings = (booking) => {
        setUserBookings((prevBookings) => [...prevBookings, booking]);
    };

    // GET ALL VENUES
    useEffect(() => {
        if (getAllVenues) {
            setVenues(getAllVenues);
        }
    }, [getAllVenues]);

    // GET ALL VENUES BY USER
    useEffect(() => {
        if (getAllUserVenues) {
            setUserVenues(getAllUserVenues);
        }
    }, [getAllUserVenues]);

    // GET ALL BOOKINGS BY USER
    useEffect(() => {
        if (getAllUserBookings) {
            setUserBookings(getAllUserBookings);
        }
    }, [getAllUserBookings]);

    // ADD VENUE
    const addVenue = () => {
        setUserVenues((prevVenues) => [...prevVenues, userVenues]);
    };

    useEffect(() => {
        const filtered = venues.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.location.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVenues(filtered);
    }, [searchTerm, venues]);
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
        allVenues: venues.slice(0, limit), // Slice the venues array to show only the first 9 venues
        specificVenue, // Specific venue
        handleSearch: (e) => setSearchTerm(e.target.value), // Handle search input
        filteredVenues, // Filtered venues array
        userHasVenues: userVenues?.length > 0, // Check if user has venues
        userHasBookings: userBookings?.length > 0, // Check if user has bookings
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
        addVenue, // Add venue
        userBookings, // User bookings array
        userVenues, // User venues array
        getSpecificVenue,
        updateBookings
    };

    return <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>;
};

export default VenuesProvider;