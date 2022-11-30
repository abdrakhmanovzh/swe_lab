import "../../../App.css";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminDoctorCreate = () => {
    const history = useNavigate();

    const initialState = {
        full_name: "",
        birth_date: "",
        iin: "",
        contact_number: "",
        dep_id: "",
        spec_id: "",
        exp: "",
        img: "",
        category: "",
        price: "",
        degree: "",
        rating: "",
        address: "",
        password: "",
    }
    const [state, setstate] = useState(initialState);
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");

    const {
        full_name,
        birth_date,
        iin,
        contact_number,
        dep_id,
        spec_id,
        exp,
        img,
        category,
        price,
        degree,
        rating,
        address,
        password,
    } = state;

    const { id } = useParams();
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

    const adminHome = () => {
        history('/admin/doctors');
    }

    useEffect(() => {
        refreshToken();
        axiosJWT.get(`http://localhost:5000/doctors/${id}`).then((resp) => setstate({ ...resp.data }))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            axiosJWT
                .post("http://localhost:5000/doctors", {
                    full_name,
                    birth_date,
                    iin,
                    contact_number,
                    dep_id,
                    spec_id,
                    exp,
                    img,
                    category,
                    price,
                    degree,
                    rating,
                    address,
                    password,
                })
                .then(() => {
                    setstate({
                        full_name: "",
                        birth_date: "",
                        iin: "",
                        contact_number: "",
                        dep_id: "",
                        spec_id: "",
                        exp: "",
                        img: "",
                        category: "",
                        price: "",
                        degree: "",
                        rating: "",
                        address: "",
                        password: "",
                    });
                })
                .catch((err) => console.log(err.response.data));
        } else {
            axiosJWT
                .put("http://localhost:5000/doctors/update/" + id, {
                    full_name,
                    birth_date,
                    iin,
                    contact_number,
                    dep_id,
                    spec_id,
                    exp,
                    img,
                    category,
                    price,
                    degree,
                    rating,
                    address,
                    password,
                })
                .then(() => {
                    setstate({
                        full_name: "",
                        birth_date: "",
                        iin: "",
                        contact_number: "",
                        dep_id: "",
                        spec_id: "",
                        exp: "",
                        img: "",
                        category: "",
                        price: "",
                        degree: "",
                        rating: "",
                        address: "",
                        password: "",
                    });
                })
                .catch((err) => console.log(err));
        }
        history('/admin/doctors');
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
                        <label htmlFor="dep_id">Department</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="dep_id"
                            required
                            autoComplete="off"
                            name="dep_id"
                            value={dep_id || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="spec_id">Spec</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="spec_id"
                            required
                            autoComplete="off"
                            name="spec_id"
                            value={spec_id || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="exp">Exp</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="exp"
                            required
                            autoComplete="off"
                            name="exp"
                            value={exp || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="img">Img</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="img"
                            name="img"
                            autoComplete="off"
                            value={img || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="category">Category</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="category"
                            required
                            autoComplete="off"
                            name="category"
                            value={category || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="price">Price</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="price"
                            required
                            autoComplete="off"
                            name="price"
                            value={price || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="degree">Degree</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="degree"
                            required
                            autoComplete="off"
                            name="degree"
                            value={degree || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="rating">Rating</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="rating"
                            required
                            autoComplete="off"
                            name="rating"
                            value={rating || ""}
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

export default AdminDoctorCreate;
