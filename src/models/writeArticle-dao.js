const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function insertNewArticleToArticleTable(user_id, title, genre, content) {
    const db = await getDatabase();
    
    return await db.run(SQL`
        INSERT INTO articles (title, content, genre, date_of_publish, author_id) VALUES 
        (${title}, ${content}, ${genre}, datetime('now'), ${user_id})`);
}

module.exports = {
    insertNewArticleToArticleTable
}