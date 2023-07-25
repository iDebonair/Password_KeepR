const express = require('express');
const app = express();
const path = require('path');

// ... (other middleware and configurations)

// GET route to render the edit_passwords.ejs form
app.get('/passwords/:id', (req, res) => {
  // fetch the password details by ID from your database
  const passwordId = req.params.id;
  const password = getPasswordById(passwordId); // To be replaced with the right function from sign on

  // Pass the password object to the template
  res.render('editPassword', { password });
});

// POST route to handle form submission
app.post('/passwords/:id/edit', async (req, res) => {
  try {
    const passwordId = req.params.id;
    const { website, username, password } = req.body;
    await updatePasswordInDatabase(passwordId, { website, username, password }); // Replace updatePasswordInDatabase with your actual function

    res.redirect(`/passwords/${passwordId}`);
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const passwords = {};

app.post('/passwords/:id/delete', (req, res) => {
  const passwordId = req.params.id;
  const password = passwords[passwordId];
  const userId = req.session.user_id;

  // Check if the user is logged in
  if (!userId) {
    res.status(401).end("Please log in to view the page");
    } else {
        delete password;
        res.redirect("/passwords");
      }
});



module.exports = app;
