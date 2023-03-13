module.exports = app =>{
    const Book = require("../controller/BookCon.js");
    app.get("/books",Book.findAll);
    app.get("/books/:bookId",Book.findOne);
}