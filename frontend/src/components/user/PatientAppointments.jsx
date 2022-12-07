import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PatientAppointments = () => {
    const { iin } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [times, setTimes] = useState('');

    useEffect(() => {
        refreshToken();
        getAppointments();
        getTimes();
    }, [])

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

    const getAppointments = async () => {
        await axiosJWT.get(`http://localhost:5000/patients/appointments/${iin}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            setAppointments(res.data);
        })
    }

    const getTimes = async () => {
        if (!appointments) {
            setTimeout(1000);
        } else {
            if (appointments.first == true) {
                setTimes(times => [...times, "first"])
            }
            if (appointments.second == true) {
                setTimes(times => [...times, "second"])
            }
            if (appointments.third == true) {
                setTimes(times => [...times, "third"])
            }
            if (appointments.fourth == true) {
                setTimes(times => [...times, "fourth"])
            }
            if (appointments.fivth == true) {
                setTimes(times => [...times, "fivth"])
            }
            if (appointments.sixth == true) {
                setTimes(times => [...times, "sixth"])
            }
            if (appointments.seventh == true) {
                setTimes(times => [...times, "seventh"])
            }
            if (appointments.eighth == true) {
                setTimes(times => [...times, "eighth"])
            }
        }
    }


    return (
        <div className='card' style={{ minWidth: "fit-content", maxWidth: "35rem", margin: "auto", marginTop: "2rem" }}>
            <div className='card-content'>
                <div className='media'>
                    <div className='media-content'>
                        <p className='title is-5'>Appointments</p>
                    </div>
                </div>
                <div className='content' style={{ whiteSpace: "nowrap" }}>
                    {console.log(appointments)}
                    {times}
                </div>
            </div>
        </div>
    )
}

export default PatientAppointments