// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:masach', async (req, res) => {
  try {
    const book = await Book.findOne({ masach: req.params.masach });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const book = new Book({
    masach: req.body.masach,
    tensach: req.body.tensach,
    tacgia: req.body.tacgia,
    theloaichinh: req.body.theloaichinh,
    theloaiphu: req.body.theloaiphu,
    giacu:req.body.giacu,
    gia: req.body.gia,
    ctyphathanh: req.body.ctyphathanh,
    nxb: req.body.nxb,
    quocgia: req.body.quocgia,
    ngonngu: req.body.ngonngu,
    sotrang: req.body.sotrang,
    trongluong: req.body.trongluong,
    kichthuoc: req.body.kichthuoc,
    dotuoi: req.body.dotuoi,
    loaibia: req.body.loaibia,
    hinhanh: req.body.hinhanh,
    namphathanh: req.body.namphathanh,
    dinhdang: req.body.dinhdang,
    motasach: req.body.motasach
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:masach', async (req, res) => {
  try {
    const book = await Book.findOne({ masach: req.params.masach });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    Object.assign(book, req.body);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:masach', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ masach: req.params.masach });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;