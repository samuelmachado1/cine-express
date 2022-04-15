const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Utilizando o get do users'
  });
});

router.post('/', (req, res, next) => {
  const user = {
    name: req.body.name,
    cpf: req.body.cpf,
    birthdate: req.body.birthdate,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    email: req.body.email,
    password: req.body.password
  };
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query('INSERT INTO users (name, cpf, birthdate, phone, city, state, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user.name, user.cpf, user.birthdate, user.phone, user.city, user.state, user.email, user.password],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error
          });
        }
        res.status(201).send({
          message: 'Usuário criado com sucesso!',
          user: user.name,
          id: result.insertId
        });
      });
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