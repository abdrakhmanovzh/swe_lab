import "../../../App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ReadOnlyRowDoctor from "./ReadOnlyRowDoctor";

const AdminDoctor = () => {
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [doctors, setdoctors] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        refreshToken();
        getDoctors();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);

            if (decoded.role !== "admin") {
                history("/admin_role");
            }
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

    const getDoctors = async () => {
        const response = await axiosJWT.get("http://localhost:5000/doctors", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setdoctors(response.data);
    };

    return (
        <div className="container" style={{ textAlign: "center" }}>
            <h1 className="is-size-3 AdminText">Doctors</h1>
            <form>
                <div className="DoctorTableWrapper">
                    <div className="DoctorTableHead">
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Name
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Birth Date
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            IIN
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Contact
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Department
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Spec
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Experience
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Img
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Category
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Price
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Degree
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Rating
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Address
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                borderRight: "1px solid black",
                            }}
                        >
                            Password
                        </p>
                        <p style={{ textAlign: "center" }}>Actions</p>
                    </div>
                    <div className="DoctorTableBody">
                        {doctors.map((doctor, index) => (
                            <>{<ReadOnlyRowDoctor doctor={doctor} />}</>
                        ))}
                    </div>
                </div>
            </form>
            <a className="" href="/admin">
                Go Back
            </a>
            <a className="mx-5" href="/admin/doctors/create">
                Add Doctor
            </a>
        </div>
    );
};

export default AdminDoctor;
