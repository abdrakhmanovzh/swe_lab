import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { useEffect, useState } from 'react';

function AppointmentDoctor() {
    const { id } = useParams()
    const [doc, setdoc] = useState([]);
    const history = useNavigate();

    const [fullName, setFullName] = useState('');
    const [iin, setIin] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [blood, setblood] = useState('');
    const [marital, setmarital] = useState('');
    const [address, setaddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emerContactNumber, setEmerContactNumber] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [slots, setslots] = useState([]);

    const [sched, setSched] = useState([]);

    let options = [
        {
            value: "first",
            label: "09:00am - 10:00am",
        },
        {
            value: "second",
            label: "10:00am - 11:00am",
        },
        {
            value: "third",
            label: "11:00am - 12:00am",
        },
        {
            value: "fourth",
            label: "12:00pm - 01:00pm",
        },
        {
            value: "fivth",
            label: "01:00pm - 02:00pm",
        },
        {
            value: "sixth",
            label: "02:00pm - 03:00pm",
        },
        {
            value: "seventh",
            label: "03:00pm - 04:00pm",
        },
        {
            value: "eighth",
            label: "04:00pm - 05:00pm",
        },
    ];

    useEffect(() => {
        getDoc();
    }, []);

    useEffect(() => {
        getSched();
    }, [doc]);

    const getDoc = async () => {
        await axios.get(`http://localhost:5000/appointment/doctors/${id}`).then(result => {
            setdoc(result.data);
        })
    }

    const getSched = async () => {
        await axios.get(`http://localhost:5000/appointment/doctors/schedule/${id}`)
            .then(result => {
                setSched(result.data)
                console.log(sched);
                if (sched.first == true) {
                    options.splice(0, 1);
                }
                if (sched.second == true) {
                    options.splice(1, 1);
                }
                if (sched.third == true) {
                    options.splice(2, 1);
                }
                if (sched.fourth == true) {
                    options.splice(3, 1);
                }
                if (sched.fivth == true) {
                    options.splice(4, 1);
                }
                if (sched.sixth == true) {
                    options.splice(5, 1);
                }
                if (sched.seventh == true) {
                    options.splice(6, 1);
                }
                if (sched.eighth == true) {
                    options.splice(7, 1);
                }
                setslots(options);

                console.log(options);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/appointment/doctors/${id}`, {
            id,
            iin,
            birthDate,
            blood,
            marital,
            address,
            timeSlot,
            fullName,
            contactNumber,
            emerContactNumber,
        }).then(history('/appointment'))

    };

    return (
        <div>
            <div className='card' style={{ minWidth: "fit-content", maxWidth: "35rem", margin: "auto" }}>
                <div className='card-image'>
                    <figure className='image is-128x128' style={{ margin: "auto", marginTop: "1rem" }}>
                        <img src={doc.img} alt='Placeholder image' />
                    </figure>
                </div>
                <div className='card-content'>
                    <div className='media'>
                        <div className='media-content'>
                            <p className='title is-4'>{doc.full_name}</p>
                        </div>
                    </div>
                    <div className='content' style={{ whiteSpace: "nowrap" }}>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Price per appointment <p style={{ fontWeight: "400", float: "right" }}>{doc.price}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Specialization <p style={{ fontWeight: "400", float: "right" }}> {doc.spec_id}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Rating <p style={{ fontWeight: "400", float: "right" }}>{doc.rating}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Degree <p style={{ fontWeight: "400", float: "right" }}>{doc.degree}</p></div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}> Category <p style={{ fontWeight: "400", float: "right" }}>{doc.category}</p></div>
                    </div>
                </div>
            </div>
            <div className='appointmentForm' style={{ width: "fit-content", margin: "auto", marginTop: "3rem" }}>
                <div className='field'>
                    <label className='label'>Full Name</label>
                    <div className='control'>
                        <input className='input' name="full_name" value={fullName} type='text' placeholder="Name" onChange={(e) => setFullName(e.target.value)} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>IIN</label>
                    <div className='control'>
                        <input className='input' name="iin" value={iin} type='text' placeholder="Iin" onChange={(e) => setIin(e.target.value)} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Birth Date</label>
                    <div className='control'>
                        <input className='input' name="birth_date" value={birthDate} type='text' placeholder="YYYY-MM-DD" onChange={(e) => setbirthDate(e.target.value)} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Blood Group</label>
                    <div className='control'>
                        <input className='input' name="blood" value={blood} type='text' placeholder="Blood Group" onChange={(e) => setblood(e.target.value)} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Marital Status</label>
                    <div className='control'>
                        <input className='input' name="marital_status" value={marital} type='text' placeholder="true or false" onChange={(e) => setmarital(e.target.value)} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Address</label>
                    <div className='control'>
                        <input className='input' name="address" value={address} type='text' placeholder="Address" onChange={(e) => setaddress(e.target.value)} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Contact Number</label>
                    <div className='control'>
                        <input className='input' type='text' name="contact_number" value={contactNumber} placeholder="Number" onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Emergency Number</label>
                    <div className='control'>
                        <input className='input' type='text' name="emer_contact_number" value={emerContactNumber} placeholder="Emergency number" onChange={(e) => setEmerContactNumber(e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Time Slot</label>
                    <div className="control">
                        <div className="select">
                            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                                {slots.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field is-grouped" style={{ marginLeft: "1rem" }}>
                    <div className="control">
                        <button className="button is-info" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="control">
                        <a href="/appointment"><button className="button is-info">Cancel</button ></a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AppointmentDoctor