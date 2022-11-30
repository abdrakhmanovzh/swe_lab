import express from "express";
import {
    Login,
    Logout,
    getDoctorsForPatients,
    getDoctorForPatient,
    setDoctorForPatient,
} from "../controllers/Users.js";
import {
    getUsers,
    getDoctors,
    getDoctor,
    updateDoctor,
    addDoctor,
    deleteDoctor,
    getPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
} from "../controllers/Admin.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyAdmin } from "../middleware/VerifyAdmin.js";

const router = express.Router();

//auth routes
router.post("/login", Login);
router.delete("/logout", Logout);
router.get("/token", refreshToken);

//admin routes
router.get("/users", verifyAdmin, getUsers);

//admin doctor routes
router.get("/doctors", verifyAdmin, getDoctors);
router.get("/doctors/:id", verifyAdmin, getDoctor);
router.post("/doctors", verifyAdmin, addDoctor);
router.put("/doctors/update/:id", verifyAdmin, updateDoctor);
router.delete("/doctors/:id", verifyAdmin, deleteDoctor);
//admin patient routes
router.get("/patients", verifyAdmin, getPatients);
router.get("/patients/:id", verifyAdmin, getPatient);
router.post("/patients", verifyAdmin, addPatient);
router.put("/patients/update/:id", verifyAdmin, updatePatient);
router.delete("/patients/:id", verifyAdmin, deletePatient);

//patient routes
router.get("/appointment/doctors", getDoctorsForPatients);
router.get("/appointment/doctors/:id", getDoctorForPatient);
router.post("/appointment/doctors/:id", setDoctorForPatient);
export default router;
