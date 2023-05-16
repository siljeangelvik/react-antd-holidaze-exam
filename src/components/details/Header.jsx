import {Image} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';
import {formatCurrency} from '../../utilities/formatCurrency';

const Header = () => {
    const {specificVenue} = useContext(VenuesContext);

    return (
        <>
            {/* title, price, image, created, updated */}
            <div>
                <Title level={1}>{specificVenue?.name}</Title>
                <Title level={4}>{formatCurrency(specificVenue?.price)} / night</Title>
                <Image src={specificVenue?.media ? specificVenue?.media : "https://via.placeholder.com/150"} alt={specificVenue?.name} style={{maxWidth:"640px"}}/>
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
