const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use((req,res,next)=>{
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
app.get("/",(req,res)=>{
    res.json({"aaaa" : "aaa"});
})
require("./app/routes/Bookroutes.js")(app);

app.listen(3000, () => console.log('Server is running on port 3000'));