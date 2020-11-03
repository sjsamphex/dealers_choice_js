const express = require('express');
const app = express();
const morgan = require('morgan');
const bookBank = require('./bookBank.js');
// eslint-disable-next-line no-unused-vars
const html = require('html-template-tag');
const bookList = require('./views/bookList');
const bookDetails = require('./views/bookDetails');
const fourOhFour = require('./views/404');

express.static('./');
app.use(express.static('public'));
app.use(express.static('public/images'));

app.use(morgan('dev'));
app.get('/', (req, res, next) => {
  const books = bookBank.list();
  res.send(bookList(books));
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
