const express = require('express');
const router = express.Router();

const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

const articleDao = require('../models/articles-dao.js');

//A middleware is required to transfer the article being clicked to res.locals

router.get('/displaySingleArticleWithDelta', async function (req, res) {
  const user_id = res.locals.user.id;

  const article = await articleDao.getArticlesByUserID(user_id);
  const content = article[0].content;
  const content_obj = JSON.parse(content);
  const delta_obj = content_obj.ops;

  const cfg = {
    inlineStyles: true,
    multiLineBlockquote: true,
    multiLineHeader: true
  };

  const converter = new QuillDeltaToHtmlConverter(delta_obj, cfg);

  const html = converter.convert();

  res.send(html);

});

module.exports = router;