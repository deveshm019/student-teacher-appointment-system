import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
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
    password:{
        type: String,
        required: true,
        minLength: [6, "Password Must Contain Atleast 6 Characters!"],
        select: false
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "Student", "Teacher"]
    },
    teacherDepartment:{
        type: String
    },
    teacherAvatar:{
        public_id: String,
        url: String
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateToken = async function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

export const User = mongoose.model("User", userSchema) 

