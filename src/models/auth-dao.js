// this is for authentication queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getUserDataById(id) {
    const db = await getDatabase();
    const testData = await db.get(SQL`
        select * from user
        where id = ${id}`);

    return testData;
}

async function getAllUserData() {
    const db = await getDatabase();
    const allTestData = await db.all(SQL`select * from user`);
    return allTestData;
}

async function getUserWithCredentials(username, password) {
    const users = await getAllUserData();
    return users.find(function (user) {
        return user.username === username && user.password === password;
    });
}

async function getUserWithAuthToken(authToken) {
    const users = await getAllUserData();
    if (!authToken) {
        return undefined;
    }
    return users.find(function (user) {
        return user.authtoken === authToken;
    });
}

async function setUserAuthToken(username, authToken) {
    const db = await getDatabase();

    return await db.run(SQL`
        update user
        set authtoken = ${authToken}
        where username = ${username}`);
}

async function createNewUser(name, username, email, password) {
    const db = await getDatabase();

    return await db.run(SQL`
        update user
        set authtoken = ${authToken}
        where username = ${username}`);
}

// Export functions.
module.exports = {
    getUserDataById,
    getAllUserData,
    getUserWithCredentials,
    getUserWithAuthToken,
    setUserAuthToken
};
