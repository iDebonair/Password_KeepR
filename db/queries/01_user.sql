--SELECT  users.id as id, users.name as name, passwords.password FROM users
--JOIN passwords ON users.id = passwords.user_id
--JOIN organizations ON organizations.id = passwords.organization_id
--JOIN categories ON categories.id = passwords.categories_id
SELECT * FROM passwords

