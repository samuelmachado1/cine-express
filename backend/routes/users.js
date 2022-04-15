const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Utilizando o get do users'
  });
});

router.post('/', (req, res, next) => {
  const user = {
    name: req.body.name,
    bithdate: req.body.bithdate,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    email: req.body.email,
    password: req.body.password
  };
  res.status(201).json({
    message: 'Usurio criado com sucesso!',
    createdUser: user
  });

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