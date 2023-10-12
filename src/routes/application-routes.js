const express = require('express');
const router = express.Router();

const testDao = require('../models/test-dao.js');
const articleDao = require('../models/articles-dao.js');
const genericDao = require('../models/generic-dao.js');

// router.get('/', async function (req, res) {
//     res.locals.title = 'My route title!';
//     res.locals.allTestData = await testDao.retrieveAllTestData();
//     res.render('home');
// });
const { verifyAuthenticated } = require('../middleware/auth-middleware/login-auth.js');
const { getUserArticles, getAllCommentsByArticles, getUserNameByComment } = require('../models/generic-dao.js');

router.get('/', verifyAuthenticated, async function (req, res) {

    res.locals.top5Articles = await articleDao.getTopFiveArticles();
    res.locals.articleData = await articleDao.getAllArticles();

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

module.exports = router;