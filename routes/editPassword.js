const express = require('express');
const app = express();
const path = require('path');
const { Pool } = require('pg');
const { get } = require('./users');
// ... (other middleware and configurations)

// Create a new pool instance
const pool = new Pool({
  user: 'salima',
  host: 'localhost',
  database: 'passwords',
  password: 'password',
  port: 5432,
});

// Define the getPasswordById function
async function getPasswordById(passwordId) {
  try {
    // Use the pool to query the database
    const query = 'SELECT * FROM passwords WHERE id = $1';
    const values = [passwordId];
    const result = await pool.query(query, values);

    // Check if the password with the provided ID exists in the database
    if (result.rows.length === 0) {
      throw new Error(`Password with ID ${passwordId} not found.`);
    }

    return result.rows[0];
  } catch (error) {
    throw new Error(`Error fetching password: ${error.message}`);
  }
}

// GET route to render the edit_passwords.ejs form
app.get('/passwords/edit', (req, res) => {
  // fetch the password details by ID from database
  const passwordId = req.params.id;
  const password = getPasswordById(passwordId);

  // Pass the password object to the template
  res.render('editPassword', { password });
});

// POST route to handle form submission
app.post('/passwords/:id/edit', async (req, res) => {
  try {
    const passwordId = req.params.id;
    const { website, username, password } = req.body;
    await updatePasswordInDatabase(passwordId, { website, username, password });

    res.redirect(`/passwords/${passwordId}`);
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const passwords = {};

app.post('/passwords/:id/delete', (req, res) => {
  const passwordId = req.params.id;
  const password = getPasswordById[passwordId];
  const userId = req.session.user_id;

  // Check if the user is logged in
  if (!userId) {
    res.status(401).end("Please log in to view the page");
    } else {
        delete password;
        res.redirect("/passwords");
      }
});


module.exports = app, getPasswordById;
