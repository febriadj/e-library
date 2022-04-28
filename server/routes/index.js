const router = require('express').Router();
const authenticate = require('../middleware/auth');

const user = require('../controllers/user');
const activities = require('../controllers/activities');
const book = require('../controllers/bookCatalog');
const loan = require('../controllers/loan');
const member = require('../controllers/member');

router.get('/users', authenticate, user.findOne);
router.post('/users/login', user.login);
router.post('/users/register', user.register);

router.get('/activities', authenticate, activities.find);

router.get('/books', authenticate, book.find);
router.post('/books', authenticate, book.insert);
router.delete('/books', authenticate, book.delete);
router.put('/books', authenticate, book.update);

router.get('/loans', authenticate, loan.find);
router.post('/loans', authenticate, loan.insert);
router.delete('/loans', authenticate, loan.delete);
router.put('/loans', authenticate, loan.update);

router.get('/members', authenticate, member.find);
router.post('/members', authenticate, member.insert);
router.delete('/members', authenticate, member.delete);
router.put('/members', authenticate, member.update);

module.exports = router;
