// General queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getArticlesByTitleForSearch(title){
    console.log(title) 
    const db = await getDatabase();

    const articles = await db.all(SQL`
        select * from Articles_info
        where title like "s%"
    `)
    return articles
}

async function getArticlesByAuthorNameForSearch(author){

    console.log(author)
    const db = await getDatabase();

    const articles = await db.all(SQL`
        select * from user
        where fname like "a%" or lname like "a%"
    `)
    return articles
}

module.exports = {
    getArticlesByTitleForSearch,
    getArticlesByAuthorNameForSearch
}