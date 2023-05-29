import {Carousel, Image} from 'antd';
import React, {useEffect, useState} from 'react';

export function ItemMedia({media, name}) {
    const [mediaData, setMediaData] = useState([] || '');

    useEffect(() => {
        if (media && media.length > 0) {
            setMediaData(media);
        } else {
            setMediaData("https://cdn.pixabay.com/photo/2016/10/22/18/52/beach-1761410_1280.jpg");
        }
    }, [media]);

    return (
        <>
            {mediaData ? (
                <Carousel
                    autoplay
                    autoplaySpeed={3000}
                    pauseOnHover={true}
                    style={{
                        height: '213px',
                        overflow: 'hidden',
                        borderRadius: '5px',
                    }}
                >
                    {media.map((media, index) => {
                        return (
                            <Image
                                key={index}
                                src={media}
                                alt={name}
                                width="100%"
                                height="213px"
                                loading="lazy"
                                aria-label={name}/>);
                    })}
                </Carousel>
            ) : (
                <Image
                    src={media}
                    alt={name}
                    width="100%"
                    height="213px"
                    loading="lazy"
                    aria-label={name}
                />
            )}

        </>
    )
}
