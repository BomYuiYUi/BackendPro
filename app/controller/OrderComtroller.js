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
    const orders = req.body;
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      db.query('INSERT INTO orderdetail SET ?',order,(error,result)=>{
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'can not add product to Orderdetail' });
      }
      });
    }
      res.json({message: 'complete'});

  }
  catch(err){
    console.log(err)
  }
}