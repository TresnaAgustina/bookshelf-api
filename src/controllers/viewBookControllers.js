const books = require('../models/Book');

const viewBookHandler = (request, h) => {
  try {
    const { name, reading, finished } = request.query;

    let filteredBooks = books;

    if (name !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
    }

    if (finished !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
    }

    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: error,
    });
    response.code(500);
    return response;
  }
};

module.exports = { viewBookHandler };
