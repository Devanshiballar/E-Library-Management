const Book = require('../models/bookModel');

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {

    if (error.name === 'ValidationError') {
   
      const missingFields = Object.keys(error.errors).map((field) => error.errors[field].message);
      return res.status(400).json({ message: 'All fields are required', missingFields });
    }

    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.borrowBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book || !book.available) return res.status(400).json({ message: 'Book not available' });
  
      book.available = false;
      book.borrowedBy = req.user._id;  
      await book.save();
  
      const populatedBook = await Book.findById(book._id).populate('borrowedBy', 'username');
      
      res.status(200).json({ message: 'Book borrowed successfully', book: populatedBook });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
    
exports.returnBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book || book.available) return res.status(400).json({ message: 'Book not borrowed' });
  
      book.available = true;
      book.borrowedBy = null;
      await book.save();
  
      res.status(200).json({ message: 'Book returned successfully', book });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
