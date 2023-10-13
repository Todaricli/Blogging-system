const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getRepliesOfComment(commentId) {
    const db = await getDatabase();

    const replies = await db.all(SQL `
    select * 
    from comments 
    where comments_id = ${commentId}
    `)

    return replies;
}

// async function addRepliesToComment(commentId, userId, articleId, ) {
//     const db = await getDatabase();

//     const replies = await db.all(SQL `
    
//     `)
// }







module.exports = {
    getRepliesOfComment
}