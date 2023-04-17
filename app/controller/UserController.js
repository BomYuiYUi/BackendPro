const db = require("../model/db.js");
const bcrypt = require('bcrypt');

exports.editProfile = (req,res) =>{
    try{
        const {username,name,lastname,email,address,tel} = req.body;
        console.log(req.body)
        db.query('UPDATE customers SET name = ?, lastname = ?, email = ?, address = ?,tel = ? WHERE username = ?',[name,lastname,email,address,tel,username], (error, results)=>{
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'can not Update User' });
            } else {
                res.json({message: 'successfully'});
            }
        });
    }
    catch(err){
        console.log(err)
    }
}
exports.editPassword = async (req,res) =>{
    try{
        const { username, password ,newpassword} = req.body;
        db.query('SELECT * FROM customers WHERE username = ?', [username], async (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            } else if (results.length === 0) {
                res.status(401).json('Email and password are incorrect.');
            } else {
                // Verify password
                const user = results[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log(passwordMatch)
                if (passwordMatch) {
                    bcrypt.hash(newpassword, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: 'Internal server error2' });
                        } else {
                            const newUser = { username, password: hash };
                            db.query('UPDATE customers SET password = ? WHERE username = ?', [newUser.password,newUser.username], (error, results, fields) => {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json({ message: 'Internal server error' });
                                } else {
                                    res.json({message: 'successfully'});
                                }
                            });
                        }
                    });
                } else {
                    res.status(401).send('password are incorrect.');
                }
            }
        });
    }
    catch(err){
        console.log(err)
    }
}
