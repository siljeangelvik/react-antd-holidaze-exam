import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyTab from './EmptyTab';
import VenueItem from './VenueItem';
import { API_VENUES } from '../utilities/constants';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { VenuesContext } from '../context/VenuesContext';
import useApiDelete from '../hooks/useApiDelete';
import { Button, Popconfirm } from 'antd';

function YourVenuesList() {
    const { id } = useParams();
    const [successMessage, setSuccessMessage] = useState('');

    const { userVenues } = useContext(VenuesContext);
    const { isAuthenticated } = useContext(AuthenticationContext);

    const { isLoading, isError, deleteData } = useApiDelete(`${API_VENUES}/${id}`);

    const confirmDelete = (venue) => (
        <Popconfirm
            title="Delete the venue"
            description="Are you sure to delete this venue?"
            okText="Yes"
            cancelText="No"
        >
            <Button danger onClick={() => handleDelete(venue)}>Delete</Button>
        </Popconfirm>
    );

    const handleDelete = (venue) => {
        isAuthenticated && userVenues && deleteData(venue, userVenues);
        setSuccessMessage('Venue deleted successfully.');
    };

    const handleEdit = (venueId) => {
        console.log('edit', venueId);
    };

    const handleCancelEdit = () => {
        console.log('cancel edit');
    };

    const handleSaveEdit = (updatedVenue) => {
        console.log('save edit', updatedVenue);
    };

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
