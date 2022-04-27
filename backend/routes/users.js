const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../middleware/login');

const usersController = require('../controllers/users-controller');

router.get('/', usersController.getUsers);

router.post('/register', usersController.postRegister);

router.post('/login', usersController.postLogin);

router.get('/:userId', token, usersController.getUser);

router.patch('/update', token, usersController.patchUser);

router.delete('/', token, usersController.deleteUser);


module.exports = router;