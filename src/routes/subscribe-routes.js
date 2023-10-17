const express = require('express');
const router = express.Router();

const articleDao = require('../models/articles-dao.js');
const genericDao = require('../models/generic-dao.js');
const subDao = require('../models/sub-dao.js');
const notifyDao = require('../models/notify-dao.js');

const {
    verifyAuthenticated,
} = require('../middleware/auth-middleware/login-auth.js');

router.get(
    '/removeSubscription',
    verifyAuthenticated,
    async function (req, res) {
        const subscription_id = req.query.id;
        const user_id = res.locals.user.id;
        if (user_id) {
            try {
                await subDao.removeSpecificSubscriptionByID(
                    user_id,
                    subscription_id
                );
                res.status(200).json({
                    message: 'Subscription removed successfully',
                });
            } catch (error) {
                res.status(500).json({
                    message: 'Error removing subscription',
                });
            }
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    }
);

router.get('/addSubscription', verifyAuthenticated, async function (req, res) {
    const subscription_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
            await subDao.addSpecificSubscriptionByID(user_id, subscription_id);
            res.status(200).json({
                message: 'Subscription added successfully',
            });

            const n = await createSubscriptionNotification(
                subscriber_id,
                user_id
            );
            await notifyDao.storeNotificationToUser(
                n.receiverId,
                n.timestamp,
                n.content
            );
            res.render('articlesHome');
        } catch (error) {
            res.status(500).json({ message: 'Error adding subscription' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
});

router.get('/removeSubscriber', verifyAuthenticated, async function (req, res) {
    const subscriber_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
            await subDao.removeSpecificSubscriberByID(user_id, subscriber_id);
            res.status(200).json({
                message: 'Subscriber removed successfully',
            });
        } catch (error) {
            res.status(500).json({ message: 'Error removing subsriber' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized' });
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
    };
    return notification;
}

module.exports = router;
