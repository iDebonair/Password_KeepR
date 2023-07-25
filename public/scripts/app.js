// Client facing scripts here
// add new password to database
function addPassword(newPassword) {
  return db
    .query(`
  INSERT INTO passwords (user_id, password, organization_id, categories_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `, [newPassword.user_id, newPassword.password, newPassword.organization_id, newPassword.categories_id])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
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


module.exports = { addPassword, generatePassword };