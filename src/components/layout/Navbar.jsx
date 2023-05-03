import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useAuthentication from '../../hooks/useAuthentication';
import useToggle from "../../hooks/useToggle";
import "./styles.css";

const Navbar = () => {
    let [value, toggleValue] = useToggle(false);
    const isLoggedIn = useAuthentication();
    console.log(value);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // Update the screen size state on window resize
        const handleResize = () => setIsSmallScreen(window.innerWidth < 480);
        window.addEventListener("resize", handleResize);
        handleResize(); // Call on initial mount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log(isSmallScreen);

    const handleToggle = () => {
        const navbar = document.querySelector(".navbar-list-mobile");
        const parent = navbar.parentElement;

        if (isSmallScreen) {
            parent.classList.toggle("navbar-active");
            toggleValue(!value);
        } else {
            console.log("not small screen");
        }
    };


    return (
        <div className="navbar-container">
            <Link to="/"><span className="logo">HOLIDAZE</span></Link>


            <button className="navbar-button" onClick={handleToggle}>
                    <span className="navbar-button-emoji" aria-label="navbar-button-emoji" role="img">
                        &#129409;
                    </span>
            </button>

            <nav style={{display: value ? 'flex' : 'none'}}>
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
                            <Link to="/logout">Logout</Link>
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