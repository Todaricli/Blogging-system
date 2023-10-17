const express = require('express');
const router = express.Router();

const subDao = require('../../models/sub-dao');
const { verifyAuthenticated } = require('../../middleware/auth-middleware/login-auth.js');

router.post('/api/checkIfSub', async function (req, res) {
    const user_id = req.body.user_id;
    const check_id = req.body.check_id;
    const result = await subDao.checkIfSubscribe(user_id, check_id);
    res.status(200).send(result);
});


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

module.exports = router;