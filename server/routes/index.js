const router = require('express').Router();
const users = require('../controllers/users');

router.post('/users/login', users.login);
router.post('/users/register', users.register);

module.exports = router;
