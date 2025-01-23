import mongoose from 'mongoose'
import validator from 'validator'

const appointmentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain Atleast 3 Characters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain Atleast 3 Characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain 10 digits!"],
        maxLength: [10, "Phone Number Must Contain 10 digits!"]
    },
    collegeID:{
        type: String,
        required: true,
        minLength: [11, "College ID Must Contain 11 digits!"],
        maxLength: [11, "College ID Must Contain 11 digits!"]
    },
    dob:{
        type: Date,
        required: [true, "Date of Birth is required!"]
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male","Female"]
    },
    appointment_date:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    teacher:{
        firstName:{
            type: String,
        required: true
        },
        lastName:{
            type: String,
        required: true
        }
    },
    currentStudent:{
        type: Boolean,
        default: false
    },
    teacherID:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    studentID:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)