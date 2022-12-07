import React from 'react'
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Schedule from './Schedule';

const PatientHome = () => {
    const { iin } = useParams();
    const [patient, setPatient] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useNavigate();

    useEffect(() => {
        refreshToken();
        getPatient();
        getAppointments();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
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

    const getPatient = async () => {
        const response = await axiosJWT.get(`http://localhost:5000/patients/info/${iin}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        setPatient(response.data);
    }

    return (
        <div>
            <div className='card' style={{ minWidth: "fit-content", maxWidth: "35rem", margin: "auto" }}>
                <div className='card-content'>
                    <div className='media'>
                        <div className='media-content'>
                            <p className='title is-4'>{patient.full_name}</p>
                        </div>
                    </div>
                    <div className='content' style={{ whiteSpace: "nowrap" }}>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Birth Date<p style={{ fontWeight: "400", float: "right" }}>{patient.birth_date}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> IIN<p style={{ fontWeight: "400", float: "right" }}>{patient.iin}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Contact Number <p style={{ fontWeight: "400", float: "right" }}>{patient.contact_number}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Emergency Contact Number <p style={{ fontWeight: "400", float: "right" }}>{patient.contact_number}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Blood Group <p style={{ fontWeight: "400", float: "right" }}>{patient.blood_group}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Marital Status<p style={{ fontWeight: "400", float: "right" }}>{patient.marital_status}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Address <p style={{ fontWeight: "400", float: "right" }}>{patient.address}</p></div>
                    </div>
                </div>
            </div>
            <div className='card' style={{ minWidth: "fit-content", maxWidth: "35rem", margin: "auto", marginTop: "2rem" }}>
                <div className='card-content'>
                    <div className='media'>
                        <div className='media-content'>
                            <p className='title is-5'>Appointments</p>
                        </div>
                    </div>
                    <div className='content' style={{ whiteSpace: "nowrap" }}>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}>Doctor<p style={{ fontWeight: "400", float: "right" }}>{appointments.doc_id}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientHome