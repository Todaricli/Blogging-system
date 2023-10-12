const express = require('express');
const router = express.Router();

const articlesDao = require('../../models/articles-dao');

router.get('/api/get-all-articles-from-db', async function (req, res) {
  const allArticles = await articlesDao.getAllArticles();
  res.json(allArticles);
});

router.get('/api/get-top5-articles-from-db', async function (req, res) {
  const top5Articles = await articlesDao.getTopFiveArticles();
  res.json(top5Articles);
});

router.get('/api/get-article-by-id', async function (req, res) {
  const id  = req.query.id;
  const article = await articlesDao.getArticlesByID(id);
  res.json(article);
});

// router.get('/api/render-full-article', async function (req, res) {
//   const article = req.query.article;
//   console.log(article);
//   res.locals.article = article;
//   res.render("article");
// });

module.exports = router;