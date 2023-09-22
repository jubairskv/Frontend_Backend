// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const csv = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '443811',
  database: 'employee',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// API routes for CRUD operations
app.get('/api/employees', (req, res) => {
  const sql = 'SELECT * FROM emp'; // Modify this query based on your database schema
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/api/employees', (req, res) => {
  const {ID,NAME,EMAIL,POSITION } = req.body;
  const employee = { ID,NAME,EMAIL,POSITION  };
  const sql = 'INSERT INTO emp SET ?'; // Modify this query based on your database schema
  db.query(sql, employee, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API route for CSV download
app.get('/api/employees/download', (req, res) => {
  const sql = 'SELECT * FROM emp'; // Modify this query based on your database schema
  db.query(sql, (err, result) => {
    if (err) throw err;

    const employees = result.map((employee) => ({
      ID: employee.ID,
      NAME: employee.NAME,
      EMAIL: employee.EMAIL,
      POSITION: employee.POSITION,
    }));

    const csvWriter = csv({
      path: 'employee_list.csv',
      header: [
        { id: 'ID', title: 'ID' },
        { id: 'NAME', title: 'NAME' },
        { id: 'EMAIL', title: 'EMAIL' },
        { id: 'POSITION', title: 'POSITION' },
      ],
    });

    csvWriter.writeRecords(employees).then(() => {
      res.download('employee_list.csv');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
