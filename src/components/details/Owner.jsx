import {Image} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

const Owner = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* Owner "Section" */}
            <Title level={3}>Owner of Venue</Title>

            <div style={{display: "flex", gap: "10px"}}>
                {specificVenue?.owner.avatar
                    ? <Image src={specificVenue?.owner.avatar} alt={specificVenue?.owner.name}
                             style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
                    : null
                }

                <div style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "baseline"}}>
                                <span>
                                    <strong>Host: </strong>
                                    {specificVenue?.owner.name ? specificVenue?.owner.name : "N/A"}
                                </span>

                    <span>
                                    <strong>Contact: </strong>
                        {specificVenue?.owner.email ? specificVenue?.owner.email : "N/A"}
                                </span>
                </div>
            </div>
        </>
    );
};

export default Owner;
