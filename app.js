const express = require('express');
const app = express();
const morgan = require('morgan');
const bookBank = require('./bookBank.js');

express.static('./');
app.use(express.static('public'));

app.use(morgan('dev'));
app.get('/', (req, res, next) => {
  const books = bookBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Cat Books</title>
    <link rel="stylesheet" href="/main.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/CatBookLogo.png"/> <a href="/">Cat Books </a><img src="/CatBookLogo.png"/></header>
      ${books
        .map(
          (book) => `
        <div class='book-item'>
          <div class='book-image'>
            <img src="/${book.image}"/>
          </div>
          <div class='book-info'>
            <p>
              <span class="news-position"><a href="/books/${book.id}">${book.title}</a>. </span>
              <br>
              <small>(by ${book.author})</small>
            </p>
            <small class="news-info">
              Rating: ${book.rating} ⭑
            </small>
          </div>

        </div>`
        )
        .join('')}
    </div>
  </body>
</html>`;
  res.send(html);
});

app.get('/books/:id', (req, res, next) => {
  const id = req.params.id;
  const book = bookBank.find(id);
  if (!book.id) {
    next(new Error('Not Found'));
  }
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>Cat Books</title>
    <link rel="stylesheet" href="/book.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/CatBookLogo.png"/> <a href="/">Cat Books </a><img src="/CatBookLogo.png"/></header>
       <div class='book-item'>
          <div class='book-image'>
            <img src="/${book.image}"/>
          </div>
          <div class ='book-info'>
            <p>
              ${book.title}
              <br>
              <small>(by ${book.author})</small>
            </p>
            <small class="news-info">
              Rating: ${book.rating} ⭑
            </small>
            <p>${book.content}</p>
          </div>
        </div>
    </div>
  </body>
</html>`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send('Not found :(');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
