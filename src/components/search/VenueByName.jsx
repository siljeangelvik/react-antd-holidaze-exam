import { useState, useEffect, useContext } from 'react';
import { AutoComplete } from 'antd';
import { VenuesContext } from '../../context/VenuesContext';

const VenueByName = () => {
    const [options, setOptions] = useState([]);
    const { allVenues } = useContext(VenuesContext);

    useEffect(() => {
        const filteredLocations = allVenues.filter((venue) => {
            const { name, location } = venue;
            const { city, zip, country } = location;
            return (
                name !== '' &&
                name !== 'Unknown' &&
                city !== '' &&
                city !== 'Unknown' &&
                zip !== '' &&
                zip !== 'Unknown' &&
                country !== '' &&
                country !== 'Unknown'
            );
        });

        const formattedOptions = filteredLocations.map((venue) => ({
            value: `${venue.location.city}, ${venue.location.zip}, ${venue.location.country}`,
        }));
        setOptions(formattedOptions);
    }, [allVenues]);

    return (
        <AutoComplete
            style={{ width: 200 }}
            options={options}
            placeholder="Type in the venue's location"
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        />
    );
};

export default VenueByName;
