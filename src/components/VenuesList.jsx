import React, {useContext} from 'react';
import {VenuesContext} from '../context/VenuesContext';
import VenueItem from './VenueItem';
import {Typography} from 'antd';

export const VenuesList = () => {
    const {allVenues, handleSearch, filteredVenues} = useContext(VenuesContext);

    return (
        <>
            <Typography.Text level={5} style={{fontWeight: "bold"}}>
                {filteredVenues?.length === 0 && handleSearch?.length > 0 ? (
                    <Typography.Text level={5} style={{fontWeight: "bold"}}>
                        No venues found: {filteredVenues?.length}
                    </Typography.Text>
                ) : (
                    <Typography.Text level={5} style={{fontWeight: "bold"}}>
                        Venues found: {filteredVenues?.length}
                    </Typography.Text>
                )}
            </Typography.Text>

            <div style={{width: "320px", paddingBottom: "40px", paddingTop: "10px"}}>
                <input type="text"
                       placeholder="Search Venues..."
                       onChange={handleSearch}
                       style={{width: "100%"}}
                />
            </div>

            <Typography.Text level={5} style={{fontWeight: "bold"}}>
                Currently listing <em>({allVenues?.length})</em> venues
            </Typography.Text>

            {handleSearch && (
                <div className="venues-list">
                    {filteredVenues.map((venue) => (
                        <VenueItem key={venue.id} venue={venue}/>
                    ))}
                </div>
            )}
        </>
    );
};