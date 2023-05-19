import React, {useContext} from 'react';
import {VenuesContext} from '../context/VenuesContext';
import VenueItem from './VenueItem';

export const VenuesList = () => {
    const { allVenues, filteredVenues, handleSearch } = useContext(VenuesContext);

    return (
        <>
            <div style={{width: "320px", paddingBottom: "40px"}}>
                <input type="text"
                       placeholder="Search Venues..."
                       onChange={handleSearch}
                       style={{width: "100%"}}
                />
            </div>

            {filteredVenues && filteredVenues.length > 0 && (
                <div className="venues-list">
                    {filteredVenues.map((venue) => (
                        <VenueItem key={venue.id} venue={venue}/>
                    ))}
                </div>
            )}

            {!filteredVenues || filteredVenues.length === 0 ? (
                <div className="venues-list">
                    {allVenues.map((venue) => (
                        <VenueItem key={venue.id} venue={venue}/>
                    ))}
                </div>
            ) : null}
        </>
    );
};