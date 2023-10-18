// General queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getArticlesByTitleForSearch(title){
    console.log(title) 
    if(title == ""){
        return undefined
    }
    const db = await getDatabase();
    const titleSearch = `%${title}%`

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
    const authorSearch = `%${author}%`;

    const articles = await db.all(SQL`
        select * from user
        where fname like ${authorSearch} or lname like ${authorSearch}
    `)
    return articles
}

async function getArticlesBySingleDate(date){
    const db = await getDatabase();
    const dateS = `${date}`
    const articles = await db.all(SQL`
        SELECT articles.title, comments_count, date(articles.date_of_publish) as date from Articles_info left join articles on Articles_info.article_id = articles.id
        where date = ${dateS}
    `)
    return articles
}

module.exports = {
    getArticlesByTitleForSearch,
    getArticlesByAuthorNameForSearch,
    getArticlesBySingleDate
}