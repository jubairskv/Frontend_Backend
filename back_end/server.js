const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// MSSQL configuration
const config = {
  user: 'root',
  password: '443811',
  server: 'localhost',
  database: 'employee',
};

// API route to add an employee
app.post('/api/addEmployee', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { id,name, email, position } = req.body;
    const query = `INSERT INTO emp(id,name, email, position) VALUES ('${id}','${name}', '${email}', '${position}')`;
    await pool.request().query(query);
    res.status(200).json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to retrieve employees
app.get('/api/getEmployees', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM emp');
    const employees = result.recordset;
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to download employees as CSV
app.get('/api/downloadEmployees', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM emp');
    const employees = result.recordset;

    const csvWriter = createObjectCsvWriter({
      path: 'employee_list.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'position', title: 'Position' },
      ],
    });

    await csvWriter.writeRecords(employees);
    res.download('employee_list.csv');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
