const books = require('../models/Book');

const deleteBookByIdHandler = (request, h) => {
  try {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
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

module.exports = { deleteBookByIdHandler };
