const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const writeArticleDao = require('../models/writeArticle-dao.js');

const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

router.get("/writeArticle", function(req, res) {
    res.render("writeArticle");
})

router.post("/postNewArticle", async function(req, res) {
    const newArticle = req.body;

    const user_id = res.locals.user.id;
    const title = newArticle.titleKey;
    const genre = newArticle.genreKey;
    const content = newArticle.contentKey;
    
    console.log(content);
    
    let done = undefined;
    done = await writeArticleDao.insertNewArticleToArticleTable(user_id, title, genre, content);

    if(done) {
        res.setToastMessage("New Article created!");
    } else {
        res.setToastMessage("Submitting error, try again!");
    }
    
    res.redirect("/writeArticle");
})

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
    multiLineHeader: true
  };

  const converter = new QuillDeltaToHtmlConverter(delta_obj, cfg);

  const html = converter.convert();

  res.send(html);

});

module.exports = router;