const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const genericDao = require('../models/generic-dao.js');
const subDao = require('../models/sub-dao.js');

const writeArticleDao = require('../models/writeArticle-dao.js');

// router.get('/', async function (req, res) {
//     res.locals.title = 'My route title!';
//     res.locals.allTestData = await testDao.retrieveAllTestData();
//     res.render('home');
// });
const { verifyAuthenticated, authorizeAdmin } = require('../middleware/auth-middleware/login-auth.js');
const { getUserArticles, getAllCommentsByArticles, getUserNameByComment } = require('../models/generic-dao.js');

router.get('/', verifyAuthenticated, async function (req, res) {

    res.locals.top5Articles = await articleDao.getTopFiveArticles();
    res.locals.articleData = await articleDao.getAllArticles();

    res.render('articlesHome');
});


router.get('/article', async function (req, res) {

    res.render('articleDemo');
});

// router.get('/article/:id', async function (req,res) {
//     const articleId = req.params.id;
//     console.log("Article ID:", articleId);

//     const article = await articleDao.getArticlesByID(articleId);
//     console.log(article);
//     res.locals.article = article;

//     const authorName = await articleDao.getAuthorByArticle(articleId);
//     console.log(authorName);
//     res.locals.authorName = authorName;

//     const comments = await articleDao.getAllCommentsFromArticle(articleId);
//     console.log(comments);
//     res.locals.comments = comments;

//     const likeCounts = await articleDao.getNumberOfLikesFromArticle(articleId);
//     console.log(likeCounts);
//     res.locals.like_count = likeCounts;

//     res.render('articleDemo');
// })

router.get('/sub', verifyAuthenticated, async function (req, res) {
    const user_id = res.locals.user.id;
    if (user_id) {
        res.locals.subscriptionList = await subDao.getSubscriptionsByUserID(user_id);
        res.locals.subscriberList = await subDao.getSubscribersByUserID(user_id);
        res.render('subscription&subscriber');
    } else {
        res.redirect('/login');
    }
})

router.get('/profile', verifyAuthenticated, authorizeAdmin, async function (req, res) {
    const id = req.query.id;
    if (id) {
        const profileData = await genericDao.getUserDataById(id);
        res.locals.profile_icon = profileData.icon_path;
        res.locals.profile_name = `${profileData.fname} ${profileData.lname}`;
        res.locals.profile_DOB = profileData.DOB;
        res.locals.profile_subscribers = await subDao.getSubscribersByUserID(profileData.id);
        res.locals.profile_articles = await articleDao.getArticlesByID(profileData.id);
        res.render('profile');
    } else {
        res.redirect('/');
    }

})
router.get('/my_profile', function (req, res) {

    res.render('myProfile');
})

router.get('/my_post', async function (_, res) {
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

router.post('/update_info', function (req, res) {

    const { bio, gender, address } = req.body;

    const updateInfo = {
        bio: bio ? true : false,
        gender: gender ? true : false,
        address: address ? true : false
    };

    res.locals.bio = bio;
    res.locals.gender = gender;
    res.locals.address = address;

    res.render('myProfile', { this: res.locals, information: updateInfo });
})

// router.post("/postNewArticle", function(req, res) {
//     const newArticle = req.body;

//     const user_id = res.locals.user.id;
//     const title = newArticle.titleKey;
//     const genre = newArticle.genreKey;
//     const content = newArticle.contentKey;

//     console.log(user_id);
//     console.log(title);
//     console.log(genre);
//     console.log(content);
    
//     let done = undefined;
//     done = writeArticleDao.insertNewArticleToArticleTable(user_id, title, genre, content);

//     if(done) {
//         res.setToastMessage("New Article created!");
//     } else {
//         res.setToastMessage("Submitting error, try again!");
//     }
    
//     res.redirect('/writeArticle');

router.get("/subscriptionRemove", verifyAuthenticated, async function (req, res) {
    const subscription_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        await subDao.removeSpecificSubscriptionByID(user_id, subscription_id);
        res.locals.subscriptionList = await subDao.getSubscriptionsByUserID(user_id);
        res.locals.subscriberList = await subDao.getSubscribersByUserID(user_id);
        res.render('subscription&subscriber');
    } else {
        res.redirect('/login');
    }
})

router.get("/analytics-Dashboard", async (req,res) =>{
    console.log("skeet")
    res.render("analyticsDashboard")
})

router.get("/subscriberRemove", verifyAuthenticated, async function (req, res) {
    const subscriber_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        await subDao.removeSpecificSubscriberByID(user_id, subscriber_id);
        res.locals.subscriptionList = await subDao.getSubscriptionsByUserID(user_id);
        res.locals.subscriberList = await subDao.getSubscribersByUserID(user_id);
        res.render('subscription&subscriber');
    } else {
        res.redirect('/login');
    }
})

router.get('/analytics', function(req, res){



    res.render('analyticsDashboard');
});

module.exports = router;