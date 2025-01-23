import express from 'express';
import {postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment} from '../controller/appointmentController.js';
import {isAdminAuthenticated, isStudentAuthenticated} from '../middlewares/auth.js'

const router = express.Router()

router.post("/post",isStudentAuthenticated ,postAppointment)
router.get("/getAll",isAdminAuthenticated ,getAllAppointments)
router.put("/update/:id",isAdminAuthenticated ,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated ,deleteAppointment)

export default router;