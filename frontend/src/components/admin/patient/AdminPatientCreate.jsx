import "../../../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from "react-router-dom";

const AdminPatientCreate = () => {
    const history = useNavigate();

    const initialState = {
        full_name: "",
        birth_date: "",
        iin: "",
        contact_number: "",
        emer_contact_number: "",
        blood_group: "",
        marital_status: "",
        address: "",
        password: "",
    }
    const [state, setstate] = useState(initialState);
    const {
        full_name,
        birth_date,
        iin,
        contact_number,
        emer_contact_number,
        blood_group,
        marital_status,
        address,
        password,
    } = state;

    const { id } = useParams();
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");

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

    useEffect(() => {
        refreshToken();
        axiosJWT.get(`http://localhost:5000/patients/${id}`).then((resp) => setstate({ ...resp.data }))
    }, [id]);

    const adminHome = () => {
        history('/admin/patients');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            axiosJWT
                .post("http://localhost:5000/patients", {
                    full_name,
                    birth_date,
                    iin,
                    contact_number,
                    emer_contact_number,
                    blood_group,
                    marital_status,
                    address,
                    password,
                })
                .then(() => {
                    setstate({
                        full_name: "",
                        birth_date: "",
                        iin: "",
                        contact_number: "",
                        emer_contact_number: "",
                        blood_group: "",
                        marital_status: "",
                        address: "",
                        password: "",
                    });
                })
                .catch((err) => console.log(err.response.data));
        } else {
            axiosJWT
                .put("http://localhost:5000/patients/update/" + id, {
                    full_name,
                    birth_date,
                    iin,
                    contact_number,
                    emer_contact_number,
                    blood_group,
                    marital_status,
                    address,
                    password,
                })
                .then(() => {
                    setstate({
                        full_name: "",
                        birth_date: "",
                        iin: "",
                        contact_number: "",
                        emer_contact_number: "",
                        blood_group: "",
                        marital_status: "",
                        address: "",
                        password: "",
                    });
                })
                .catch((err) => console.log(err));
        }
        history('/admin/patients');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setstate({ ...state, [name]: value });
    };

    return (
        <div className="CreateForm">
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <div>
                    <div>
                        <label htmlFor="full_name">Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            required
                            autoComplete="off"
                            value={full_name || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="birth_date">Birth Date</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="birth_date"
                            required
                            autoComplete="off"
                            name="birth_date"
                            value={birth_date || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="iin">IIN</label>
                    </div>
                    <div>
                        <input
                            type="number"
                            id="iin"
                            required
                            autoComplete="off"
                            name="iin"
                            value={iin || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="contact_number">Contact</label>
                    </div>
                    <div>
                        <input
                            type="number"
                            id="contact_number"
                            required
                            autoComplete="off"
                            name="contact_number"
                            value={contact_number || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="emer_contact_number">Emergency Contact</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="emer_contact_number"
                            required
                            autoComplete="off"
                            name="emer_contact_number"
                            value={emer_contact_number || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="blood_group">Blood Group</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="blood_group"
                            required
                            autoComplete="off"
                            name="blood_group"
                            value={blood_group || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="marital_status">Marital Status</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="marital_status"
                            required
                            autoComplete="off"
                            name="marital_status"
                            value={marital_status || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="address">Address</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="address"
                            required
                            autoComplete="off"
                            name="address"
                            value={address || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="password"
                            required
                            autoComplete="off"
                            name="password"
                            value={password || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <input
                    type="submit"
                    value={id ? "Update" : "Submit"}
                    style={{
                        margin: "10px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                    }}
                />
                <input
                    type="button"
                    value="Go Back"
                    onClick={adminHome}
                    style={{ backgroundColor: "white", borderRadius: "5px" }}
                />
            </form>
        </div>
    );
};

export default AdminPatientCreate;
