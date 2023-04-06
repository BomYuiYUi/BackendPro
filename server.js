const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./app/model/db.js')
const jwt_secret = "neko";

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ "aaaa": "aaa" });
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    db.query('SELECT * FROM customer WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        } else if (results.length === 0) {
            res.status(401).json('Email and password are incorrect.');
        } else {
            // Verify password
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Generate JWT
                const token = jwt.sign({ username: user.username }, jwt_secret,{expiresIn: '1hr'});
                res.json({ token });
            } else {
                res.status(401).send('password are incorrect.');
            }
        }
    });
});
app.post('/register', (req, res) => {
    const { username, password,name,Lname,address } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error2' });
        } else {
            const newUser = { username, password: hash ,name,Lname,address};
            db.query('INSERT INTO customer SET ?', newUser, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: 'Internal server error3' });
                } else {
                    const token = jwt.sign({ username }, jwt_secret,{expiresIn: 1});
                    res.json({ token });
                }
            });
        }
    });
});

app.get('/auth', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      res.status(401).json({ message: 'Missing authorization token' });
    } else {
      jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(401).json({ message: 'Invalid authorization token' });
        } else {
          const { username } = decoded;
          db.query('SELECT * FROM customer WHERE username = ?', username, (error, results, fields) => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: 'Internal server error' });
            } else if (results.length === 0) {
              res.status(401).json({ message: 'Invalid authorization token' });
            } else {
              res.json(results);
            }
          });
        }
      });
    }
  });


require("./app/routes/Proroutes.js")(app);

app.listen(3000, () => console.log('Server is running on port 3000'));