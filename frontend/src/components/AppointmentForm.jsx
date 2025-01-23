import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeID, setCollegeID] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [teacherFirstName, setTeacherFirstName] = useState("");
  const [teacherLastName, setTeacherLastName] = useState("");
  const [reason, setReason] = useState("");
  const [currentStudent, setCurrentStudent] = useState(false);

  const departmentsArray = [
    "Art",
    "Biology",
    "Chemistry",
    "English",
    "History",
    "Mathematics",
    "Music",
    "Physics",
    "Programming"
  ];

  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/teachers",
        { withCredentials: true }
      );
      setTeachers(data.teachers);
      console.log(data.teachers);
    };
    fetchTeachers();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const currentStudentBool = Boolean(currentStudent);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          collegeID,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          teacher_firstName: teacherFirstName,
          teacher_lastName: teacherLastName,
          currentStudent: currentStudentBool,
          reason,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setCollegeID(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setTeacherFirstName(""),
        setTeacherLastName(""),
        setCurrentStudent(""),
        setReason("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="College ID"
              value={collegeID}
              onChange={(e) => setCollegeID(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${teacherFirstName} ${teacherLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setTeacherFirstName(firstName);
                setTeacherLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Teacher</option>
              {teachers
                .filter((teacher) => teacher.teacherDepartment === department)
                .map((teacher, index) => (
                  <option
                    value={`${teacher.firstName} ${teacher.lastName}`}
                    key={index}
                  >
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason For Appointment"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have You Studied Here Previously?</p>
            <input
              type="checkbox"
              checked={currentStudent}
              onChange={(e) => setCurrentStudent(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;