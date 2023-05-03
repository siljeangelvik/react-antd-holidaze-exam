import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useAuthentication from '../../hooks/useAuthentication';
import useToggle from "../../hooks/useToggle";
import "./styles.css";

const Navbar = () => {
    let [value, toggleValue] = useToggle(false);
    const isLoggedIn = useAuthentication();

    const [isSmallScreen, setIsSmallScreen] = useState(true);

    useEffect(() => {
        // Update the screen size state on window resize
        const handleResize = () => setIsSmallScreen(window.innerWidth < 480);
        window.addEventListener("resize", handleResize);

        const navbar = document.querySelector(".navbar-list-mobile");
        const parent = navbar.parentElement;
        parent.classList.toggle("navbar-active");
        toggleValue(!value);

        if (window.innerWidth >= 480) {
            const navbar = document.querySelector(".navbar-list-mobile");
            navbar.parentElement.style.display = toggleValue(true);
        }
        handleResize(); // Call on initial mount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggle = () => {
        const navbar = document.querySelector(".navbar-list-mobile");
        const parent = navbar.parentElement;
        parent.classList.toggle("navbar-active");
        toggleValue(!value);
        console.log(isSmallScreen, "isSmallScreen");
        console.log(value, "value");
        console.log(parent, "parent");
        console.log(setIsSmallScreen(window.innerWidth < 480), "setIsSmallScreen");
        /*
        if (!isSmallScreen) {
            parent.classList.add("navbar-active")
            && parent.style.display === "flex"
                ? parent.style.display = "none"
                : parent.style.display = "flex";
            console.log(isSmallScreen);
        }
        */
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