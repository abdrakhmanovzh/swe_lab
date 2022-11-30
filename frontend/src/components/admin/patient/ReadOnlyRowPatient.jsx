import React from "react";
import axios from "axios";
import edit from "../../../assets/edit.png";
import del from "../../../assets/delete.png";
import { useNavigate } from "react-router-dom";

const ReadOnlyRowPatient = ({ patient }) => {
    const history = useNavigate();

    const editPatient = async (id) => {
        history("/admin/patients/update/" + id);
    };

    const deletePatient = async (id) => {
        if (window.confirm("Are you sure that you want to delete that patient?")) {
            await axios.delete("http://localhost:5000/patients/" + id);
            history("/admin/patients");
        }
    }

    return (
        <div key={patient.id} style={{ fontSize: "14px", textAlign: "center", fontFamily: "sans-serif" }}>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{patient.full_name}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>
                {patient.birth_date}
            </p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{patient.iin}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>
                {patient.contact_number}
            </p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{patient.emer_contact_number}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{patient.blood_group}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{patient.marital_status}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{patient.address}</p>
            <p style={{ borderRight: "1px solid black", borderTop: "1px solid black" }}>{patient.password}</p>
            <p style={{ borderTop: "1px solid black" }}>
                <button
                    style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                    onClick={() => editPatient(patient.id)}
                >
                    <img src={edit} style={{ height: "16px", width: "16px" }} />
                </button>
                <button style={{ marginRight: "auto", marginLeft: "5px" }} onClick={() => deletePatient(patient.id)}>
                    <img src={del} style={{ height: "16px", width: "16px" }} />
                </button>
            </p>
        </div>
    );
};

export default ReadOnlyRowPatient;
