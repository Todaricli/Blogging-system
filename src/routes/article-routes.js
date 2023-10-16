const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const writeArticleDao = require('../models/writeArticle-dao.js');
const commentDao = require('../models/comments-dao.js');
const { generateComments } = require('../middleware/comments.js');
const comment = require('../middleware/comments.js')

const QuillDeltaToHtmlConverter =
    require('quill-delta-to-html').QuillDeltaToHtmlConverter;

router.get('/writeArticle', function (req, res) {
    res.render('writeArticle');
});

router.post('/api/postNewArticle', async function (req, res) {
    const newArticle = req.body;

    const user_id = res.locals.user.id;
    const title = newArticle.titleKey;
    const genre = newArticle.genreKey;
    const content = newArticle.contentKey;

    let done = undefined;
    done = await writeArticleDao.insertNewArticleToArticleTable(
        user_id,
        title,
        genre,
        content
    );

    if (done) {
        res.status(200).send('New Article Created!');
    } else {
        res.status(404).send('Publishing error, try again!');
    }
});

//A middleware is required to transfer the article being clicked to res.locals

router.get('/displaySingleArticleWithDelta', async function (req, res) {
    const user_id = res.locals.user.id;

    const article = await articleDao.getArticlesByUserID(user_id);
    const index = article.length - 1;
    const content = article[index].content;
    const content_obj = JSON.parse(content);
    const delta_obj = content_obj.ops;

    const cfg = {
        inlineStyles: true,
        multiLineBlockquote: true,
        multiLineHeader: true,
    };

    const converter = new QuillDeltaToHtmlConverter(delta_obj, cfg);

    const html = converter.convert();

    res.send(html);
});

router.get('/article/:id', comment.generateComments,async function (req, res) {
    const article_id = req.params.id;

    const article = await articleDao.getArticlesByID(article_id);
    //console.log(article)
    res.locals.article = article;
    const content = article[0].content;

    try {
        const content_obj = JSON.parse(content);

        const delta_obj = content_obj.ops;

        const cfg = {
            inlineStyles: true,
            multiLineBlockquote: true,
            multiLineHeader: true,
        };

        const converter = new QuillDeltaToHtmlConverter(delta_obj, cfg);

        const html = converter.convert();
        res.locals.article_content = html;
    } catch (error) {
        const html = '<p>Article loading error! refresh the page.<p>';
        res.locals.article_content = html;
    }

    const authorName = await articleDao.getAuthorByArticle(article_id);
    //console.log(authorName);
    res.locals.authorName = authorName;
    
    const likeCounts = await articleDao.getNumberOfLikesFromArticle(article_id);
    //console.log(likeCounts);
    res.locals.like_count = likeCounts;

    res.render('articleDemo');
});


module.exports = router;
