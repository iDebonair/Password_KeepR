/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");

const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();
router.use(
  cookieSession({
    name: "session",
    keys: ["aj345", "dfh345"],
    // Cookie Options
    //maxAge: 24 * 60 * 60 * 1000 expire 24 hours
  })
);


router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user // Pass the user data from the session to the template
  };
  res.render('index', templateVars);
});

// Use the pool to query the database


// Check if the password with the provided ID exists in the database


router.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `
  SELECT users.name as user, apps.name as app, passwords.password, categories.name as category
  FROM users
    JOIN passwords ON users.id = user_id
    JOIN categories ON categories.id = passwords.categories_id
    JOIN apps ON categories.id = apps.categories_id
  WHERE users.name = $1
  `;
  const values = [username];

  db.query(query, values)
    .then((result) => {
      if (result.rows.length === 0) {
        // User not found or incorrect credentials
        return res.status(401).send('Invalid username or password');
      }

      const user = result.rows;
      console.log(result.rows)
      req.session.user_id = user.id;

      const templateVars = {
        user: user
      };
      res.render('users', templateVars);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
