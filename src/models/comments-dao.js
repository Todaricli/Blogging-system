const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function getAllCommentsByUserId(userId) {
    const db = await getDatabase();
    const allComments = await db.all(SQL`
    SELECT *
    FROM comments
    WHERE user_id = ${userId};
    `);
    return allComments;
}

async function getAllFirstLevelCommentsByArticleID(articleId) {
    const db = await getDatabase();
    const allFirstLevelComments = await db.all(SQL`
    SELECT comments.*, user.username, user.fname, user.lname
    FROM comments, user
    WHERE comments.article_id = ${articleId}
    AND user.id = comments.user_id
    AND comments.comments_id IS NULL
    `);

    return allFirstLevelComments;
}

async function getAllSecondOrThirdLevelCommentsByComment_id(comment_id, article_id) {
    const db = await getDatabase();
    const allFirstLevelComments = await db.all(SQL`
    SELECT comments.*, user.username, user.fname, user.lname
    FROM comments, user
    WHERE comments.article_id = ${article_id}
    AND user.id = comments.user_id
    AND comments.comments_id = ${comment_id}
    `);

    return allFirstLevelComments;
}

async function getCommentAndReplies(articleId) {
    const db = await getDatabase();

    const replies = await db.all(SQL`
    SELECT c.id, c.user_id, c.article_id, c.content, c.time_of_comment, c.comments_id,
    p.content AS parent_content
    FROM comments c
    LEFT JOIN comments p ON c.comments_id = p.id
    WHERE c.article_id = ${articleId};
    `);

    return replies;
}

async function deleteLikesCommnents(commentId) {
    const db = await getDatabase();

    await db.all(SQL`
        DELETE 
        FROM likes_comments
        WHERE comments_id = ${commentId}
    `);
}

async function deleteComments(commentId, articleId) {
    const db = await getDatabase();

    await deleteLikesCommnents(commentId);

    try {
        // Fetch the IDs of replies associated with the comment
        const replyIds = await db.all(SQL`
        SELECT id
        FROM comments
        WHERE comments_id = ${commentId}
        AND article_id = ${articleId}
    `);

        // Delete the associated replies (nested comments)
        for (const reply of replyIds) {
            await deleteComments(reply.id, articleId);
        }

        // Delete the parent comment
        await db.run(SQL`
        DELETE FROM comments
        WHERE id = ${commentId}
        AND article_id = ${articleId}
    `);
    } catch (error) {
        console.error('Error deleting comments:', error);
    }
}

module.exports = {
    getAllFirstLevelCommentsByArticleID,
    getAllSecondOrThirdLevelCommentsByComment_id,
    getAllCommentsByUserId,
    deleteComments,
    getCommentAndReplies,
    deleteLikesCommnents,
};
