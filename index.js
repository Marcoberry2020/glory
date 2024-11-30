const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: 'l27.0.0.1',
    user: 'root', // replace with your MySQL username
    password: 'marcoberry2020', // replace with your MySQL password
    database: 'todo_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Routes
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const { description } = req.body;
    db.query('INSERT INTO tasks (description) VALUES (?)', [description], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, description, completed: false });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Task deleted' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
