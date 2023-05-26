import {Typography} from 'antd';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import "./styles.css";
import {VenuesContext} from '../../context/VenuesContext';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import useToggle from '../../hooks/useToggle';

const SuccessBookings = () => {
    const {userProfile} = useContext(AuthenticationContext);
    const {specificVenue} = useContext(VenuesContext);
    const [toggle, setToggle] = useToggle(false);

    return (
        <div className="alert-success" handletoggle={toggle} style={{display: toggle && "none"}}>
            <div style={{minWidth: '340px', maxWidth: '340px', margin: '0 auto'}}>

                <Typography.Title level={2}>Successful booking for {specificVenue?.name}</Typography.Title>
                <p>
                    Thank you, {userProfile?.name}! <br />
                    Your booking has been confirmed. <br />
                    Thank you for choosing us. 🧡
                </p>

                <div style={{display:"flex", flexWrap:"nowrap", gap:"10px", width:"100%"}}>
                    <button onClick={setToggle} className="secondary-button" style={{width:"100px"}}>Cancel</button>
                    <Link to="/bookings" className="primary-button" style={{width:"200px"}}>View Your Bookings</Link>
                </div>

            </div>

        </div>
    );
};

export default SuccessBookings;
