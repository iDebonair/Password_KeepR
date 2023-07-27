const express = require('express');
const router = express.Router();
const { addPassword } = require('../public/scripts/app');


// GET - show the form to add a new password
router.get('/passwords/new', (req, res) => {
  res.render('addPasswordForm');
});

// POST - submit new password
router.post('/password', (req, res) => {
  // Extract the necessary data from the request body
  const newAppPassword = {
    appName: req.body.appName,
    password: req.body.password,
    categoryName: req.body.categoryName,
    loggedInUserId: req.session.user_id
  };

  // Call the passwordController to add the password to the database
  addPassword(newAppPassword)
    .then(password => {
      res.redirect('/signin');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error adding password');
    });
});

module.exports = router;