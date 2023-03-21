const books = require('../models/Book');

const viewDetailBookHandler = (request, h) => {
  try {
    const { id } = request.params;

    // check if the book is exist
    const book = books.filter((b) => b.id === id)[0];

    if (book === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: 'success',
      data: {
        book,
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

module.exports = { viewDetailBookHandler };
