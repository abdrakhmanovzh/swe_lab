import "../App.css";
import { useState } from "react";

const Home = () => {
  return (
    <div className="App">
      <nav className="navbar Navbar">
        <a className="has-text-white" href="/" style={{ position: "absolute", left: "43%" }}>
          LoremIpsum
        </a>

        <div className="navbar-end">
          <a className="adminLink" href="/admin_access">admin</a>
        </div>
      </nav>

      <div className="card-content Message">
        <div className="content">
          <p className="has-text-white is-size-2">Trusted Health Information</p>
        </div>
        <div className="content">
          <p className="has-text-white is-size-4">Lorem Ipsum Dolor</p>
        </div>
      </div>

      <div className="card-content LoginButtons">
        <a href="/doctors/login">
          <div className="content">
            <p className="has-text-white is-size-5">Login as Doctor</p>
          </div>
        </a>

        <a href="/patients/login">
          <div className="content">
            <p className="has-text-white is-size-5">Login as Patient</p>
          </div>
        </a>

        <a href="/appointment">
          <div className="content">
            <p className="has-text-white is-size-5">Request Appointment</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;