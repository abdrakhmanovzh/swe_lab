import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const BySpecilization = () => {
    const { spec_id } = useParams()
    const [docs, setdocs] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        getDocs();
    }, []);

    const getDocs = async () => {
        const response = await axios.get(`http://localhost:5000/appointment/doctors/spec/${spec_id}`)
        setdocs(response.data);
        console.log(docs);
    }

    return (
        <>
            <h1 className='is-size-1'>Specialization</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {docs.map((doc) => (
                    <div style={{ minWidth: "fit-content", maxWidth: "20rem", margin: "1rem", border: "1px solid black" }}>
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
                            <div className='content' style={{ whiteSpace: "nowrap", marginTop: "1rem" }}>
                                <div style={{ fontWeight: "bold", textAlign: "left" }}> Price per appointment <p style={{ fontWeight: "400", float: "right" }}>{doc.price}</p></div>
                                <div style={{ fontWeight: "bold", textAlign: "left" }}> Specialization <p style={{ fontWeight: "400", float: "right" }}> {doc.spec_id}</p></div>
                                <div style={{ fontWeight: "bold", textAlign: "left" }}> Rating <p style={{ fontWeight: "400", float: "right" }}>{doc.rating}</p></div>
                            </div>
                        </div>
                        <a style={{ color: "white" }} href={`/appointment/doctors/${doc.id}`}><button className='mb-2 button is-link'>Select</button></a>
                    </div>
                ))}
            </div>
        </>

    )
}

export default BySpecilization