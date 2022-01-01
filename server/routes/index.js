const router = require('express').Router();
const authenticate = require('../middleware/auth');
const user = require('../controllers/user');
const book = require('../controllers/bookCatalog');

router.get('/users', authenticate, user.findOne);
router.post('/users/login', user.login);
router.post('/users/register', user.register);

router.get('/books', authenticate, book.find);
router.post('/books', authenticate, book.insert);

module.exports = router;
