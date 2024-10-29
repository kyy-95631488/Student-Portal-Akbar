import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <div className="overlay">
                <div className="text-container">
                    <h2>Studi Independen Kampus Merdeka</h2>
                    <p>by RUANGGURU</p>
                    <Link to="/student" className="button">ALL STUDENT</Link> {/* Menggunakan Link */}
                </div>
            </div>
        </div>
    );
};

export default Home;
