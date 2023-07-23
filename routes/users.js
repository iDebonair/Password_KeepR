/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

// Password Management Routes
router.post('/passwords/:id', async (req, res) => {
  try {
    const id = req.params.id;
   const passwordID = req.params.id;
  } catch (error) {
    console.error('Error adding password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/passwords/:id/edit', (req, res) => {
  res.render('edit_passwords.ejs');
  console.log ("Here is a succesful update", id)
});

module.exports = router;
