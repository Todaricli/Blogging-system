const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getUserDataById(id) {
    const db = await getDatabase();

    const testData = await db.get(SQL`
        select * from test
        where id = ${id}`);

    return testData;
}

async function getAllUserData() {
    const db = await getDatabase();
    const allTestData = await db.all(SQL`select * from test`);
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
        return user.authToken === authToken;
    });
}

// async function updateTestData(testData) {
//     const db = await getDatabase();

//     return await db.run(SQL`
//         update test
//         set stuff = ${testData.stuff}
//         where id = ${testData.id}`);
// }

// async function deleteTestData(id) {
//     const db = await getDatabase();

//     return await db.run(SQL`
//         delete from test
//         where id = ${id}`);
// }

// Export functions.
module.exports = {
    getUserDataById,
    getAllUserData,
    getUserWithCredentials,
};
