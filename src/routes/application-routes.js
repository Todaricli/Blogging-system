const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const genericDao = require('../models/generic-dao.js');
const subDao = require('../models/sub-dao.js');
const commentDao = require('../models/comments-dao.js');
const comment = require('../middleware/comments.js')

const { verifyAuthenticated } = require('../middleware/auth-middleware/login-auth.js');
const { getUserArticles, getAllCommentsByArticles, getUserNameByComment } = require('../models/generic-dao.js');

router.get('/', verifyAuthenticated, async function (req, res) {

    res.locals.top5Articles = await articleDao.getTopFiveArticles();
    res.locals.articleData = await articleDao.getAllArticles();

    res.render('articlesHome');
});


router.get('/article', async function (req, res) {
    res.render('articleDemo');
});

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

router.get('/profile', verifyAuthenticated, async function (req, res) {
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
router.get('/my_profile', async function (req, res) {
    const user = res.locals.user;
    console.log(user);

    res.locals.details = user;

    //Get subscribers
    const userData = await subDao.getSubscribersByUserID(user.id);
    //console.log(userData);

    res.locals.subscribers = userData;

    const totalSubscribers = userData.length;
    res.locals.total_subscribers = totalSubscribers;

    //Get followings
    const userFollowings = await subDao.getSubscriptionsByUserID(user.id);
    //console.log("Followings:" + userFollowings);

    res.locals.followings = userFollowings;

    const totalFollowings = userFollowings.length;
    res.locals.total_followings = totalFollowings;

    res.render('myProfile')
});

router.get('/my_post', verifyAuthenticated, async function (_, res) {
    const user = res.locals.user;

    const data = await getUserArticles(user.id)
    console.log(data)
    const totalPosts = data.length;
    res.locals.posts = data;
    res.locals.total_posts = totalPosts;

    const article_id = data[0].article_id;
    console.log(article_id)

    const comments = await commentDao.getAllCommentsByArticles(article_id);
    console.log(comments)

    const filteredComments = comments.filter(comment => comment.comment_id !== null);


    const totalResponses = filteredComments.length;
    res.locals.responses = filteredComments;
    res.locals.total_responses = totalResponses;

    res.render('myPost');
})

router.get('/deleteComment/:id', async function(req,res) {
    const user = res.locals.user;
    const comment_id = req.params.id;

    const data = await getUserArticles(user.id);
    const article_id = data[0].article_id;

    if (comment_id) {
        await commentDao.deleteComments(comment_id,article_id);
        const responses = await commentDao.getAllCommentsByArticles(article_id);
        console.log("Responses:");
        console.log(responses);
        res.redirect("/my_post")
    }

})

router.post('/update_info', function (req, res) {

  

    res.render('myProfile');
})

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