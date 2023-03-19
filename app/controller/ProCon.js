const Product = require("../model/ProModel.js")

exports.findAll = (req,res)=>{
  Product.getAll((err,data)=>{
        if(err)
          res.status(500).send({
            message: err.message
          });
        else res.json(data);
    });
};

exports.findOne = (req,res)=>{
  Product.findById(req.params.ProId ,(err,data)=>{
    if(err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Book with id ${req.params.ProId}.`
        });
      }
      else{
        res.status(500).send({
          message: "Error retrieving Book with id " + req.params.ProId
        });
      }
    } 
    else{
      res.json(data);
    }
  })
}