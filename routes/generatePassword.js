const express = require('express');
const router = express.Router();
const { generatePassword } = require('../public/scripts/app');

// Route to display the password generation form
router.get('/generatepassword', (req, res) => {
  res.render('generatePasswordForm', { password : null});
});

module.exports = router;