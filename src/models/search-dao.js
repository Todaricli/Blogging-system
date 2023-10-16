// General queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getArticlesByTitleForSearch(title){
    console.log(title) 
    if(title == ""){
        return undefined
    }
    const db = await getDatabase();
    const titleSearch = `${title}%`

    const articles = await db.all(SQL`
        select * from Articles_info
        where title like ${titleSearch}
    `)
    return articles
}

async function getArticlesByAuthorNameForSearch(author){

    console.log(author)
    if(author == ""){
        return undefined
    }
    const db = await getDatabase();
    const authorSearch = `${author}%`;

    const articles = await db.all(SQL`
        select * from user
        where fname like ${authorSearch} or lname like ${authorSearch}
    `)
    return articles
}

module.exports = {
    getArticlesByTitleForSearch,
    getArticlesByAuthorNameForSearch
}