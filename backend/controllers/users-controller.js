const mysql = require('../mysql').pool;


exports.getUsers = (req, res, next) => {
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
      const response = {
        quantity: result.length,
        request: {
          type: 'GET',
          description: 'Return all users'
        },
        users: result.map(user => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            created_at: user.created_at,
            updated_at: user.updated_at,
            url: 'http://localhost:3000/users/' + user.id
          }
        }),
      };
      return res.status(200).send({ response });
    }
    );
  });

};

exports.postRegister = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query(`SELECT * FROM users WHERE email = ?`, [req.body.email], (error, results) => {
      if (results.length > 0) {
        return res.status(409).send({
          error: 'User already exists. Please, try again.'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              error: err
            });
          }
          conn.query('INSERT INTO users (name, cpf, birthdate, phone, city, state, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
              req.body.name,
              req.body.cpf,
              req.body.birthdate,
              req.body.phone,
              req.body.city,
              req.body.state,
              req.body.email,
              hash
            ],
            (error, results) => {
              conn.release();
              if (error) {
                return res.status(500).send({
                  error: error
                });
              }
              response = {
                message: 'Created user successfully!',
                createdUser: {
                  id: results.insertId,
                  name: req.body.name,
                },
                request: {
                  type: 'POST',
                  description: 'Create a new user',
                  url: 'http://localhost:3000/users',
                }
              }
              return res.status(201).send(response);
            });
        });
      }
    });
  });
};

exports.postLogin = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }
    conn.query(`SELECT * FROM users WHERE email = ?`, [req.body.email], (error, results) => {
      if (results.length < 1) {
        return res.status(401).send({
          error: 'Authentication failed. Please, try again.'
        });
      }
      bcrypt.compare(req.body.password, results[0].password, (err, result) => {
        if (err) {
          return res.status(401).send({
            error: 'Authentication failed. Please, try again.'
          });
        }
        if (result) {
          const token = jwt.sign({
            id: results[0].id,
            name: results[0].name,
            email: results[0].email,
            created_at: results[0].created_at,
            updated_at: results[0].updated_at
          },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).send({
            message: 'Authentication successful!',
            token: token
          });
        }
        return res.status(401).send({
          error: 'Authentication failed. Please, try again.'
        });
      });
    });
  });
};

exports.getUser = (req, res, next) => {
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
      if (result.length == 0) {
        return res.status(404).send({
          message: 'User not found!'
        });
      }
      const response = {
        user: {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          request: {
            type: 'GET',
            description: 'Return a user',
            url: 'http://localhost:3000/users/' + result[0].id
          }
        }
      };
      res.status(200).send({ response });
    }
    );
  });
};

exports.patchUser = (req, res, next) => {
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
        const response = {
          message: 'Updated user successfully!',
          userUpdated: {
            id: req.body.id,
            name: req.body.name,
          },
          request: {
            type: 'PATCH',
            description: 'Update a user',
            url: 'http://localhost:3000/users/' + req.body.id
          }
        };
        res.status(202).send(response);
      }
    );
  });
};

exports.deleteUser = (req, res, next) => {
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
      const response = {
        message: 'Deleted user successfully!',
        request: {
          type: 'DELETE',
          description: 'Delete a user'
        }
      };
      res.status(202).send(response);
    }
    );
  });
};