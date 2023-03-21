const { nanoid } = require('nanoid');
const books = require('../models/Book');

const addBookHandler = (request, h) => {
  try {
    // get request using destructuring
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // get the current date
    const insertedAt = new Date().toISOString();
    // get the last updated date
    const updatedAt = insertedAt;

    // check if the title is empty
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    // check if the readPage is greater than the pageCount
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    // generate id
    const id = nanoid(16);

    // check if the book is finished
    const finished = pageCount === readPage;

    // create a new book
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    // push the new book to the Book array
    books.push(newBook);

    // return the response
    const isSuccess = books.filter((book) => book.id === id).length !== 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
  } catch (error) {
    // error response
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
  // add a default return statement to satisfy eslint rule
  return null;
};

module.exports = { addBookHandler };
