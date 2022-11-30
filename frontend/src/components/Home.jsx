import "../App.css";
import { useState } from "react";

const Home = () => {
  return (
    <div className="App">
      <nav className="navbar Navbar">
        <a className="has-text-white" href="/" style={{ position: "relative", left: "3rem" }}>
          LoremIpsum
        </a>

        <a className="adminLink" href="/admin_access" style={{ position: "relative", left: "35rem" }}>admin</a>
      </nav>

      <div className="card-content Message">
        <div className="content">
          <p className="has-text-white is-size-2">Trusted Health Information</p>
        </div>
        <div className="content">
          <a href="/appointment"><p className="has-text-white is-size-4">Request Appointment</p></a>
        </div>
      </div>
    </div>
  );
};

export default Home;