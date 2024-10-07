const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook, borrowBook, returnBook } = require('../controller/bookController');
const { authenticate, IsUser } = require('../middleware/authenticate ');
const router = express.Router();

router.post('/add',authenticate,IsUser, createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id',authenticate,IsUser, updateBook);
router.delete('/:id',authenticate,IsUser, deleteBook);
router.put('/borrow/:id',authenticate,IsUser, borrowBook);
router.put('/return/:id',authenticate,IsUser, returnBook);



module.exports = router;