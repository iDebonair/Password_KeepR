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
router.use(
  cookieSession({
    name: "session",
    keys: ["aj345", "dfh345"],
    // Cookie Options
    //maxAge: 24 * 60 * 60 * 1000 expire 24 hours
  })
);
const users = require('../db/queries/users');
router.get('/', (req, res) => {

  res.render('users');
}); 

router.get('/signin/:id',(req,res) => {
 
  console.log(req.params.id);
  const user_id = req.params.id
  req.session.user_id = user_id;
  console.log(req.session.user_id);
  const templateVars = {
    user: user_id,
  };
  console.log(user_id);
  res.render('users',templateVars)
});
router.get('/signin/',(req,res) => {
  req.session = null;
  const templateVars = {
    user: req.session,
  };
  res.render('users',templateVars)
})




module.exports = router;
