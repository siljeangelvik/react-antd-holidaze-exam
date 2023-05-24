import { useState, useEffect, useContext } from 'react';
import { AutoComplete } from 'antd';
import { VenuesContext } from '../../context/VenuesContext';

const LocationSearch = () => {
    const [cityOptions, setCityOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const { allVenues } = useContext(VenuesContext);

    useEffect(() => {
        const locations = allVenues.map((venue) => venue.location);

        const filteredCityLocations = locations.filter(
            (location) => location.city !== 'Unknown'
        );
        const formattedCityOptions = filteredCityLocations.map((location) => ({
            value: location.city,
        }));
        setCityOptions(formattedCityOptions);

        const filteredCountryLocations = locations.filter(
            (location) => location.country !== 'Unknown'
        );
        const formattedCountryOptions = filteredCountryLocations.map(
            (location) => ({
                value: location.country,
            })
        );
        setCountryOptions(formattedCountryOptions);
    }, [allVenues]);

    return (
        <div>
            <AutoComplete
                style={{ width: 200 }}
                options={cityOptions}
                placeholder="Type in the city"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            <AutoComplete
                style={{ width: 200 }}
                options={countryOptions}
                placeholder="Type in the country"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
        </div>
    );
};

export default LocationSearch;
