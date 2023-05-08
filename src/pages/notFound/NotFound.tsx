import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
function NotFound() {
  return (
    <div className="not-found-background">
      <div className="not-found-container">
        <h1>404</h1>
        <h3>page not found</h3>
        <p>
          Seems you have wondered into the unknown, please click the button
          below to go back
        </p>
        <p>Thank you</p>
        <Link to={"/"}>
          <button className="not-found-button">Go back</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
