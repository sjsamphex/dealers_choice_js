const express = require('express');
const app = express();
const morgan = require('morgan');
const bookBank = require('./bookBank.js');
var html = require('html-template-tag');

express.static('./');
app.use(express.static('public'));
app.use(express.static('public/images'));

app.use(morgan('dev'));
app.get('/', (req, res, next) => {
  const books = bookBank.list();
  let htmlscript = html`<!DOCTYPE html>
    <html>
      <head>
        <title>Cat Books</title>
        <link rel="stylesheet" href="/main.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div class="book-list">
          <header>
            <img src="/CatBookLogo.png" /> <a href="/">Cat Books </a
            ><img src="/CatBookLogo.png" />
          </header>
          ${books.map(
            (book) => html`<div class="book-item">
              <div class="book-image">
                <img src="/${book.image}" />
              </div>
              <div class="book-info">
                <p>
                  <span class="news-position"
                    ><a href="/books/${book.id}">${book.title}</a>.
                  </span>
                  <br />
                  <small>(by ${book.author})</small>
                </p>
                <small> Rating: ${book.rating} ⭑ </small>
              </div>
            </div>`
          )}
        </div>
      </body>
    </html>`;
  res.send(htmlscript);
});

app.get('/books/:id', (req, res, next) => {
  const id = req.params.id;
  const book = bookBank.find(id);
  if (!book.id) {
    next(new Error('Not Found'));
  }
  res.send(html`<!DOCTYPE html>
    <html>
      <head>
        <title>Cat Books</title>
        <link rel="stylesheet" href="/book.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div class="book-list">
          <header>
            <img src="/CatBookLogo.png" /> <a href="/">Cat Books </a
            ><img src="/CatBookLogo.png" />
          </header>
          <div class="book-item">
            <div class="book-image">
              <img src="/${book.image}" />
            </div>
            <div class="book-info">
              <p>
                ${book.title}
                <br />
                <small>(by ${book.author})</small>
              </p>
              <small> Rating: ${book.rating} ⭑ </small>
              <p>${book.content}</p>
            </div>
          </div>
        </div>
      </body>
    </html>`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  let htmlscript = html`<!DOCTYPE html>
    <html>
      <head>
        <title>Cat Books</title>
        <link rel="stylesheet" href="/book.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div class="book-list">
          <header>
            <img src="/CatBookLogo.png" /> <a href="/">Cat Books </a
            ><img src="/CatBookLogo.png" />
          </header>
          <br />
          <img src="/sadcat.jpg" style="width:auto;height:auto;" />
          <p style="text-align:center">
            This page doesn't exist. Please go back :(
          </p>
        </div>
      </body>
    </html>`;
  res.status(404).send(htmlscript);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
