// Authentication queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');
const { getAllUserData } = require('./generic-dao.js');

async function getUserWithCredentials(username, password) {
    const users = await getAllUserData();
    return users.find(function (user) {
        return user.username === username && user.password === password;
    });
}

async function getUserWithAuthToken(auth_token) {
    const users = await getAllUserData();
    if (!auth_token) {
        return undefined;
    }
    return users.find(function (user) {
        return user.auth_token === auth_token;
    });
}

async function setUserAuthToken(username, auth_token) {
    const db = await getDatabase();

    return await db.run(SQL`
        update user
        set auth_token = ${auth_token}
        where username = ${username}`);
}

async function createNewUser(fname, username, email, password) {
    const db = await getDatabase();
    return await db.run(SQL`
    insert into user (fname, username, password, admin)
    values (${fname}, ${username}, ${password}, 0)`);
}

// Export functions.
module.exports = {
    getUserWithCredentials,
    getUserWithAuthToken,
    setUserAuthToken,
    createNewUser,
};
