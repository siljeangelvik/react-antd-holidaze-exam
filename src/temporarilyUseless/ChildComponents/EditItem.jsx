import { useState } from 'react';
import { InlineEdit } from './InlineEdit';

export const EditItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState('');
    const [price, setPrice] = useState('');
    const [maxGuests, setMaxGuests] = useState('');

    const [rating, setRating] = useState('');

    const [wifi, setWifi] = useState(false);
    const [parking, setParking] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [pets, setPets] = useState(false);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [continent, setContinent] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    return (
        <div>
            <h1>Edit Item</h1>
            <form>
                <InlineEdit label="Name" value={name} setValue={setName} />
                <InlineEdit label="Description" value={description} setValue={setDescription} />
                <InlineEdit label="Media" value={media} setValue={setMedia} />
                <InlineEdit label="Price" value={price} setValue={setPrice} />
                <InlineEdit label="Max Guests" value={maxGuests} setValue={setMaxGuests} />
                <InlineEdit label="Rating" value={rating} setValue={setRating} />

                <InlineEdit label="Wifi" value={wifi} setValue={setWifi} />
                <InlineEdit label="Parking" value={parking} setValue={setParking} />
                <InlineEdit label="Breakfast" value={breakfast} setValue={setBreakfast} />
                <InlineEdit label="Pets" value={pets} setValue={setPets} />

                <InlineEdit label="Address" value={address} setValue={setAddress} />
                <InlineEdit label="City" value={city} setValue={setCity} />
                <InlineEdit label="Zip" value={zip} setValue={setZip} />
                <InlineEdit label="Country" value={country} setValue={setCountry} />
                <InlineEdit label="Continent" value={continent} setValue={setContinent} />
                <InlineEdit label="Lat" value={lat} setValue={setLat} />
                <InlineEdit label="Lng" value={lng} setValue={setLng} />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default EditItem;
