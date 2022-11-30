import { Doctors, DoctorSchedule, Users } from "../models/UserModel.js";
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
        const sadge = await DoctorSchedule.create({
            doc_id: req.body.doc_id,
            first: req.body.first,
            second: req.body.second,
            third: req.body.third,
            fourth: req.body.fourth,
            fivth: req.body.fivth,
            sixth: req.body.sixth,
            seventh: req.body.seventh,
            eighth: req.body.eighth,
        });
    } catch (error) {
        console.log(error);
    }
};
