import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './EditStudent.css';

const EditStudent = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        profilePicture: "",
        fullname: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
        faculty: ""
    });
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch(`https://student-portal-akbar.vercel.app/server/students/${id}`)
            .then(response => response.json())
            .then(data => setForm(data))
            .catch(error => console.error('Error fetching student data:', error));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://student-portal-akbar.vercel.app/server/students/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (!response.ok) {
                throw new Error('Failed to update student data');
            }
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <div className="edit-student-page">
            <div className="edit-student-container">
                <img src={form.profilePicture || "placeholder.png"} alt="Profile" className="profile-pic" />
                <div className="edit-student-form">
                    <h2>Student Portal</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Fullname</label>
                        <input name="fullname" value={form.fullname} onChange={handleChange} />

                        <label>Address</label>
                        <input name="address" value={form.address} onChange={handleChange} />

                        <label>Phone Number</label>
                        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />

                        <label>Birth Date</label>
                        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />

                        <label>Gender</label>
                        <select name="gender" value={form.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <label>Program Study</label>
                        <input name="programStudy" value={form.programStudy} onChange={handleChange} />

                        <label>Faculty</label> {/* New label for faculty */}
                        <input name="faculty" value={form.faculty} onChange={handleChange} /> {/* New input for faculty */}

                        <button type="submit" className="edit-student-button">Edit Student</button>
                    </form>
                </div>
            </div>

            {showPopup && (
                <div className="popup-modal">
                    <div className="popup-content">
                        <p>Student data updated successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditStudent;
