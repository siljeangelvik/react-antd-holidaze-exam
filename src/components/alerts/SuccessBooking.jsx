import {Typography} from 'antd';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import "./styles.css";
import {formatCurrency} from '../../utilities/formatCurrency';
import {VenuesContext} from '../../context/VenuesContext';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import useToggle from '../../hooks/useToggle';

const SuccessBookings = () => {
    const {userProfile} = useContext(AuthenticationContext);
    const {specificVenue} = useContext(VenuesContext);
    const [toggle, setToggle] = useToggle(false);

    const displayModal = toggle ? "none" : "block";

    return (
        <div className="alert-success" handletoggle={displayModal} style={{display: toggle && displayModal}}>
            <div style={{minWidth: '300px', maxWidth: '480px', margin: '0 auto', padding: "20px"}}>
                <Typography.Title level={3}>Thank you, {userProfile?.name}! </Typography.Title>
                <Typography.Title level={4}>Successful booking</Typography.Title>
                <p>
                    You successfully booked the venue <strong>{specificVenue?.name}</strong> for <strong>{formatCurrency(specificVenue?.price)}</strong>  /night.
                    <br/>
                    Thank you for choosing us. 🧡
                </p>
                <div style={{display: "flex", flexWrap: "nowrap", gap: "10px", width: "100%"}}>
                    <button onClick={setToggle} className="secondary-button" style={{width: "100px", height: "37px"}}>Cancel
                    </button>
                    <Link to="/bookings" className="primary-button" style={{width: "200px", height: "37px"}}>View
                        Your Bookings</Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessBookings;
