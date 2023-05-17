import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";

const ERROR_STATUS_TEXT = "404";
const TITLE_TEXT = "page not found";
const SUBTITLE_TEXT =
  "Seems you have wondered into the unknown, please click the button below to go back ";
const END_TEXT = "Thank you ";

function NotFound() {
  return (
    <div className="not-found-background">
      <div className="not-found-container">
        <h1>{ERROR_STATUS_TEXT}</h1>
        <h3>{TITLE_TEXT}</h3>
        <p>{SUBTITLE_TEXT}</p>
        <p>{END_TEXT}</p>
        <Link to={"/"}>
          <button className="not-found-button">Go back</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
