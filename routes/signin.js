/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
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
  req.session = null;
  const templateVars = {
    user: req.session,
  };
  res.render('index',templateVars);
}); 

    // Use the pool to query the database
   

    // Check if the password with the provided ID exists in the database
    

router.post('/signin',(req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = 'SELECT * FROM users WHERE name = $1 and password = $2';
  const values = [username, password];
  const result = () =>  {  db
  .query(query,values)
   
  .then((result) => {
    if( result.rows[0].id) {
      const user = result.rows[0];
      req.session.user_id = user.id;
        const templateVars = {
        user: user
      };
      res.render('users',templateVars)
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
}
result();
});




module.exports = router;
