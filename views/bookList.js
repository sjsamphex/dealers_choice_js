var html = require('html-template-tag');
module.exports = (books) => {
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
  return htmlscript;
};