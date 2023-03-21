const {
  deleteBookByIdHandler,
} = require('../controllers/deleteBookControllers');
const { addBookHandler } = require('../controllers/addBookControllers');
const { editBookHandler } = require('../controllers/editBookControllers');
const { viewBookHandler } = require('../controllers/viewBookControllers');
const {
  viewDetailBookHandler,
} = require('../controllers/viewDetailBookControllers');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: viewBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: viewDetailBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
