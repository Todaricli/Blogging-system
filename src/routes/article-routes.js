const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');

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
    const delta_obj_string = JSON.stringify(delta_obj);

    const cfg = {
      inlineStyles: true,
      multiLineBlockquote: true,
      multiLineHeader: true
    };

    const converter = new QuillDeltaToHtmlConverter(delta_obj, cfg);

    const html = converter.convert();

    let done = undefined;
    done = await articleDao.insertNewArticleToArticleTable(user_id, title, genre, html, delta_obj_string);

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

router.get("/editArticle/:id", async (req, res) => {
  const article_id = req.params.id;

  res.locals.article_id = article_id


  res.render("editArticle");
});

router.get('/api/currentEditArticleDelta', async (req, res) => {
  const article_id = req.query.article_id;
  console.log("Article_id: " + article_id);
  const article = await articleDao.getArticlesByID(article_id);
  console.log(article);
  if(article) {
    res.status(200).json(article);
  } else {
    res.status(404).send("Article loading error, please try again");
  }
});

router.post("/api/updateArticle", async function (req, res) {
  const updateArticle = req.body;

  const article_id = updateArticle.article_idKey;
  const title = updateArticle.titleKey;
  const genre = updateArticle.genreKey;
  const content = updateArticle.contentKey;

  try {
    const content_obj = JSON.parse(content);
    const delta_obj = content_obj.ops;
    const delta_obj_string = JSON.stringify(delta_obj);

    const cfg = {
      inlineStyles: true,
      multiLineBlockquote: true,
      multiLineHeader: true
    };

    const converter = new QuillDeltaToHtmlConverter(delta_obj, cfg);

    const html = converter.convert();

    let done = undefined;
    done = await articleDao.updateArticleToArticleTable(article_id, title, genre, html, delta_obj_string);

    if (done) {
      res.status(200).send("Article updated");
    }

  } catch (e) {
    res.status(404).send("Publishing error, try again!");
  }

});

module.exports = router;