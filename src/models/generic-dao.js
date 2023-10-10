// General queries with the database
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
    const allData = await db.all(SQL`select * from user`);
    return allData;
}

module.exports = {
    getUserDataById,
    getAllUserData,
};
