const sql = require("./db.js");

const Product = function (product) {
    this.ProId = product.ProId;
    this.ProImg = product.ProImg;
    this.ProName = product.ProName;
    this.ProPrice = product.ProPrice;
    this.ProDetail = product.ProDetail;
};

Product.getAll = result => {
    sql.query("SELECT * FROM product", (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        result(null, res);
    })
};
Product.findById = (ProId,result) =>{
    sql.query(`SELECT * FROM product WHERE ProId = "${ProId}"`,(err,res) =>{
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        if(res.length){
            result(null,res[0]);
            return;
        }
        result({Kind : "not Found"},null)
    })
};
module.exports = Product;