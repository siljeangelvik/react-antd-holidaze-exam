import React, {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import {API_VENUES} from '../utilities/constants';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {VenuesContext} from '../context/VenuesContext';
import useApiDelete from '../hooks/useApiDelete';
import VenueItem from './VenueItem';
import EmptyTab from './profile/EmptyTab';

function YourVenuesList() {
    const {id} = useParams();
    const [successMessage, setSuccessMessage] = useState('');

    const {userVenues} = useContext(VenuesContext);
    const {isAuthenticated} = useContext(AuthenticationContext);

    const {isLoading, isError, deleteData} = useApiDelete(`${API_VENUES}/${id}`);

    const handleDelete = (venue) => {
        isAuthenticated && userVenues && deleteData(venue, userVenues);
        setSuccessMessage('Venue deleted successfully.');
    };

    const handleEdit = () => {
        console.log('edit');
    };

    return (
        <>
            {isError && <div>Something went wrong...</div>}
            {isLoading && <div>Loading...</div>}
            {successMessage && <div>{successMessage}</div>}
            <div className="venues-list">
                {userVenues.length > 0 ? (
                    userVenues.map((venue) => (
                            <VenueItem key={venue.id}
                                       venue={venue}
                                       showDeleteButton={true}
                                       showEditButton={true}
                                       onDelete={handleDelete}
                                       onEdit={handleEdit}
                            />
                        )
                    )
                ) : (
                    <EmptyTab
                        title="Your Venues"
                        text="You haven't added any venues yet."
                        link="/add-venue"
                        linkText="Add a venue"
                    />
                )}
            </div>
        </>
    );
}

export default YourVenuesList;