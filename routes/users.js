/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");
const passwordController = require('../db/queries/users');
const passwordControl = require('../db/queries/users');
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

  res.render('index');
});


router.get('/', (req, res) => {
  res.render('users');
});





module.exports = router;
