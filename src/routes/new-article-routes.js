const express = require('express');
const router = express.Router();

const writeArticleDao = require('../models/writeArticle-dao.js');

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

module.exports = router;