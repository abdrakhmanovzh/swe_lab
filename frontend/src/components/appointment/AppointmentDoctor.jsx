import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';

function AppointmentDoctor() {
    const { id } = useParams();
    const [doc, setdoc] = useState([]);

    const initialState = {
        full_name: '',
        contact_number: '',
        emer_contact_number: '',
    }

    const [state, setState] = useState(initialState);

    const {
        full_name,
        contact_number,
        emer_contact_number,
    } = state;

    const initialSlot = {
        first: '',
        second: '',
        third: '',
        fourth: '',
        fivth: '',
        sixth: '',
        seventh: '',
        eighth: '',
    }

    const [timeSlot, setTimeSlot] = useState(initialSlot);

    const {
        first,
        second,
        third,
        fourth,
        fivth,
        sixth,
        seventh,
        eighth,
    } = timeSlot;

    const options = [
        {
            value: first,
            label: "09:00am - 10:00am",
        },
        {
            value: second,
            label: "10:00am - 11:00am",
        },
        {
            value: third,
            label: "11:00am - 12:00am",
        },
        {
            value: fourth,
            label: "12:00pm - 01:00pm",
        },
        {
            value: fivth,
            label: "01:00pm - 02:00pm",
        },
        {
            value: sixth,
            label: "02:00pm - 03:00pm",
        },
        {
            value: seventh,
            label: "04:00pm - 05:00pm",
        },
        {
            value: eighth,
            label: "05:00pm - 06:00pm",
        },
    ];

    useEffect(() => {
        getDoc();
    }, []);

    const getDoc = async () => {
        const response = await axios.get(`http://localhost:5000/appointment/doctors/${id}`);
        setdoc(response.data);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSelectChange = (e) => {
        const time = e.target.value;
        setTimeSlot({ ...timeSlot, [time]: 1 });
    }

    const handleSubmit = async (e) => {
        alert('You chose ' + state.full_name + ' ' + state.contact_number + ' ' + state.emer_contact_number + ' ' + timeSlot.first);
        e.preventDefault();
        await axios.post("http://localhost:5000/appointment/doctor/:id", {
            doc_id: id,
            first: timeSlot.first,
            second: timeSlot.second,
            third: timeSlot.third,
            fourth: timeSlot.fourth,
            fivth: timeSlot.fivth,
            sixth: timeSlot.sixth,
            seventh: timeSlot.seventh,
            eighth: timeSlot.eighth,
        });
        history("/");
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
                    </div>
                </div>
            </div>
            <div className='appointmentForm' style={{ width: "fit-content", margin: "auto", marginTop: "3rem" }}>
                <div className='field'>
                    <label className='label'>Full Name</label>
                    <div className='control'>
                        <input className='input' name="full_name" value={full_name} type='text' placeholder="Name" onChange={handleInputChange} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Contact Number</label>
                    <div className='control'>
                        <input className='input' type='text' name="contact_number" value={contact_number} placeholder="Number" onChange={handleInputChange} />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Emergency Number</label>
                    <div className='control'>
                        <input className='input' type='text' name="emer_contact_number" value={emer_contact_number} placeholder="Emergency number" onChange={handleInputChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Time Slot</label>
                    <div className="control">
                        <div className="select">
                            <select onChange={handleSelectChange}>
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field is-grouped" style={{ marginLeft: "1rem" }}>
                    <div className="control">
                        <button className="button is-link" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AppointmentDoctor