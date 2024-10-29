import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <h2>404 | Not Found</h2>
            <button onClick={() => navigate("/")}>Take Me Back</button>
        </div>
    );
};

export default NotFound;
