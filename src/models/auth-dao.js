// Authentication queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');
const { getAllUserData } = require('./generic-dao.js');
const bcrypt = require('bcrypt');

async function getUserWithCredentials(username, password) {
    const users = await getAllUserData();
    let matchedUser;
    for (user of users) {
        if (
            ((await verifyHashed(username, user.username)) &&
                (await verifyHashed(password, user.password)))
        ) {
            matchedUser = user;
            break;
        }
    }
    return matchedUser;
    // return users.find(async function (user) {
    //     return (
    //         (user.username === username && user.password === password) ||
    //         (await verifyHashed(username, user.username) &&
    //             await verifyHashed(password, user.password))
    //     );
    // });
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

async function setUserDbAuthToken(username, auth_token) {
    const db = await getDatabase();
    const users = await getAllUserData();
    let matchedUser;
    for (user of users) {
        if (
            (await verifyHashed(username, user.username))
        ) {
            matchedUser = user;
            break;
        }
    }
    return await db.run(SQL`
        update user
        set auth_token = ${auth_token}
        where username = ${matchedUser.username}`);
}

async function createNewUser(fname, username, email, password) {
    const db = await getDatabase();
    return await db.run(SQL`
    insert into user (fname, username, password, admin)
    values (${fname}, ${username}, ${password}, 0)`);
}

async function verifyHashed(original, dbData) {
    try {
        if (await bcrypt.compare(original, dbData) ||
        original === dbData) return true; // second conditional is for testing purposes
        return false;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getUserWithCredentials,
    getUserWithAuthToken,
    setUserDbAuthToken,
    createNewUser,
    verifyHashed
};
