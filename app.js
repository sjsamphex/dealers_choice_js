const express = require('express');
const app = express();
const morgan = require('morgan');
const client = require('./db/index');
const bookBank = require('./bookBank.js');
// eslint-disable-next-line no-unused-vars
const html = require('html-template-tag');
const bookList = require('./views/bookList');
const bookDetails = require('./views/bookDetails');
const fourOhFour = require('./views/404');
const SQL = require('sql-template-strings');

express.static('./');
app.use(express.static('public'));
app.use(express.static('public/images'));

// app.use(morgan('dev'));
app.get('/', async (req, res, next) => {
  try {
    const data = await client.query(SQL`SELECT * FROM books`);
    const books = data.rows;

    // const books = bookBank.list();
    res.send(bookList(books));
  } catch (error) {
    next(error);
  }
});

app.get('/books/:id', (req, res, next) => {
  const id = req.params.id;
  const book = bookBank.find(id);
  if (!book.id) {
    next(new Error('Not Found'));
  }
  res.send(bookDetails(book));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send(fourOhFour());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
