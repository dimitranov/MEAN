const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const connectionString = 'mongodb://georgi:georgi123@ds141674.mlab.com:41674/dimitranov';
const db = mongojs(connectionString, ['students']);
const cors = require('cors');

const port = '5000';

const Students = db.students;
const app = express();

app.use('/assets', express.static(__dirname + '/public'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get all students
app.get('/api/students', (req, res) => {
    Students.find((err, students) => {
        if (err) res.send(err);

        res.json(students);
    });
});

// get single student based on ID
app.get('/api/students/:id', (req, res) => {
    Students.findOne({  _id: mongojs.ObjectId(req.params.id) },
        (err, student) => {
            if (err) res.send(err);

            res.json(student);
        });
});

// create new student
app.post('/api/students', (req, res) => {
    const newStudent = {
        name: req.body.name,
        lname: req.body.lname,
        birthDate: req.body.birthDate,
        facultyNumber: req.body.facultyNumber
    };

    Students.find({ facultyNumber: req.body.facultyNumber }, (err, students) => {
        if (err) res.json({ message: err.error.text }); 

        if (students.length !== 0) {
            res.json({
                isError: true,
                message:'User with this faculty numberm, exists. Please input difirent faculty number.'
            });
        } else {
            Students.save(newStudent, (err, student) => {
                if (err) res.json({ isError: true, message: err.error.text }); 

                res.json({
                    isError: false,
                    message: 'Student created successfuly.'
                });
            });
        }
    });
});

// update student buy ID
app.patch('/api/students/:id', (req, res) => {
    const udatedStudent = {   
        "name": req.body.name,
        "lname": req.body.lname,
        "birthDate": req.body.birthDate,
        "facultyNumber": req.body.facultyNumber
    };

    const selectedUserID = mongojs.ObjectId(req.params.id);

    Students.update(
        { _id: selectedUserID },
        { $set: udatedStudent },
        { multi: true },
        (err, student) => {
            if (err) res.json({
                isError: true,
                message: err.error.text
            }); 

            res.json({
                isError: false,
                message: 'Student updated successfuly.'
            }); 
        });
});

// delete user buy ID
app.delete('/api/students/:id', (req, res) => {
    const selectedUserID = mongojs.ObjectId(req.params.id);

    Students.remove({ _id: selectedUserID}, (err, student) => {
        if (err) res.send(err);

        res.json({
            message: 'Student deleted successfuly.'
        }); 
    });
});

app.listen(port, () => {
    console.log('Server is running on : ' + port)
});