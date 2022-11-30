import React from "react";
import axios from "axios";
import edit from "../../../assets/edit.png";
import del from "../../../assets/delete.png";
import { useNavigate } from "react-router-dom";

const ReadOnlyRowDoctor = ({ doctor }) => {
    const history = useNavigate();

    const editDoctor = async (id) => {
        history("/admin/doctors/update/" + id);
    };

    const deleteDoctor = async (id) => {
        if (window.confirm("Are you sure that you want to delete that doctor?")) {
            await axios.delete("http://localhost:5000/doctors/" + id);
            history("/admin/doctors");
        }
    }

    return (
        <div key={doctor.id} style={{ fontSize: "14px", textAlign: "center", fontFamily: "sans-serif" }}>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.full_name}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>
                {doctor.birth_date}
            </p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.iin}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>
                {doctor.contact_number}
            </p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.dep_id}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.spec_id}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.exp}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}><a href={doctor.img}>Open</a></p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.category}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.price}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.degree}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.rating}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.address}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{doctor.password}</p>
            <p style={{ borderTop: "1px solid black" }}>
                <button
                    style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                    onClick={() => editDoctor(doctor.id)}
                >
                    <img src={edit} style={{ height: "16px", width: "16px" }} />
                </button>
                <button style={{ marginRight: "auto", marginLeft: "5px" }} onClick={() => deleteDoctor(doctor.id)}>
                    <img src={del} style={{ height: "16px", width: "16px" }} />
                </button>
            </p>
        </div>
    );
};

export default ReadOnlyRowDoctor;
