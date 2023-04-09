module.exports = app =>{
    const Product = require("../controller/ProCon.js");
    const Carts = require("../controller/CartController.js")
    app.get("/products",Product.findAll);
    app.get("/products/:ProId",Product.findOne);
    app.post("/addCart",Carts.addCart);
    app.post("/carts",Carts.getAllProduct);
    app.delete("/carts/:CartId",Carts.DelOneCart);
    app.delete("/cartsDel",Carts.DelCart);
}