const express = require('express');
const router = express.Router();

const testDao = require('../models/test-dao.js');
const writeArticleDao = require('../models/writeArticle-dao.js');

// router.get('/', async function (req, res) {
//     res.locals.title = 'My route title!';
//     res.locals.allTestData = await testDao.retrieveAllTestData();
//     res.render('home');
// });
const { verifyAuthenticated } = require('../middleware/auth-middleware/login-auth.js');

router.get('/', verifyAuthenticated, async function (req, res) {
    //res.locals.current_category = "Marketing";
    res.render('articlesHome');
});

router.get('/article', async function (req, res) {
    res.render('articleDemo');
});

router.get('/sub', function (req,res) {
    res.render('subscription&subscriber');
})

router.get('/profile', function (req,res) {
    res.render('profile');
})

router.get("/writeArticle", function(req, res) {
    res.render("writeArticle");
})

router.post("/postNewArticle", function(req, res) {
    const newArticle = req.body;

    const user_id = res.locals.user.id;
    const title = newArticle.titleKey;
    const genre = newArticle.genreKey;
    const content = newArticle.contentKey;

    console.log(user_id);
    console.log(title);
    console.log(genre);
    console.log(content);
    
    let done = undefined;
    done = writeArticleDao.insertNewArticleToArticleTable(user_id, title, genre, content);

    if(done) {
        res.setToastMessage("New Article created!");
    } else {
        res.setToastMessage("Submitting error, try again!");
    }
    
    res.redirect('/writeArticle');
})

module.exports = router;
