const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Utilizando o get do users'
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Utilizando o post do users'
  });
});

module.exports = router;