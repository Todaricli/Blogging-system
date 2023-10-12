// General queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');
const { getAllUserData } = require('./generic-dao.js');

async function getNumFollowers(user_id) {
    const db = getDatabase()

    const numFollowers = db.all(SQL`
    select count(being_subscribed_id) as counts from subscription 
    where being_subscribed_id = ${user_id}
    `)

    return numFollowers

}

async function getTotalLikes(id) {
    const db = getDatabase();

    const numLikes = db.all(SQL`
    select count(id) as counts from likes 
    where user_id = ${id}
    `)

    return numLikes;
}

async function getNumberOfComments(user_id){
    const db = getDatabase();

    const numOfComments = db.all(SQL`
    select count(id) as counts from comments 
    where user_id = ${user_id}
    `)

    return numOfComments
}

async function getMostPopularArticles(user_id){
    const db = getDatabase();
    
    const mostPopular = db.all(SQL`
    select user.*, article_id,title,date_of_publish, comment_count, like_count, popularity 
        from user left join (
        select articles.id as article_id, title,date_of_publish, comment_count, like_count, author_id, ((comment_count*2)+like_count) as popularity 
        from articles left join (
            select article_id, count(likes.id) as like_count from articles left join likes on articles.id = likes.article_id
            group by articles.id
            )
        on articles.id = article_id
        left join (
        select articles.id as art_id, count(comments.id) as comment_count from articles left join comments on articles.id = comments.article_id
        group by articles.id) on articles.id = art_id
        ) on user.id = author_id
    where user.id = ${user_id}
    limit 3
    `)

    return mostPopular;
}

module.exports ={
    getNumFollowers,
    getNumberOfComments,
    getTotalLikes,
    getMostPopularArticles
}