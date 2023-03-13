const sql = require("./db.js");

const Book = function (book) {
    this.bookId = book.bookId;
    this.bookName = book.bookName;
    this.bookImg = book.bookImg;
    this.bookType = book.bookType;
    this.bookSyn = book.bookSyn;
    this.bookPrice = book.bookPrice;
};

Book.getAll = result => {
    sql.query("SELECT * FROM book", (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        result(null, res);
    })
};
Book.findById = (bookId,result) =>{
    sql.query(`SELECT * FROM book WHERE bookId = "${bookId}"`,(err,res) =>{
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
module.exports = Book;