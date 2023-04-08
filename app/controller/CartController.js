const db = require("../model/db.js");

exports.addCart = (req,res) =>{
    try{
        const {username,ProId,ProImg,ProName,ProQty,ProPrice} = req.body;
        const newCart = {username,ProId, ProImg,ProName,ProQty,ProPrice}
        db.query('INSERT INTO carts SET ?', newCart, (error, results)=>{
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'can not add Product to cart' });
            } else {
                res.json({message: 'complete'});
            }
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.getAllProduct = (req,res) =>{
    try{
        const {username} = req.body;
        db.query('Select * From carts Where username = ?', [username], (error, data)=>{
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'can not show cart' });
            }else if (data.length ===0 ) {
                res.status(401).json({ message: 'Invalid carts user' });
            } else {
                res.json(data);
            }
        });
    }
    catch(err){
        console.log(err)
    }
}