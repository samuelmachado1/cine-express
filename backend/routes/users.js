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

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  res.status(200).json({
    message: 'Utilizando o get do users',
    id: id
  });
});

router.patch('/', (req, res, next) => {
  const id = req.params.userId;
  res.status(200).json({
    message: 'Utilizando o patch do users',
    id: id
  });
});

router.delete('/', (req, res, next) => {
  const id = req.params.userId;
  res.status(200).json({
    message: 'Utilizando o delete do users',
    id: id
  });
});



module.exports = router;