const express = require('express');
const router = express.Router();
const { generatePassword } = require('../public/scripts/app');

// Route to display the password generation form
router.get('/generatepassword', (req, res) => {
  res.render('generatePasswordForm', { password : null});
});

// POST - Generate the password
router.post('/generatepassword', (req, res) => {
  const passwordOptions = {
    length: parseInt(req.body.length),
    includeLowercase: req.body.includeLowercase === 'on',
    includeUppercase: req.body.includeUppercase === 'on',
    includeNumbers: req.body.includeNumbers === 'on',
    includeSymbols: req.body.includeSymbols === 'on',
  };

  try {
    const password = generatePassword(passwordOptions);
    console.log('Generated Password:', password);
    res.render('generatePasswordForm', { password });
  } catch (error) {
    res.status(400).render('generatePasswordForm', { error: error.message, password: '' });
  }
});


module.exports = router;