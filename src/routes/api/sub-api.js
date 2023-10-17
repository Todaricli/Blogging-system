const express = require('express');
const router = express.Router();

const subDao = require('../../models/sub-dao');
const genericDao = require('../../models/generic-dao');
const notifyDao = require('../../models/notify-dao');
const {
    verifyAuthenticated,
} = require('../../middleware/auth-middleware/login-auth.js');

router.post('/api/checkIfSub', async function (req, res) {
    const user_id = req.body.user_id;
    const check_id = req.body.check_id;
    const result = await subDao.checkIfSubscribe(user_id, check_id);
    res.status(200).send(result === true ? '1' : '0');
});

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
    const subscriber_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
            await subDao.addSpecificSubscriptionByID(user_id, subscriber_id);
            
            const n = await createSubscriptionNotification(
                subscriber_id,
                user_id
            );
            await notifyDao.storeNotificationToUser(
                n.senderId,
                n.receiverId,
                n.timestamp,
                n.content,
                n.type,
                n.isRead,
            );
            res.status(200).json({
                message: 'Subscription add successfully',
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error removing subscription' });
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
                message: 'Subscription removed successfully',
            });
        } catch (error) {
            res.status(500).json({ message: 'Error removing subscription' });
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
        type: 'sub',
        isRead: 0,
    };
    return notification;
}

module.exports = router;
