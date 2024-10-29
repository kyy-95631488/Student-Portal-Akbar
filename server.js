const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.options('*', cors({ origin: 'http://localhost:3000' }));

app.get('/server/students-db.json', (_req, res) => {
    fs.readFile(path.join(__dirname, 'server', 'students-db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Detailed error:", err);
            return res.status(500).json({ message: 'Error reading data', error: err.message });
        }
        res.json(JSON.parse(data));
    });
});

app.get('/server/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    console.log(`Fetching student with ID: ${studentId}`);

    fs.readFile(path.join(__dirname, 'server', 'students-db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading students-db.json:', err);
            return res.status(500).json({ message: 'Error reading data' });
        }

        const studentsData = JSON.parse(data);
        const student = studentsData.student.find(student => student.id === studentId);

        if (!student) {
            console.log(`Student with ID: ${studentId} not found`);
            return res.status(404).json({ message: 'Student not found' });
        }

        console.log('Student found:', student);
        res.json(student);
    });
});

app.delete('/server/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    console.log(`Deleting student with ID: ${studentId}`);

    fs.readFile(path.join(__dirname, 'server', 'students-db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading students-db.json:', err);
            return res.status(500).json({ message: 'Error reading data' });
        }

        const studentsData = JSON.parse(data);
        const updatedStudents = studentsData.student.filter(student => student.id !== studentId);

        console.log('Remaining students after deletion:', updatedStudents);

        fs.writeFile(
            path.join(__dirname, 'server', 'students-db.json'),
            JSON.stringify({ student: updatedStudents }, null, 2),
            (err) => {
                if (err) {
                    console.error('Error deleting student:', err);
                    res.status(500).json({ message: 'Error deleting student' });
                } else {
                    console.log(`Student with ID: ${studentId} deleted successfully`);
                    res.json({ message: 'Student deleted successfully' });
                }
            }
        );
    });
});

app.put('/server/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    console.log(`Updating student with ID: ${studentId}`, updatedData);

    fs.readFile(path.join(__dirname, 'server', 'students-db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading students-db.json:', err);
            return res.status(500).json({ message: 'Error reading data' });
        }

        const studentsData = JSON.parse(data);
        const studentIndex = studentsData.student.findIndex(student => student.id === studentId);

        if (studentIndex === -1) {
            console.log(`Student with ID: ${studentId} not found`);
            return res.status(404).json({ message: 'Student not found' });
        }

        studentsData.student[studentIndex] = { ...studentsData.student[studentIndex], ...updatedData };
        console.log('Updated student data:', studentsData.student[studentIndex]);

        fs.writeFile(
            path.join(__dirname, 'server', 'students-db.json'),
            JSON.stringify(studentsData, null, 2),
            (err) => {
                if (err) {
                    console.error('Error updating student:', err);
                    res.status(500).json({ message: 'Error updating student' });
                } else {
                    console.log(`Student with ID: ${studentId} updated successfully`);
                    res.json({ message: 'Student updated successfully' });
                }
            }
        );
    });
});

app.post('/server/students', (req, res) => {
    const newStudent = req.body;
    newStudent.id = Date.now();  // Generate a unique ID

    fs.readFile(path.join(__dirname, 'server', 'students-db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading students-db.json:", err);
            return res.status(500).json({ message: 'Error reading data' });
        }

        const studentsData = JSON.parse(data);
        studentsData.student.push(newStudent);

        fs.writeFile(
            path.join(__dirname, 'server', 'students-db.json'),
            JSON.stringify(studentsData, null, 2),
            (err) => {
                if (err) {
                    console.error("Error saving new student:", err);
                    return res.status(500).json({ message: 'Error saving new student' });
                }
                console.log("New student added:", newStudent);
                res.json({ message: 'Student added successfully', student: newStudent });
            }
        );
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
