module.exports = app =>{
    const Product = require("../controller/ProCon.js");
    app.get("/products",Product.findAll);
    app.get("/products/:ProId",Product.findOne);
}