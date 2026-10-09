import Book from "../models/Book.js";

// INSERT - POST /books
export const insert = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ message: "Book added", data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL - GET /books
export const get = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE - GET /books/:id
export const show = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - PUT /books/:id
export const update = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.update(req.body);
    res.status(200).json({ message: "Book updated", data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - DELETE /books/:id
export const destroy = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};