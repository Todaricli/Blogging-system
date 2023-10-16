const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const commentDao = require('../models/comments-dao.js');

async function generateComments(req,res,next) {
    const article_id = req.params.id;

    const article = await articleDao.getArticlesByID(article_id);

    //Starting comments and replies - refractoring later
    const comments = await commentDao.getAllCommentsByArticles(article_id);

    const commentsArray = []; //array to keep track of comments and their replies

    //Create a hiearachy for comments and replies
    for (const comment of comments) {
    const commentWithReplies = { ...comment, replies: [] }; //Initialize empty replies array

    if (comment.comments_id === null) { //no replies
        // Top-level comment
        commentsArray.push(commentWithReplies);
    } else {
        // Has replies
        let parentComment = null;

        for (const c of commentsArray) {
            if (c.id === comment.comments_id) {
                parentComment = c;
                break; //exit if parent is found
            }
        }

        if (parentComment) {
            parentComment.replies.push(commentWithReplies)
        }
        console.log(commentsArray)
    }}
    
    res.locals.comments = commentsArray;

    next();
}

module.exports = {
    generateComments
}