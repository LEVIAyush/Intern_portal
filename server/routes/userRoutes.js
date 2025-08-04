const express = require('express');
const { getUserData, signup, login } = require('../controllers/userController');

const router = express.Router();

router.get('/me', getUserData);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;