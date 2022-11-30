import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      history("/admin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <nav className="navbar has-text-centered Navbar">
        <a className="has-text-white" href="/">
          LoremIpsum
        </a>
      </nav>
      <div className="card Register">
        <h2 className="is-size-3">Sign In</h2>
        <form onSubmit={Auth} className="box">
          <p className="has-text-centered ErrorMessage">{msg}</p>
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button is-small">
            Enter the system
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
