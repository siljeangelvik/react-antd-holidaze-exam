/*import {useState, useEffect} from 'react';

export const useOwnerHandler = (chosenVenue) => {
    const [media, setMedia] = useState('');

    useEffect(() => {
        if (chosenVenue?._owner && chosenVenue?.bookings.endsWith('.jpg' || '.png' || '.jpeg')) {
            setMedia(chosenVenue?.media[0]);
        } else if (chosenVenue?.media && chosenVenue?.media[0].endsWith('.mp4',)) {
            setMedia(chosenVenue?.media[0]);
        } else {
            setMedia('https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg');
        }
    }, [chosenVenue]);

    return media;
};*/