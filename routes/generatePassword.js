const express = require('express');
const router = express.Router();
const generatePassword = require('../db/queries/users')

router.get('/generatepassword', (req, res) => {
  res.render('generatePasswordForm');
});

router.post('/generatepassword', (req, res) => {

  const passwordOptions = {
    length: parseInt(req.body.length),
    includeLowercase: req.body.includeLowercase === 'on',
    includeUppercase: req.body.includeUppercase === 'on',
    includeNumbers: req.body.includeNumbers === 'on',
    includeSymbols: req.body.includeSymbols === 'on',
  };

  // password generator function
  const generatedPassword = generatePassword(passwordOptions);

  res.render('password_generated', { password: generatedPassword });
});

module.exports = router;