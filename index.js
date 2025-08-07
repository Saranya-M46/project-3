const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // to handle JSON body

let books = [];
let nextId = 1;

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// Add a book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author required' });
    }

    const newBook = { id: nextId++, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book
app.put('/books/:id', (req, res) => {
    const { title, author } = req.body;
    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Book not found' });

    books.splice(index, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`📚 Book API running at http://localhost:${PORT}`);
});
