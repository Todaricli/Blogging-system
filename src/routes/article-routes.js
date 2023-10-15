const express = require('express');
const router = express.Router();
const articleDao = require('../models/articles-dao.js');
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const uploadTempFolder = require("../middleware/multer-uploader.js");
const fs = require("fs");
const jimp = require("jimp");


router.get("/writeArticle", function (req, res) {
  res.render("writeArticle");
})

router.post("/api/postNewArticle", uploadTempFolder.single("imageKey"), async function (req, res) {
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

    //Get article image
    const fileInfo = req.file;
    const imagePath = "user"+ user_id + "-" + fileInfo.originalname;
    console.log(imagePath);
    // Move the image into the images folder
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/article-images/${imagePath}`;
    fs.renameSync(oldFileName, newFileName);

    // TODO Create and save thumbnail
    const image = await jimp.read(newFileName);
    image.resize(320, jimp.AUTO);
    image.fade(0.5);
    image.sepia();
    const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
    let name = fileInfo.originalname.substring(0, fileInfo.originalname.lastIndexOf("."));
    name = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    image.print(font, 10, 10, name);

    await image.write(`./public/images/article-images/thumbnails/${imagePath}`);

    let done = undefined;
    done = await articleDao.insertNewArticleToArticleTable(user_id, title, genre, html, delta_obj_string, imagePath);

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
  const article = await articleDao.getArticlesByID(article_id);

  if(article) {
    res.status(200).json(article);
  } else {
    res.status(404).send("Article loading error, please try again");
  }
});

router.post("/api/updateArticle", uploadTempFolder.single("imageKey"), async function (req, res) {
  const updateArticle = req.body;
  const user_id = res.locals.user.id;

  const article_id = updateArticle.article_id_key;
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

    //Get article image
    const fileInfo = req.file;
    const imagePath = "user"+ user_id + "-" + fileInfo.originalname;
    // Move the image into the images folder
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/article-images/${imagePath}`;
    fs.renameSync(oldFileName, newFileName);

    //Create and save thumbnail
    const image = await jimp.read(newFileName);
    image.resize(320, jimp.AUTO);
    image.fade(0.5);
    image.sepia();
    const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
    let name = fileInfo.originalname.substring(0, fileInfo.originalname.lastIndexOf("."));
    name = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    image.print(font, 10, 10, name);

    await image.write(`./public/images/article-images/thumbnails/${imagePath}`);

    let done = undefined;
    done = await articleDao.updateArticleToArticleTable(article_id, title, genre, html, delta_obj_string, imagePath);

    if (done) {
      res.status(200).send("Article updated");
    }

  } catch (e) {
    res.status(404).send("Publishing error, try again!");
  }

});

router.post("/articleImage", uploadTempFolder.single())

module.exports = router;