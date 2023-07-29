const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const { get } = require('./users');
const { Console } = require('console');

// Create a new pool instance
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'midterms',
  password: 'password',
  port: 5432,
});

// Define the getPasswordById function
async function getPasswordById(passwordId) {
  try {
    // Use the pool to query the database
    const query =
    `SELECT * FROM passwords
      JOIN apps ON passwords.categories_id = apps.categories_id
      WHERE passwords.id = $1`;
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

async function updatePasswordInDatabase(passwordId, updatedPassword) {
  try {
    const { password } = updatedPassword;

    const updateQuery = `
      UPDATE passwords
      SET password = $1
      WHERE id = $2;
    `;
    const updatedValues = [password, passwordId];
    await pool.query(updateQuery, updatedValues);
  } catch (error) {
    throw new Error(`Error updating password: ${error.message}`);
  }
}

async function deletePassword(passwordId) {
  try {
    const query = 'DELETE FROM passwords WHERE id = $1';
    const values = [passwordId];

   let result = await pool.query(query, values)
   return result;
  } catch (error) {
    throw new Error(`Error deleting password: ${error.message}`);
  }
}

const router = express.Router();

router.get('/:id/edit', async (req, res) => {
  const passwordId = req.params.id;
  try {
    // Fetch the existing password details from the database based on the passwordId
    const {password} = await getPasswordById(passwordId);
    res.render('editPassword', { password, passwordId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching password details');
  }
});
// POST - submit new password
router.post('/:id', async(req, res) => {
  const passwordId = req.params.id;
  // Extract the necessary data from the request body
  const updatedPassword = {
    password: req.body.password
  };
  try {
    // Call the function to update the password in the database
    await updatePasswordInDatabase(passwordId, updatedPassword);
    res.redirect('/signin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating password');
  }
});


router.post('/:id/delete', (req, res) => {
  const passwordId = req.params.id;


  // Call the passwordController to delete the password from the database
  deletePassword(passwordId)
    .then((result) => {
      res.redirect('/signin');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error deleting password');
    });
});


module.exports = router;
