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

async function getUserArticles(userId) {
    const db = await getDatabase();
    const allArticles = await db.all(SQL`
    SELECT articles.id AS article_id, articles.title, articles.content, articles.date_of_publish, user.id AS author_id, user.username AS author_username
    FROM articles
    INNER JOIN user ON articles.author_id = user.id
    WHERE user.id = ${userId}
    `);
    return allArticles;
}

async function getUserIdByUsername(username) {
    const db = await getDatabase();
    const testData = await db.get(SQL`
      select id from user
      where username = ${username}`);

    return userId;
}


module.exports = {
    getUserDataById,
    getUserDataByUsername,
    getAllUserData,
    getUserArticles,
    getUserIdByUsername
};

