import React, {useContext} from "react";
import {Link} from "react-router-dom";
import useManagerStatus from '../../../hooks/useManagerStatus';
import Logout from '../../../components/notifications/Logout';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import useToggle from "../../../hooks/useToggle";
import "./styles.css";

const Navbar = () => {
    const [value, toggleValue] = useToggle(false);
    const {isAuthenticated, userData} = useContext(AuthenticationContext);

    const isManager = useManagerStatus();

    const handleNavbar = () => {
        toggleValue(!value);
    };

    const handleNavbarClose = () => {
        toggleValue(false);
    };

    return (
        <div className="navbar-container">
            <Link to="/"><span className="logo">HOLIDAZE</span></Link>

            <button className="navbar-button" onClick={handleNavbar}>
        <span className="navbar-button-emoji" aria-label="navbar-button-emoji" role="img">
          &#129409;
        </span>
            </button>

            <nav className="navbar-container-mobile" style={{display: value && "flex"}} onClick={handleNavbarClose}>
                <ul className="navbar-list-mobile" id="slide">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            {/* <li><Link to={`/profile/${localStorage.getItem("name")}`}>Profile</Link></li> */}
                            <li><Link to={`/profile/${userData?.name}`}>Profile</Link></li>

                            {/* <li><Link to={`/profile/${localStorage.getItem("name")}/bookings`}>Bookings</Link></li> */}
                            <li><Link to={`/bookings`}>Bookings</Link></li>
                            {isManager && <li><Link to={`/venues`}>Venues</Link></li>}
                            <li><Logout/></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>

        </div>
    );
};

export default Navbar;