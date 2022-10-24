const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const bookController = require("./controllers/bookController");

router.get('/', homeController.getHome)
router.get('/home', homeController.getHome)
router.get("/books", bookController.addBook)
router.get("/book-list", bookController.getBookList)
router.post('/books',bookController.postBook)
router.get('/book-list/delete/:id', bookController.deleteBook)
router.get('/book-list/edit/:id',bookController.showEditBook)
router.post('/books/edit/:id',bookController.editBook)

module.exports = router;
