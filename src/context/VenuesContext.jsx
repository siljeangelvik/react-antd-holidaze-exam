import React, {createContext, useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {API_PROFILE, API_VENUES} from '../utilities/constants';
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
    const {id} = useParams();

    const {userData, isAuthenticated} = useContext(AuthenticationContext);


    const [venues, setVenues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [limit, setLimit] = useState(9);

    const specificVenue = venues?.find(venue => venue.id === id);


   // const getSpecificVenue = async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true&sort=desc`);


    const [userBookings, setUserBookings] = useState([]);
    const [userVenues, setUserVenues] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            const data = await fetchData(`${API_VENUES}?_sort=name&_sortOrder=desc&_limit=${limit}&_bookings=true&_owner=true`);
            setVenues(data);
        };

        fetchVenues().catch((error) => {
            console.log(error);
        });
    }, [limit]);


    useEffect(() => {
        const filtered = venues.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVenues(filtered);
    }, [searchTerm, venues]);


    const updateBookings = (newBookings) => {
        setUserBookings(newBookings);
    };

    useEffect(() => {
        const fetchUserVenues = async () => {
            const profileVenues = await fetchData(`${API_PROFILE}/venues`);
            setUserVenues(profileVenues);
        };

        const fetchUserBookings = async () => {
            const profileBookings = await fetchData(`${API_PROFILE}/bookings`);
            setUserBookings(profileBookings);
        };

        if (isAuthenticated) {
            fetchUserVenues().catch((error) => {
                console.log(error);
            });
            fetchUserBookings().catch((error) => {
                console.log(error);
            });
        }
    }, [isAuthenticated]);




    const value = {
        allVenues: venues?.slice(0, limit),
        handleSearch: (e) => setSearchTerm(e.target.value),
        filteredVenues,
        userHasVenues: userData?.venues?.length > 0,
        userHasBookings: userData?.bookings?.length > 0,
        specificVenue: venues?.find((venue) => venue.id === id),
        getSpecificVenue: async (id) => fetchData(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true&sort=desc`),
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