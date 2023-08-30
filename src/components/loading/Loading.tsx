import React from 'react';
import './loading.css';

const LOADING_TEXT = 'Loading';

function Loading() {
  return (
    <div className="loader-container">
      <h1 className="loader-text">{LOADING_TEXT}</h1>
      <span className="loader">
        <span className="loader-ball"></span>
        <span className="loader-ball"></span>
        <span className="loader-ball"></span>
      </span>
    </div>
  );
}

export default Loading;
