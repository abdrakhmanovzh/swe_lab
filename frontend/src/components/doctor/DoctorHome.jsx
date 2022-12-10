import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const DoctorHome = () => {

    const history = useNavigate();


    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.delete("http://localhost:5000/logout");
            history("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className='is-size-3'>DoctorHome</h1>
            <button className="button mx-auto" type="button" style={{ marginTop: "7rem" }} onClick={logout}>Logout</button>
        </div>
    )
}

export default DoctorHome