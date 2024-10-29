import React, { useState } from "react";
import './AddStudent.css';

const AddStudent = () => {
    const [form, setForm] = useState({
        fullname: "",
        profilePicture: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        faculty: "",
        programStudy: ""
    });
    const [popup, setPopup] = useState({ visible: false, message: "", success: true });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            fullname: "",
            profilePicture: "",
            address: "",
            phoneNumber: "",
            birthDate: "",
            gender: "",
            faculty: "",
            programStudy: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if any form field is empty
        const isFormValid = Object.values(form).every(value => value.trim() !== "");
        
        if (!isFormValid) {
            setPopup({ visible: true, message: "All fields are required!", success: false });
            return; // Exit the function if the form is invalid
        }
    
        fetch("http://localhost:5000/server/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Student added:", data);
            setPopup({ visible: true, message: "Student added successfully!", success: true });
            resetForm(); // Reset the form on success
        })
        .catch((error) => {
            console.error("Error adding student:", error);
            setPopup({ visible: true, message: "Error adding student. Please try again.", success: false });
        });
    };       

    const closePopup = () => {
        setPopup({ visible: false, message: "", success: true });
    };

    return (
        <div className="add-student">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input name="fullname" placeholder="Fullname" value={form.fullname} onChange={handleChange} />
                <input name="profilePicture" placeholder="Profile Picture URL" value={form.profilePicture} onChange={handleChange} />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} />
                <input name="birthDate" type="date" placeholder="Birth Date" value={form.birthDate} onChange={handleChange} />
                <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input name="faculty" placeholder="Faculty" value={form.faculty} onChange={handleChange} />
                <input name="programStudy" placeholder="Program Study" value={form.programStudy} onChange={handleChange} />
                <button type="submit">Add Student</button>
            </form>

            {/* Popup for success/error message */}
            {popup.visible && (
                <div className={`popup ${popup.success ? "success" : "error"}`}>
                    <p>{popup.message}</p>
                    <button onClick={closePopup}>Close</button>
                </div>
            )}
        </div>
    );
};

export default AddStudent;
