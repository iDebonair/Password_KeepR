/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session");
const users = require('../db/queries/users');
router.get('/', (req, res) => {

  res.render('users');
}); 

router.get('/signin/:id',(req,res) => {
  console.log(req.params.id);
  console.log(users)

  res.render('users')
})



module.exports = router;
