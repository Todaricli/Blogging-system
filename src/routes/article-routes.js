const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const writeArticleDao = require('../models/writeArticle-dao.js');

const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

router.get("/writeArticle", function (req, res) {
  res.render("writeArticle");
})

router.post("/api/postNewArticle", async function (req, res) {
  const newArticle = req.body;

  const user_id = res.locals.user.id;
  const title = newArticle.titleKey;
  const genre = newArticle.genreKey;
  const content = newArticle.contentKey;

  try {
    const content_obj = JSON.parse(content);
    const delta_obj = content_obj.ops;

    const cfg = {
      inlineStyles: true,
      multiLineBlockquote: true,
      multiLineHeader: true
    };

    const converter = new QuillDeltaToHtmlConverter(delta_obj, cfg);

    const html = converter.convert();

    let done = undefined;
    done = await writeArticleDao.insertNewArticleToArticleTable(user_id, title, genre, html);

    if (done) {
      res.status(200).send("New Article Created!");
    }
  } catch (e) {
    res.status(404).send("Publishing error, try again!");
  }

});

router.get('/article/:id', async function (req, res) {
  const article_id = req.params.id;

  const article = await articleDao.getArticlesByID(article_id);
  const articleId = article[0].id;

  try {

    res.locals.article = article;

    const authorName = await articleDao.getAuthorByArticle(articleId);
    res.locals.authorName = authorName;

    const comments = await articleDao.getAllCommentsFromArticle(articleId);
    res.locals.comments = comments;

    const likeCounts = await articleDao.getNumberOfLikesFromArticle(articleId);
    res.locals.like_count = likeCounts

  } catch (error) {
    const html = "<p>Article loading error! refresh the page.<p>"
    res.locals.article_content = html;
  }

  res.render("articleDemo");

});

module.exports = router;