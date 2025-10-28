const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const USERS_FILE = 'users.json';

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    if (users.find(user => user.username === username)) {
        return res.status(400).send('User already exists');
    }

    users.push({ username, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.send('Signup successful');
});
``
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(3000, () => {
    console.log('Gatekeeper App running on port 3000');
});
