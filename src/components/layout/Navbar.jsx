import React from "react";
import {Link} from "react-router-dom";
import HandleLogout from '../../utilities/HandleLogout';
import useAuthentication from '../../hooks/useAuthentication';
import useToggle from "../../hooks/useToggle";
import "./styles.css";

const Navbar = () => {
    const isLoggedIn = useAuthentication();

    let [value, toggleValue] = useToggle(false);

    const handleToggle = () => {
        toggleValue(!value);
    };

    return (
        <div className="navbar-container">
            <Link to="/"><span className="logo">HOLIDAZE</span></Link>

            <button className="navbar-button" onClick={handleToggle}>
                    <span className="navbar-button-emoji" aria-label="navbar-button-emoji" role="img">
                        &#129409;
                    </span>
            </button>

            <nav style={{display: value}}>
                <ul className="navbar-list-mobile">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/details">Details</Link>
                    </li>

                    {isLoggedIn &&
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    }

                    {isLoggedIn &&
                        <li>
                            <Link to="/bookings">Bookings</Link>
                        </li>
                    }

                    {isLoggedIn &&
                        <li>
                            <Link to="/venues">Venues</Link>
                        </li>
                    }

                    {isLoggedIn &&
                        <li>
                            <HandleLogout/>
                        </li>
                    }
                    {!isLoggedIn &&
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    }

                    {!isLoggedIn &&
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;