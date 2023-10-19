// General queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');


//working
async function getArticlesByUserID(userid){
    const db = await getDatabase();

    const article = await db.all(SQL`
    select * from articles
    where author_id = ${userid}
    `)

    return article;
}

async function getAllArticles(){
    const db = await getDatabase();

    const articles = await db.all(SQL`
    select articles.*, user.fname, user.lname, user.icon_path 
    from articles left join user on articles.author_id = user.id
    `);

    return articles;
}

//working
async function getArticlesByID(id){
    const db = await getDatabase();

    const article = await db.all(SQL`
    SELECT * from articles
    where id = ${id};
    `)

    return article;
}

async function getAuthorByArticle(articleId) {
    const db = await getDatabase();

    const author = await db.all(SQL `
    SELECT user.fname AS author_fname, user.lname AS author_lname, user.*
    FROM articles
    INNER JOIN user ON articles.author_id = user.id
    WHERE articles.id = ${articleId};
    `)

    return author;
}

//working
async function getTopFiveArticles(){
    const db = await getDatabase();

    const article = await db.all(SQL`
    select articles.*, COUNT(user_id) as like_count
    from articles left join likes on articles.id = likes.article_id
    GROUP by article_id
    order by like_count desc
    limit 5
    `)

    return article;
}

//this one not working yet, not sure how you wanna do the date input, cos need to convert the date column matching format.
async function getAllArticlesByPublishDate(date){
    const db = await getDatabase();

    const articles = await db.all(SQL`
    select * from articles
    where date_of_publish =${date};
    `)

    return articles
}

//working
async function getAllArticlesByUsername(username){
    const db = await getDatabase();

    const article = await db.all(SQL`
    select articles.* from articles left join user on articles.author_id =user.id
    where user.username like ${username};
    `)
    return article
}


//working
async function getAllArticlesByTitle(title){
    const db = await getDatabase();

    const articles = await db.all(SQL`
    select * from articles
    where date_of_publish like ${title};
    `)

    return articles
}

//working
async function getAllArticlesSortedByPublishDate(){
    const db = await getDatabase();

    const articles = await db.all(SQL`
    select * from  articles 
    order by date_of_publish
    `)

    return articles
}

//working
async function getAllArticlesSortedByUsername(){
    const db = await getDatabase();

    const articles = await db.all(SQL`
    select articles.* from articles left join user on articles.author_id =user.id
    order by username
    `)

    return articles
}

//working
async function getAllArticlesSortedByTitle(){
    const db = await getDatabase();

    const articles = await db.all(SQL`
    select * from articles
    order by title
    `)

    return articles
}

async function getAllCommentsFromArticle(articleId) {
    const db = await getDatabase();

    const comments = await db.all(SQL `
    select * from comments 
    where article_id = ${articleId}
    `)

    return comments;
}

async function insertNewArticleToArticleTable(user_id, title, genre, content_html, content_delta, image) {
    const db = await getDatabase();
    
    return await db.run(SQL`
        INSERT INTO articles (title, content_html, content_delta, genre, image, date_of_publish, author_id) VALUES 
        (${title}, ${content_html}, ${content_delta}, ${genre}, ${image}, datetime('now'), ${user_id})`);
}

async function insertNewArticleToArticleTableWithoutImage(user_id, title, genre, content_html, content_delta) {
    const db = await getDatabase();
    
    return await db.run(SQL`
        INSERT INTO articles (title, content_html, content_delta, genre, date_of_publish, author_id) VALUES 
        (${title}, ${content_html}, ${content_delta}, ${genre}, datetime('now'), ${user_id})`);
}

async function updateArticleToArticleTable(article_id, title, genre, content_html, content_delta, image) {
    const db = await getDatabase();

    return await db.run(SQL`
        UPDATE articles 
        SET title = ${title}, genre = ${genre}, content_html = ${content_html}, content_delta = ${content_delta}, image = ${image}, date_of_publish = datetime('now')
        WHERE id = ${article_id}`);
}

async function updateArticleToArticleTableWithoutImage(article_id, title, genre, content_html, content_delta) {
    const db = await getDatabase();

    return await db.run(SQL`
        UPDATE articles 
        SET title = ${title}, genre = ${genre}, content_html = ${content_html}, content_delta = ${content_delta}, date_of_publish = datetime('now')
        WHERE id = ${article_id}`);
}

async function filterArticlesBySelectedDates(startDate, endDate) {
    const db = await getDatabase();

    const articles = await db.all(SQL `
        select articles.*, user.*
        from articles 
        inner join user on articles.author_id = user.id
        where date_of_publish >= ${startDate} and date_of_publish <= ${endDate}
    `)
    return articles;
}

async function getArticleTitleById(articleId) {
    const db = await getDatabase();

    const title = await db.all(SQL `
    select title
    from articles
    where id = ${articleId}
    `)

    console.log(title);
    return title;
}

async function getAuthorIdByArticleId(articleId) {
    const db = await getDatabase();

    const authorId = await db.all(SQL `
    SELECT articles.author_id
    FROM articles
    WHERE articles.id = ${articleId};
    `)

    return authorId;
}
async function deleteArticle(article_id){
    const db = await getDatabase();

    const article = await db.run(SQL`
    DELETE from articles
    where id = ${article_id}
    `)
}

async function filterArticlesByGenre(genre) {
    const db = await getDatabase();
    const genre1 = `${genre}`

    const articles = await db.all(SQL `
    select articles.*, user.*
    from articles
    inner join user on articles.author_id = user.id
    where genre like ${genre1}
    `)

    return articles;
}
module.exports = {
    getArticlesByUserID,
    getArticlesByID,
    getTopFiveArticles,
    getAllArticlesByUsername,
    getAllArticlesByTitle,
    getAllArticlesSortedByPublishDate,
    getAllArticlesSortedByUsername,
    getAllArticlesSortedByTitle,
    getAllArticlesByPublishDate,
    getAllArticles,
    getAllCommentsFromArticle,
    getAuthorByArticle,
    insertNewArticleToArticleTable,
    updateArticleToArticleTable,
    filterArticlesBySelectedDates,
    getArticleTitleById,
    getAuthorIdByArticleId,
    updateArticleToArticleTable,
    updateArticleToArticleTableWithoutImage,
    insertNewArticleToArticleTableWithoutImage,
    filterArticlesByGenre,
    deleteArticle
};