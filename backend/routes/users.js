const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query(`SELECT * FROM users`, (error, result, fields) => {
      if (error) {
        return res.status(500).send({
          error: error
        });
      }
      return res.status(200).send({ response: result });
    }
    );
  });
});

router.post('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query('INSERT INTO users (name, cpf, birthdate, phone, city, state, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.body.name, req.body.cpf, req.body.birthdate, req.body.phone, req.body.city, req.body.state, req.body.email, req.body.password],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error
          });
        }
        res.status(201).send({
          message: 'Usuário criado com sucesso!',
          id: result.insertId
        });
      });
  });
});

router.get('/:userId', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query(`SELECT * FROM users WHERE id = ?`, [req.params.userId], (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({
          error: error
        });
      }
      res.status(200).send({ response: result });
    }
    );
  });
});

router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query(`UPDATE users SET name = ?, birthdate = ?, phone = ?, city = ?, state = ?,  password = ? WHERE id = ?`,
      [req.body.name, req.body.birthdate, req.body.phone, req.body.city, req.body.state, req.body.password, req.body.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error
          });
        }
        res.status(200).send({
          message: 'Usuário atualizado com sucesso!'
        });
      }
    );
  });
});

router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query(`DELETE FROM users WHERE id = ?`, [req.body.id], (error, result, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({
          error: error
        });
      }
      res.status(202).send({
        message: 'Usuário deletado com sucesso!'
      });
    }
    );
  });
}
);



module.exports = router;