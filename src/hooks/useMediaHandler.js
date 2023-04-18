import {useState, useEffect} from 'react';

export const useMediaHandler = (chosenVenue) => {
    const [media, setMedia] = useState('');

    useEffect(() => {
        if (chosenVenue?.media && chosenVenue?.media[0].endsWith('.jpg',)) {
            setMedia(chosenVenue?.media[0]);
        } else {
            setMedia('https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg');
        }
    }, [chosenVenue]);

    return media;
};