const db = require('../connection');


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

module.exports = { addPassword };
