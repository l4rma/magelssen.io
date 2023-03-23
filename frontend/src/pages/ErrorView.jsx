import React from "react";
import { Link } from "react-router-dom";

export default function ErrorView({ error }) {
  if (error.status === 401) {
    return (
      <div className="pageContainer">
        <div id="errorMsg">
          Error: {error.status} {error.statusText}
        </div>
        You are not logged in
        <div className="backBtn">
        <Link to={"/"}>Back</Link>
      </div>
      </div>
    );
  }

  if (error === 404) {
    return (
      <div className="pageContainer">
        <h1>404 - Not Found</h1>
        <p>No such page..</p>
        <div className="backBtn">
          <Link to={"/"}>Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      <div>Something went wrong: {error.toString()}</div>
      <div className="backBtn">
        <Link to={"/"}>Back</Link>
      </div>
    </div>
    
  );
}
