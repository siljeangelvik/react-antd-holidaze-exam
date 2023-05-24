import {useEffect, useState} from 'react';

function useCheckMediaProperty(media) {
    const [mediaData, setMediaData] = useState([]);

    const placeholderUrl = 'https://cdn.pixabay.com/photo/2016/10/22/18/52/beach-1761410_1280.jpg';

    useEffect(() => {
        if (media && media.length > 0) {
            setMediaData(media);
        } else {
            setMediaData([placeholderUrl]);
        }
    }, [media]);

    return mediaData;
}

export default useCheckMediaProperty;
