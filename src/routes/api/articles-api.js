const express = require('express');
const router = express.Router();

const subDao = require('../../models/sub-dao');
const notifyDao = require('../../models/notify-dao');

router.post(
    '/api/create-new-article-notif-for-subs',
    async function (req, res) {
        const userId = res.locals.user.id;
        const articleId = parseInt(req.body.articleId);
        console.log(userId);
        console.log(articleId);

        const subscribers = await subDao.getSubscribersByUserID(userId);
        try {
            for (subscriber of subscribers) {
                const n = await notifyDao.createNotification(
                    subscriber.id,
                    userId,
                    articleId,
                    'write'
                );
                await notifyDao.storeNotificationToUser(
                    n.senderId,
                    n.receiverId,
                    n.timestamp,
                    n.content,
                    n.articleId,
                    n.type,
                    n.isRead
                );

            }
            res.sendStatus(204);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
);

module.exports = router;
