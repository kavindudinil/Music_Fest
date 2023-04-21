import React from "react";
import "../StyleSheets/Navbar.scss";
import {Link} from "react-router-dom";

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
    return (
        <nav className="navigation-bar">
            <div className="logo">
                <img src={require("../Assets/imgs/festiv-low-resolution-logo-white-on-transparent-background.png")} />
            </div>
            <ul>
                <li>
                    <Link to="/OrganizerLogin">
                        Attendee Login
                    </Link>
                </li>
                <li>
                    <Link to="/loginAdmin">
                        Administrator Login
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        Organizer Login
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
