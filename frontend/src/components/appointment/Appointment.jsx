import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    
    useEffect(() => {
        getDocs();
    }, []);

    const getDocs = async () => {
        const response = await axios.get("http://localhost:5000/appointment/doctors");
        setDoctors(response.data);
    }
    
    return (
        <div>
            <SearchBar data={doctors}/>
            <h1 className="has-text-black is-size-3" style={{marginTop: "14rem"}}>Or Choose a Specialization</h1>
            <nav className="breadcrumb" style={{marginLeft:"10rem"}}>
                <ul className="is-size-4 mx-auto">
                    <li><a href="#">Spec 1</a></li>
                    <li><a href="#">Spec 2</a></li>
                    <li><a href="#">Spec 3</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Appointment;