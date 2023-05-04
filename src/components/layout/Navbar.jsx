import React from "react";
import {Link} from "react-router-dom";
import useAuthentication from '../../hooks/useAuthentication';
import useToggle from "../../hooks/useToggle";
import "./styles.css";

const Navbar = () => {
    const [value, toggleValue] = useToggle(false);
    const isLoggedIn = useAuthentication();

    const navbar = document.querySelector('.navbar-list-mobile');
   // const button = document.querySelector('.navbar-button, .navbar-button-emoji')

    const handleNavbar = () => {
        toggleValue(!value);
        navbar.classList.toggle('is-active');
    };

//    button.addEventListener('click', _ => (button) = navbar.classList.toggle('is-active'))


    return (
        <div className="navbar-container">
            <Link to="/"><span className="logo">HOLIDAZE</span></Link>

            <button className="navbar-button" onClick={handleNavbar}>
        <span className="navbar-button-emoji" aria-label="navbar-button-emoji" role="img">
          &#129409;
        </span>
            </button>

            <nav className="navbar-container-mobile" style={{display: value && "flex"}}>
                <ul className="navbar-list-mobile"  id="slide">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/details">Details</Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/bookings">Bookings</Link></li>
                            <li><Link to="/venues">Venues</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </>
                    )}
                    {!isLoggedIn && (
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
