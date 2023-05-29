import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyTab from './EmptyTab';
import VenueItem from './';
import { API_VENUES } from '../utilities/constants';
import { VenuesContext } from '../context/VenuesContext';
import useApiDelete from '../hooks/useApiDelete';

function YourVenuesList() {
    const { id } = useParams();
    const [successMessage, setSuccessMessage] = useState('');

    const { userVenues } = useContext(VenuesContext);

    const { isLoading, isError, deleteData } = useApiDelete(`${API_VENUES}/${id}`);

    const handleDelete = async () => {
        await deleteData();
        setSuccessMessage('Venue deleted successfully!');
    }

    return (
        <>
            {isError && <div>Something went wrong...</div>}
            {isLoading && <div>Loading...</div>}
            {successMessage && <div>{successMessage}</div>}
            <p>If you don't see your most recently created venue, please refresh the browser.</p>
            <div className="venues-list">
                {userVenues ? (
                    userVenues?.data?.map((venue) => (
                        <div>
                            {venue.venue && <VenueItem venue={venue.venue} />}
                        </div>
                    ))) : (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <EmptyTab/>
                    </div>)}
            </div>
        </>
    );
}

export default YourVenuesList;
