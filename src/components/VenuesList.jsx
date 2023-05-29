import React, {useContext} from 'react';
import {VenuesContext} from '../context/VenuesContext';
import VenueItem from './VenueItem';
import {Typography} from 'antd';

export const VenuesList = () => {
    const {allVenues, handleSearch, filteredVenues} = useContext(VenuesContext);

    const results = filteredVenues?.length > 1 && filteredVenues?.length < 99;
    const displayResults = results
        ? `Found ${filteredVenues?.length} venues matching your results`
        : "Found 0 venues matching your results";

    return (
        <>
            <p><em> Currently displaying <strong>({allVenues?.length})</strong> venues</em></p>
            <Typography.Text level={2} style={{fontWeight: "bold"}}>
                Search Results: <br/> {displayResults}
            </Typography.Text>
            <div style={{width: "320px", paddingBottom: "40px", paddingTop: "10px"}}>
                <input type="text"
                       placeholder="Search Venues..."
                       onChange={handleSearch}
                       style={{width: "100%"}}/>
            </div>
            {handleSearch ?
                (<div className="venues-list">
                        {filteredVenues.map((venue) => (
                            <VenueItem key={venue.id} venue={venue}/>
                        ))}
                    </div>
                ) : (<div className="venues-list">
                        {allVenues.map((venue) => (
                            <VenueItem key={venue.id} venue={venue}/>
                        ))}
                    </div>
                )}
        </>
    );
};