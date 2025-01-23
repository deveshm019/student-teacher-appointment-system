import mongoose from 'mongoose'

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "student-teacher-appointment-system"
    }).then(()=>{console.log("Connected to database!")}).catch((error)=>{console.log(error)})
}