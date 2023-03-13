const Book = require("../model/BookModel.js")

exports.findAll = (req,res)=>{
  Book.getAll((err,data)=>{
        if(err)
          res.status(500).send({
            message: err.message
          });
        else res.json(data);
    });
};

exports.findOne = (req,res)=>{
  Book.findById(req.params.bookId ,(err,data)=>{
    if(err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Book with id ${req.params.bookId}.`
        });
      }
      else{
        res.status(500).send({
          message: "Error retrieving Book with id " + req.params.bookId
        });
      }
    } 
    else{
      res.json(data);
    }
  })
}