import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Schedule = (appointments) => {
    const [times, setTimes] = useState([]);
    useEffect(() => {
        getTimes();
    });

    const getTimes = () => {
        if (appointments.first == true) {
            setTimes(times => [...times, "09:00am - 10:00am\n"]);
        }
        if (appointments.second == true) {
            setTimes(times => [...times, "10:00am - 11:00am\n"]);
        }
        if (appointments.third == true) {
            setTimes(times => [...times, "11:00am - 12:00am\n"]);
        }
        if (appointments.fourth == true) {
            setTimes(times => [...times, "12:00pm - 01:00pm\n"]);
        }
        if (appointments.fivth == true) {
            setTimes(times => [...times, "01:00pm - 02:00pm\n"]);
        }
        if (appointments.sixth == true) {
            setTimes(times => [...times, "02:00pm - 03:00pm\n"]);
        }
        if (appointments.seventh == true) {
            setTimes(times => [...times, "03:00pm - 04:00pm\n"]);
        }
        if (appointments.eighth == true) {
            setTimes(times => [...times, "04:00pm - 05:00pm\n"]);
        }
    }

    return (
        <>
            {times}
            {console.log(appointments)}
        </>
    )
}

export default Schedule