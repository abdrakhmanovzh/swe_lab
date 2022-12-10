import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {

    const history = useNavigate();
    const home = async (e) => {
        e.preventDefault();
        history('/');
    }

    return (
        <div>
            <h1 className='is-size-3'>You are not authenticated...</h1>
            <button className="button mt-5 mx-auto" type="button" onClick={home}>Back to Home</button>
        </div >
    )
}

export default Error