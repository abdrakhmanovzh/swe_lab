import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from './Pagination'


const BySpecilization = () => {
    const { spec_id } = useParams()
    const [docs, setdocs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(4);

    useEffect(() => {
        getDocs();
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = docs.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(docs.length / recordsPerPage)

    const getDocs = async () => {
        const response = await axios.get(`http://localhost:5000/appointment/doctors/spec/${spec_id}`)
        setdocs(response.data);
    }

    return (
        <>
            <h1 className='is-size-1'>Specialization {spec_id}</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {currentRecords.map((doc) => (
                    <div style={{ minWidth: "fit-content", maxWidth: "18rem", margin: "1rem", border: "1px solid black" }}>
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
            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <a href='/appointment'><button className='is-link button'>Exit</button></a>
        </>

    )
}

export default BySpecilization