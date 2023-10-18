const express = require('express');
const router = express.Router();

const commentDao = require('../../models/comments-dao.js');

router.post('/api/addComment', async function (req, res) {
    try {
        const user_id = res.locals.user.id;
        console.log(user_id);
        const comment = req.body;
        console.log(comment);
        const content = comment.contentKey;
        const comment_id = comment.comment_idKey;
        const article_id = comment.article_idKey;

        let done = undefined;

        if (!comment_id) {
            done = await commentDao.insertNewCommentOnArticle(user_id, article_id, content);
            if (!done) {
                throw new Error("Comment submitting failed, please try again.")
            }
            const comment_id = done.lastID;

            const newComment = await commentDao.getCommentById(comment_id);
            console.log(newComment);

            res.status(200).json(newComment);
        } else {

            console.log('inside');
            done = await commentDao.insertNewCommentOnComment(user_id, article_id, content, comment_id);

            if (!done) {
                throw new Error("Comment submitting failed, please try again.")
            }

            console.log(done);

            const new_comment_id = done.lastID;
            console.log(new_comment_id);

            const newComment = await commentDao.getCommentById(new_comment_id);

            res.status(200).json(newComment);
        }

    } catch (e) {
        res.status(404).json(e);
    }
})

router.post("/api/deleteComment", async function (req, res) {
    const comment = req.body;
    const comment_id = comment.comment_idKey;
    const article_id = comment.article_idKey;
    console.log(comment);
    try {
        let done = undefined;

        done = await commentDao.deleteThisComment(comment_id, article_id);
        console.log(done);

        if (!done) {
            throw new Error("Comment deleting failed, please try again");
        }

        res.status(200).send("Comment deleted")

    } catch (e) {
        res.status(404).send(e + "what the fuck is going on");
    }

})

module.exports = router;