const sql = require("./db.js");

const User = function (user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.Lname = product.Lname;
    this.address = product.address;
};

User.login = (user,result) =>{
    sql.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('Internal server error');
        } else if (results.length === 0) {
          res.status(401).send('Invalid credentials');
        } else {
          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            // Generate JWT
            const token = jwt.sign({ username: user.username }, 'secret_key');
            res.json({ token });
          } else {
            res.status(401).send('Invalid credentials');
          }
        }
      });
};