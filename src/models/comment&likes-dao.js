const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');
const { getUserIdByUsername } = require('./generic-dao.js');


async function retrieveCommentsByUsername(username) {
    const userId = await getUserIdByUsername(username);
    const db = await getDatabase();
    const commentsData = await db.get(SQL`
        select * from comments
        where user_id = ${userId}`);
    return commentsData;
}

async function retrieveCommentsByArticle_ID(articleId) {
    const db = await getDatabase();
    const commentsData = await db.get(SQL`
        select * from comments
        where article_id = ${articleId}`);
    return commentsData;
}

async function retrieveNumsOfLikesByArticle_ID(articleId) {
    const db = await getDatabase();
    const likesData = await db.get(SQL`
        select * from likes
        where article_id = ${articleId}`);
    const likesNum = await likesData.get(SQL`
        select count (*) from likesData
        `);
    return likesNum;
}

async function retrieveNumsOfCommentsByArticle_ID(articleId) {
    const commentsData = await retrieveCommentsByArticle_ID(articleId);
    const commentsNum = await commentsData.get(SQL`
        select count (*) from commentsData
        `);
    return commentsNum;
}

module.exports = {
    retrieveCommentsByUsername,
    retrieveCommentsByArticle_ID,
    retrieveNumsOfLikesByArticle_ID,
    retrieveNumsOfCommentsByArticle_ID
}