import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReadOnlyRow from "./ReadOnlyRow";
import "../../App.css";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);

      if (decoded.role !== "admin") {
        history("/admin_role");
      }
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history("/noauth");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/logout");
      history("/");
    } catch (error) {
      console.log(err);
    }
  }

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1 className="is-size-3 AdminText">Welcome Back Admin</h1>
      <form className="mb-3">
        <div className="TableWrapper">
          <div className="TableHead">
            <p style={{ textAlign: "center", borderRight: "1px solid black" }}>Name</p>
            <p style={{ textAlign: "center", borderRight: "1px solid black" }}>Password</p>
            <p style={{ textAlign: "center" }}>Role</p>
          </div>
          <div className="TableBody">
            {users.map((user, index) => (
              <>{<ReadOnlyRow user={user} index={index} />}</>
            ))}
          </div>
        </div>
      </form>
      <a className="ml-5" href="/admin/doctors">
        Edit Doctors
      </a>
      <a className="ml-6" href="/admin/patients">
        Edit Patients
      </a>
      <button className="mt-1" style={{ float: "right" }} type="button" onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminHome;
