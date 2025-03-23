// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  masach: { type: String, required: true, unique: true },
  tensach: { type: String, required: true },
  tacgia: { type: String, required: true },
  theloaichinh: { type: String, required: true },
  theloaiphu: { type: String },
  giacu: { type: Number, required: true },
  gia: { type: Number, required: true },
  ctyphathanh: { type: String },
  nxb: { type: String },
  quocgia: { type: String },
  ngonngu: { type: String },
  sotrang: { type: Number },
  trongluong: { type: Number },
  kichthuoc: { type: String },
  dotuoi: { type: String },
  loaibia: { type: String },
  hinhanh: { type: String },
  namphathanh: { type: Date },
  dinhdang: { type: String },
  motasach: { type: String }
}, { collection: 'sanpham' }); // Explicitly set the collection name to 'sanpham'

module.exports = mongoose.model('Book', bookSchema);