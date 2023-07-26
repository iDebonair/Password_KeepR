const express = require('express');
const router = express.Router();
const passwordController = require('../db/queries/users');


// GET - show the form to add a new password
router.get('/passwords/new', (req, res) => {
  res.render('addPasswordForm');
});

// POST - submit new password
router.post('/passwords/:id', passwordController.addPassword);



module.exports = router;