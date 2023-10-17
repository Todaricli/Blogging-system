const express = require('express');
const router = express.Router();

const subDao = require('../../models/sub-dao');
const notifyDao = require('../../models/notify-dao');
const userDb = require('../../models/generic-dao');

router.get('/api/getSubscribersByUserId', async function (req, res) {
    const userId = req.query.userId;
    const subscribers = await subDao.getSubscribersByUserID(userId);
    console.log(subscribers);
    if (subscribers) {
        res.status(200).json({ subscribers });
    } else res.status(401).send('no subscribers');
});

router.get('/api/check-username', async function (req, res) {
    const username = req.query.username;
    const matchedUser = await userDb.getUserDataByUsername(username);
    if (matchedUser) {
        res.send('username exists');
    } else res.send('username does not exist');
});

router.get('/api/get-all-notifications', async function (req, res) {
    const user = res.locals.user;
    const notifications = await notifyDao.getAllNotificationsById(user.id);
    res.status(200).json(notifications);
});

module.exports = router;
