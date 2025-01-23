import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from 'cloudinary'

export const studentRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    collegeID,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !collegeID ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    collegeID,
    dob,
    gender,
    password,
    role: "Student",
  });
  generateToken(user, "User Registered!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords Do Not Match!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Credentials!", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User With This Role Not Found!", 404));
  }
  generateToken(user, "Login Successfull!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    collegeID,
    dob,
    gender,
    password,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !collegeID ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const alredayExists = await User.findOne({ email });
  if (alredayExists) {
    return next(new ErrorHandler("User Already Exists!", 400));
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    collegeID,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "Admin Registered Successfully!",
  });
});

export const getAllTeachers = catchAsyncErrors(async (req, res, next) => {
  const teachers = await User.find({ role: "Teacher" });
  res.status(200).json({
    success: true,
    teachers,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully!",
    });
});

export const logoutStudent = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("studentToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully!",
    });
});

export const addNewTeacher = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Teacher Avatar Required!", 400));
  }
  const teacherAvatar = req.files.teacherAvatar;
  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];
  if (!allowedFormats.includes(teacherAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    collegeID,
    dob,
    gender,
    password,
    teacherDepartment
  } = req.body;
  if(!firstName || 
    !lastName || 
    !email || 
    !phone || 
    !collegeID || 
    !dob || 
    !gender || 
    !password || 
    !teacherDepartment){
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const alredayExists = await User.findOne({email})
    if(alredayExists){
      return next(new ErrorHandler("User Already Exists!", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(teacherAvatar.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error){
      console.error("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Cloudinary Error!")
    }
    const teacher = await User.create({firstName,
      lastName,
      email,
      phone,
      collegeID,
      dob,
      gender,
      password,
      teacherDepartment,
      role: "Teacher",
      teacherAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
      }
    })
    res.status(200).json({
      success: true,
      message: "New Teacher Registered!",
      teacher
    })
});


