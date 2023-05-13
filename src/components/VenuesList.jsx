import { useContext } from 'react';
import { VenuesContext } from '../context/VenuesContext';
import VenueItem from './VenueItem';

export const VenuesList = () => {
    const { allVenues } = useContext(VenuesContext);


    return (
        <>
            <h2>Should be a searchbar</h2>
            <div className="venues-list">
                {allVenues?.map((venue) => (
                    <VenueItem key={venue.id} venue={venue} />
                ))}
            </div>
        </>
    );
};