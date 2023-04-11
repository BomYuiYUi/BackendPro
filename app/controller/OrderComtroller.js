const db = require("../model/db.js");

exports.createOrder = (req,res) =>{
    try{
      const{username,OrderPrice,OrderTax,OrderShip,OrderTotal,OrderAddress} = req.body;
      const newOrder = {username,OrderPrice,OrderTax,OrderShip,OrderTotal,OrderAddress}
        db.query('INSERT INTO orders SET ?',newOrder,(error,result)=>{
          if (error) {
            console.log(error);
            res.status(500).json({ message: 'can not add Cart to Order' });
        } else {
          db.query('Select * From Orders order by OrderID desc', [username], (error, data)=>{
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'can find Order' });
            }else if (data.length ===0 ) {
                res.status(401).json({ message: 'Invalid Order user' });
            } else {
                res.json(data[0]);
            }
        });
        }
        });

    }
    catch(err){
      console.log(err)
    }
}
exports.createOrderDetail = (req,res) =>{
  try{
    const{OrderId,ProId,ProImg,ProName,ProQty,ProPrice} = req.body;
    const newOrder = {OrderId,ProId,ProImg,ProName,ProQty,ProPrice}
      db.query('INSERT INTO orderdetail SET ?',newOrder,(error,result)=>{
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'can not add product to Orderdetail' });
      } else {
        res.json({message: 'complete'});
      }
      });

  }
  catch(err){
    console.log(err)
  }
}