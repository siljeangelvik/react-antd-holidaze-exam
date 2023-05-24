import {Carousel, Image} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import useCheckMediaProperty from '../../hooks/useCheckMediaProperty';
import {VenuesContext} from '../../context/VenuesContext';
import {formatCurrency} from '../../utilities/formatCurrency';

const Header = () => {
    const {specificVenue} = useContext(VenuesContext);

    const media = specificVenue?.media;

    const mediaType = useCheckMediaProperty(media);

    return (
        <>
            {/* title, price, image, created, updated */}
            <div>
                <Title level={1}>{specificVenue?.name}</Title>
                <Title level={4}>{formatCurrency(specificVenue?.price)} / night</Title>
                {media ? (
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
                                    alt={specificVenue?.name}
                                    width="100%"
                                    height="213px"
                                    loading="lazy"
                                    aria-label={specificVenue?.name}
                                />
                            );
                        })}
                    </Carousel>
                ) : (
                    <Image
                        src={mediaType}
                        alt={specificVenue?.name}
                        width="100%"
                        height="213px"
                        loading="lazy"
                        aria-label={specificVenue?.name}
                    />
                )}

                {/*
                                <Image src={specificVenue?.media ? specificVenue?.media : "https://via.placeholder.com/150"} alt={specificVenue?.name} style={{maxWidth:"640px"}}/>
                */}
                <div style={{display: "flex", gap: "40px", fontSize: "12px"}}>
                    <p><strong>Created:</strong><em
                        style={{display: "block"}}>{new Date(specificVenue?.created).toDateString()}</em></p>
                    <p><strong>Last Updated:</strong><em
                        style={{display: "block"}}>{new Date(specificVenue?.updated).toDateString()}</em></p>
                </div>
            </div>
        </>
    );
};

export default Header;
