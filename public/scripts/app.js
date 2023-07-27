// Client facing scripts here
// add new password to database

const db = require('/home/labber/password_keepr/db/connection');

// Function to add a new password to the database
async function addPassword(newPasswordData, loggedInUserName) {
  const { appName, password, categoryName } = newPasswordData;

  
  try {
    // Get the user_id from the users table based on the logged-in user's name
    const userQuery = `
      SELECT id, organization_id FROM users WHERE name = $1;
    `;
    const userResult = await db.query(userQuery, [loggedInUserName]);
    const user = userResult.rows[0];

    if (!user) {
      throw new Error('User not found');
    }

    // Insert appName into the apps table and obtain the app_id
    const appInsertQuery = `
      INSERT INTO apps (name, categories_id)
      VALUES ($1, (SELECT id FROM categories WHERE name = $2))
      RETURNING id;
    `;
    const appInsertValues = [appName, categoryName];
    const appInsertResult = await db.query(appInsertQuery, appInsertValues);
    const appId = appInsertResult.rows[0].id;

    // Insert the new password into the passwords table
    const passwordInsertQuery = `
      INSERT INTO passwords (user_id, password, organization_id, categories_id)
      VALUES ($1, $2, $3, (SELECT id FROM categories WHERE name = $4))
      RETURNING *;
    `;
    const passwordInsertValues = [user.id, password, user.organization_id, categoryName];
    const passwordInsertResult = await db.query(passwordInsertQuery, passwordInsertValues);

    return passwordInsertResult.rows[0];
  } catch (error) {
    throw error;
  }
}

// function to generate random password
function generatePassword(options) {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

  let allChars = '';

  if (options.includeLowercase) allChars += lowercaseChars;
  if (options.includeUppercase) allChars += uppercaseChars;
  if (options.includeNumbers) allChars += numberChars;
  if (options.includeSymbols) allChars += symbolChars;

  if (!allChars) {
    throw new Error('Must include at least one character type.');
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

