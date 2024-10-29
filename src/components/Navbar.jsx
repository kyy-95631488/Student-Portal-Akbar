import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <h1>Student Portal</h1>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰ {/* Hamburger menu icon */}
            </button>
            <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link to="/student" onClick={() => setIsMenuOpen(false)}>All Students</Link></li>
                <li><Link to="/add-student" onClick={() => setIsMenuOpen(false)}>Add Student</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
