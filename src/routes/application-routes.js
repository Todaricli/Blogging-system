const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const genericDao = require('../models/generic-dao.js');
const subDao = require('../models/sub-dao.js');
const commentDao = require('../models/comments-dao.js');
const userDao = require('../models/user-dao.js');
const analyticsDao = require('../models/analytics-dao.js')

const { verifyAuthenticated } = require('../middleware/auth-middleware/login-auth.js');
const { getUserArticles, getAllCommentsByArticles, getUserNameByComment } = require('../models/generic-dao.js');

router.get('/', async function (req, res) {

    res.locals.top5Articles = await articleDao.getTopFiveArticles();
    res.locals.articleData = await articleDao.getAllArticles();
    

    res.render('articlesHome');
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

router.get('/profile', async function (req, res) {
    const id = req.query.id;
    if (id) {
        const profileData = await genericDao.getUserDataById(id);
        res.locals.profile_icon = profileData.icon_path;
        res.locals.profile_name = `${profileData.fname} ${profileData.lname}`;
        res.locals.profile_DOB = profileData.DOB;
        res.locals.profile_id = id;
        res.locals.profile_subscribers = await subDao.getSubscribersByUserID(profileData.id);
        res.locals.profile_articles = await articleDao.getArticlesByID(profileData.id);
        res.render('profile');
    } else {
        res.redirect('/');
    }

})

router.get('/my_profile', verifyAuthenticated, async function (req, res) {
    const id = res.locals.user.id;

    const userData = await genericDao.getUserDataById(id);
    if (!userData) {
        res.redirect("/");
    }
    res.locals.userData = userData;

    res.render('myProfile');
})

router.post('/update_info', async function (req, res) {
    const user_id = res.locals.user.id;
    const info = req.body;
    const fname = info.my_profile_fname;
    const lname = info.my_profile_lname;
    const email = info.my_profile_email;
    const DOB = info.my_profile_DOB;
    const desc = info.my_profile_desc;
    try {
        if (!info.icon) {
            const sqlReponse = await userDao.updateUserProfileWithoutIconUpdate(user_id, email, fname, lname, DOB, desc);
            if (sqlReponse) { 
                res.setToastMessage("Information updated!")
            }
            console.log(sqlReponse);
            res.redirect('/my_profile');
        } else {
            const iconPath = `/images/avatars/${info.icon}.png`;
            const sqlReponse = await userDao.updateUserProfile(user_id, email, fname, lname, DOB, desc, iconPath);
            if (sqlReponse) { 
                res.setToastMessage("Information updated!")
            }
            console.log(sqlReponse);
            res.redirect('/my_profile');
        }
    } catch (e) {
        res.setToastMessage('Updating error: ' + e);
        res.redirect('/my_profile');
    }
})

router.get('/my-page', async function (req, res) {
    const user_id = res.locals.user.id
    if (user_id) {
        const profileData = await genericDao.getUserDataById(user_id);
        res.locals.profile_icon = profileData.icon_path;
        res.locals.profile_name = `${profileData.fname} ${profileData.lname}`;
        res.locals.profile_DOB = profileData.DOB;
        res.locals.profile_subscribers = await subDao.getSubscribersByUserID(profileData.id);
        res.locals.profile_articles = await articleDao.getArticlesByID(profileData.id);
        res.render('profile');
    } else {
        res.status(404).send("Page not found 404!");
    }
})

router.get('/my_post', verifyAuthenticated, async function (_, res) {
    const user = res.locals.user;

    const data = await getUserArticles(user.id)
    console.log(data)
    const totalPosts = data.length;
    res.locals.posts = data;
    res.locals.total_posts = totalPosts;

    const article_id = data[0].article_id;
    console.log(article_id)

    // const comments = await commentDao.getAllCommentsByArticles(article_id);
    // console.log(comments)

    // const filteredComments = comments.filter(comment => comment.comment_id !== null);


    // const totalResponses = filteredComments.length;
    // res.locals.responses = filteredComments;
    // res.locals.total_responses = totalResponses;

    res.render('myPost');
})

router.get('/deleteComment/:id', async function(req,res) {
    const user = res.locals.user;
    const comment_id = req.params.id;

    const data = await getUserArticles(user.id);
    const article_id = data[0].article_id;

    if (comment_id) {
        await commentDao.deleteComments(comment_id, article_id);
        const responses = await commentDao.getAllCommentsByArticles(article_id);
        console.log("Responses:");
        console.log(responses);
        res.redirect("/my_post")
    }

})

router.get("/removeSubscription", verifyAuthenticated, async function (req, res) {
    const subscription_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
          await subDao.removeSpecificSubscriptionByID(user_id, subscription_id);
          res.status(200).json({ message: 'Subscription removed successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error removing subscription' });
        }
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
})

router.get("/analytics-Dashboard", async (req,res) =>{
    const user = res.locals.user
    const userId = user["id"]
    const response = await analyticsDao.getNumFollowers(userId)
    const response1 = await genericDao.getUserDataById(userId)
    const comments = await analyticsDao.getNumberOfComments(userId)
    const likes = await analyticsDao.getArticleLikes(userId)
    const top3Articles = await analyticsDao.getMostPopularArticles(userId)

    console.log(top3Articles)

    // const yuh = await response.json()
    const followerNumber = response[0]["counts"]
    res.locals.followers = followerNumber
    res.locals.user = response1
    res.locals.comments = comments
    res.locals.likes = likes
    res.locals.topArticles = top3Articles
    res.render("analyticsDashboard")

});
router.get("/addSubscription", verifyAuthenticated, async function (req, res) {
    const subscription_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
          await subDao.addSpecificSubscriptionByID(user_id, subscription_id);
          res.status(200).json({ message: 'Subscription removed successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error removing subscription' });
        }
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
})

router.get("/removeSubscriber", verifyAuthenticated, async function (req, res) {
    const subscriber_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
          await subDao.removeSpecificSubscriberByID(user_id, subscriber_id);
          res.status(200).json({ message: 'Subscription removed successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error removing subscription' });
        }
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
})

router.get("/analytics-Dashboard", async (req, res) => {
    console.log("skeet")
    res.render("analyticsDashboard")
})

router.get('/analytics', async function (req, res) {
    
    const user = res.locals.user
    const userId = user["id"]
    const response = await analyticsDao.getNumFollowers(userId)
    const response1 = await genericDao.getUserDataById(userId)
    const comments = await analyticsDao.getNumberOfCommentsPerArticle(userId)
    const likes = await analyticsDao.getArticleLikesPerArticle(userId)
    const top3Articles = await analyticsDao.getMostPopularArticles(userId)
    console.log("skeetskeet")
    console.log(comments)

    // const yuh = await response.json()
    const followerNumber = response[0]["counts"]
    res.locals.followers = followerNumber
    res.locals.user = response1
    res.locals.comments = comments
    res.locals.likes = likes
    res.locals.topArticles = top3Articles
    res.render("analyticsDashboard")
});

module.exports = router;