module.exports = app =>{
    const Product = require("../controller/ProCon.js");
    const Carts = require("../controller/CartController.js")
    const Orders = require("../controller/OrderComtroller.js")
    const User = require("../controller/UserController.js")
    

    app.get("/products",Product.findAll);
    app.get("/products/:ProId",Product.findOne);


    app.post("/addCart",Carts.addCart);
    app.post("/carts",Carts.getAllProduct);
    app.delete("/carts/:CartId",Carts.DelOneCart);
    app.delete("/cartsDel/:username",Carts.DelCart);


    app.post("/order",Orders.createOrder);
    app.post("/orderdetail",Orders.createOrderDetail);
    app.post("/getOrder",Orders.getAlluser);
    app.get("/getorderdetail/:OrderId",Orders.getAlloneOrders);
    app.get("/order/:OrderId",Orders.getOneOrder);


    app.post("/edituser",User.editProfile);
    app.post("/editpassword",User.editPassword);
}