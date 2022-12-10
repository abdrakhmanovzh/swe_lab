import {
    Doctors,
    DoctorSchedule,
    Patients,
    Users,
} from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email,
            },
        });
        if (user[0].password != req.body.password)
            return res.status(400).json({ msg: "Wrong Password" });

        const userId = user[0].id;
        const email = user[0].email;
        const role = user[0].role;

        const accessToken = jwt.sign(
            { userId, email, role },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15s",
            }
        );
        const refreshToken = jwt.sign(
            { userId, email, role },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        await Users.update(
            { refresh_token: refreshToken },
            {
                where: {
                    id: userId,
                },
            }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Email not found" });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken,
        },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update(
        { refresh_token: null },
        {
            where: {
                id: userId,
            },
        }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};

export const getDoctorsForPatients = async (req, res) => {
    try {
        const docs = await Doctors.findAll({
            attributes: ["id", "full_name"],
        });
        res.json(docs);
    } catch (error) {
        console.log(error);
    }
};

export const getDoctorForPatient = async (req, res) => {
    try {
        const doc = await Doctors.findOne({
            attributes: [
                "id",
                "full_name",
                "price",
                "img",
                "spec_id",
                "rating",
                "degree",
                "category",
            ],
            where: {
                id: req.params.id,
            },
        });
        res.json(doc);
    } catch (error) {
        console.log(error);
    }
};

export const setDoctorForPatient = async (req, res) => {
    try {
        await Patients.upsert({
            iin: req.body.iin,
            birth_date: req.body.birth_date,
            blood_group: req.body.blood,
            marital_status: req.body.marital,
            address: req.body.address,
            full_name: req.body.fullName,
            contact_number: req.body.contactNumber,
            emer_contact_number: req.body.emerContactNumber,
        });

        const timeSlot = req.body.timeSlot;
        switch (timeSlot) {
            case "first":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    first: 1,
                });
                break;

            case "second":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    second: 1,
                });
                break;

            case "third":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    third: 1,
                });
                break;
            case "fourth":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    fourth: 1,
                });
                break;
            case "fivth":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    fivth: 1,
                });
                break;
            case "sixth":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    sixth: 1,
                });
                break;
            case "seventh":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    seventh: 1,
                });
                break;
            case "eighth":
                await DoctorSchedule.upsert({
                    doc_id: req.body.id,
                    patient_iin: req.body.iin,
                    eighth: 1,
                });
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getDoctorSchedule = async (req, res) => {
    try {
        const schedules = await DoctorSchedule.findOne({
            where: {
                doc_id: req.params.id,
            },
        });
        res.json(schedules);
    } catch (error) {
        console.log(error);
    }
};

export const getDoctorsBySpec = async (req, res) => {
    try {
        const docs = await Doctors.findAll({
            attributes: [
                "id",
                "full_name",
                "price",
                "img",
                "spec_id",
                "rating",
            ],
            where: {
                spec_id: req.params.spec_id,
            },
        });
        res.json(docs);
    } catch (error) {
        console.log(error);
    }
};

export const PatientLogin = async (req, res) => {
    try {
        const user = await Patients.findAll({
            where: {
                iin: req.body.iin,
            },
        });
        console.log(user);
        if (user[0].password != req.body.password)
            return res.status(400).json({ msg: "Wrong Password" });

        const userId = user[0].id;
        const iin = user[0].iin;

        const accessToken = jwt.sign(
            { userId, iin },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15s",
            }
        );
        const refreshToken = jwt.sign(
            { userId, iin },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        await Users.create({
            full_name: user[0].full_name,
            password: user[0].password,
            user_id: user[0].iin,
            role: "patient",
            refresh_token: refreshToken,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "IIN not found" });
    }
};

export const PatientLogout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken,
        },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.destroy({
        where: {
            id: userId,
        },
    });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};

export const DoctorLogin = async (req, res) => {
    try {
        const user = await Doctors.findAll({
            where: {
                iin: req.body.iin,
            },
        });
        console.log(user);
        if (user[0].password != req.body.password)
            return res.status(400).json({ msg: "Wrong Password" });

        const userId = user[0].id;
        const iin = user[0].iin;

        const accessToken = jwt.sign(
            { userId, iin },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15s",
            }
        );
        const refreshToken = jwt.sign(
            { userId, iin },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        await Users.create({
            full_name: user[0].full_name,
            password: user[0].password,
            user_id: user[0].iin,
            role: "doctor",
            refresh_token: refreshToken,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "IIN not found" });
    }
};

export const DoctorLogout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken,
        },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.destroy({
        where: {
            id: userId,
        },
    });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};

export const GetPatientInfo = async (req, res) => {
    try {
        const patient = await Patients.findOne({
            where: { iin: req.params.iin },
        });
        res.json(patient);
    } catch (error) {
        console.log(error);
    }
};

export const GetPatientAppointments = async (req, res) => {
    try {
        const appointments = await DoctorSchedule.findOne({
            where: { patient_iin: req.params.iin },
        });
        res.json(appointments);
    } catch (error) {
        console.log(error);
    }
};
