import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Student.css';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        fetch('http://localhost:5000/server/students-db.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setStudents(data.student))
            .catch(error => console.error('Error:', error));
    }, []);
    
    const handleDelete = (id) => {
        setStudentToDelete(id);
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        const id = studentToDelete;
        setShowConfirmation(false);

        fetch(`http://localhost:5000/server/students/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete the student');
                }
                // Update students list after successful deletion
                setStudents(students.filter(student => student.id !== id));
                setNotification({ message: 'Student deleted successfully!', type: 'success' });
            })
            .catch(error => {
                console.error('Error:', error);
                setNotification({ message: 'Failed to delete the student.', type: 'error' });
            })
            .finally(() => {
                // Remove the notification after 3 seconds
                setTimeout(() => setNotification({ message: '', type: '' }), 3000);
            });
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };
    
    return (
        <div className="student-container">
            <h1 className="student-header">All Students</h1>

            {/* Notification */}
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to delete this student?</p>
                    <button onClick={confirmDelete} className="confirm-button">Yes</button>
                    <button onClick={cancelDelete} className="cancel-button">No</button>
                </div>
            )}

            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Faculty</th>
                        <th>Program Study</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/edit-student/${student.id}`}>{student.fullname}</Link>
                            </td>
                            <td>{student.faculty}</td>
                            <td>{student.programStudy}</td>
                            <td>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(student.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Student;
