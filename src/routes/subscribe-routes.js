const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const genericDao = require('../models/generic-dao.js');
const subDao = require('../models/sub-dao.js');
const notifyDao = require('../models/notify-dao.js');

const { verifyAuthenticated } = require('../middleware/auth-middleware/login-auth.js');

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

router.get("/removeSubscription", verifyAuthenticated, async function (req, res) {
  const subscription_id = req.query.id;
  const user_id = res.locals.user.id;
  if (user_id) {
      await subDao.removeSpecificSubscriptionByID(user_id, subscription_id);
      res.locals.top5Articles = await articleDao.getTopFiveArticles();
      res.locals.articleData = await articleDao.getAllArticles();
      res.render('articlesHome');
  } else {
      res.redirect('/login');
  }
})

router.get("/addSubscription", verifyAuthenticated, async function (req, res) {
  const subscriber_id = req.query.id;
  const user_id = res.locals.user.id;

  if (user_id) {
      await subDao.addSpecificSubscriptionByID(user_id, subscriber_id);
      res.locals.top5Articles = await articleDao.getTopFiveArticles();
      res.locals.articleData = await articleDao.getAllArticles();

      const n = await createSubscriptionNotification(subscriber_id, user_id);
      await notifyDao.storeNotificationToUser(n.receiverId, n.timestamp, n.content);
      res.render('articlesHome');
  } else {
      res.redirect('/login');
  }
});

async function createSubscriptionNotification(receiverId, senderId) {
  const now = new Date();
  const utcString = now.toISOString();
  const sender = await genericDao.getUserDataById(senderId);
  console.log(sender.username);
  const notification = {
    senderId: senderId,
    receiverId: receiverId,
    timestamp: utcString,
    content: `${sender.username} just subscribed to you!`,
    read: 0,
  }
  return notification;
}

module.exports = router;
