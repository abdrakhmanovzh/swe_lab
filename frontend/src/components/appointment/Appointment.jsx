import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const history = useNavigate();

    useEffect(() => {
        getDocs();
    }, []);

    const getDocs = async () => {
        const response = await axios.get("http://localhost:5000/appointment/doctors");
        setDoctors(response.data);
    }

    return (
        <div>
            <SearchBar data={doctors} />
            <h1 className="has-text-black is-size-3" style={{ marginTop: "14rem" }}>Or Choose a Specialization</h1>
            <nav className="breadcrumb mt-3" style={{ marginLeft: "10rem" }}>
                <ul className="is-size-4 mx-auto">
                    <li><a href="/appointment/spec/1">Spec 1</a></li>
                    <li><a href="/appointment/spec/2">Spec 2</a></li>
                    <li><a href="/appointment/spec/3">Spec 3</a></li>
                </ul>
            </nav>

            <a href="/" className="button is-info mr-6" style={{ float: "right" }}>Back to Home</a>
        </div>
    );
}

export default Appointment;