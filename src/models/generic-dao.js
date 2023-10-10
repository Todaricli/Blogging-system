// General queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getUserDataById(id) {
    const db = await getDatabase();
    const userData = await db.get(SQL`
    select * from user
    where id = ${id}`);
    return userData;
}

async function getUserDataByUsername(username) {
    const db = await getDatabase();
    const userData = await db.get(SQL`
    select * from user
    where username = ${username}`);
    return userData;
}

async function getAllUserData() {
    const db = await getDatabase();
    const allData = await db.all(SQL`select * from user`);
    return allData;
}

module.exports = {
    getUserDataById,
    getUserDataByUsername,
    getAllUserData,
};
