const express = require('express');
const router = express.Router();

const testDao = require('../models/test-dao.js');
const articleDao = require('../models/articles-dao.js');
const genericDao = require('../models/generic-dao.js');

const writeArticleDao = require('../models/writeArticle-dao.js');

// router.get('/', async function (req, res) {
//     res.locals.title = 'My route title!';
//     res.locals.allTestData = await testDao.retrieveAllTestData();
//     res.render('home');
// });
const { verifyAuthenticated } = require('../middleware/auth-middleware/login-auth.js');
const { getUserArticles, getAllCommentsByArticles, getUserNameByComment } = require('../models/generic-dao.js');

router.get('/', verifyAuthenticated, async function (req, res) {
    //res.locals.current_category = "Marketing";

    // const username = 
    // res.locals.user = 

    res.locals.top5Articles = await articleDao.getTopFiveArticles();

    res.locals.articleData = await articleDao.getAllArticles();
    // res.locals.
    // res.locals.
    // res.locals.


    res.render('articlesHome');
});

router.get('/article', async function (req, res) {

    // res.locals. =



    res.render('articleDemo');
});

router.get('/sub', function (req,res) {
    res.render('subscription&subscriber');
})

router.get('/profile', function (req,res) {
    res.render('profile');
})
router.get('/my_profile', function (req,res) {

    res.render('myProfile');
})

router.get('/my_post', async function(_,res) {
    const user = res.locals.user;

    const data = await getUserArticles(user.id)
    console.log(data)
    const totalPosts = data.length;
    res.locals.posts = data;
    res.locals.total_posts = totalPosts;

    const comments = await getAllCommentsByArticles(user.id)
    console.log(comments)

    const filteredComments = comments.filter(comment => comment.comment_id !== null);


    const totalResponses = filteredComments.length;
    res.locals.responses = filteredComments;
    res.locals.total_responses = totalResponses;

   
    res.render('myPost');
})

router.post('/update_info', function(req,res) {

    const {bio, gender, address} = req.body;

    const updateInfo = {
        bio: bio? true:false,
        gender: gender? true:false,
        address: address? true:false
    };

    res.locals.bio = bio;
    res.locals.gender = gender;
    res.locals.address = address;

    res.render('myProfile', {this: res.locals, information: updateInfo});
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