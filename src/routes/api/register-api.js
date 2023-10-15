const express = require('express');
const router = express.Router();

const userDb = require('../../models/generic-dao');

router.get('/api/check-username', async function (req, res) {
  const username = req.query.username
  const matchedUser = await userDb.getUserDataByUsername(username);
  if (matchedUser) {
    res.send('username exists');
  } else res.send('username does not exist');
});

router.post('/api/check-passwords-match', async function (req, res) {
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  if (password === confirmPassword || confirmPassword === '') {
    res.status(200).send('passwords match');
  } else res.status(400).send('passwords different');
});

router.post('/api/validate-password-format',  async function (req, res) {
  const password = req.body.password;
  const passwordRegex = /^(?=.*[\W_]).{5,}$/;
  if (passwordRegex.test(password) || password === '') {
    res.status(200).send('valid');
  } else res.status(400).send('invalid');
});

// router.post('/api/remove-subscription', async (req, res) => {
//   const userId = req.body.userId;
//   const subscriptionId = req.body.subscriptionId;
//   try {
//     const db = await getDatabase();
//     await db.run(
//       'DELETE FROM subscription WHERE follower_id = ? AND being_subscribed_id = ?',
//       [userId, subscriptionId]
//     );
//     res.sendStatus(204); // Success: No content
//   } catch (error) {
//     console.error('Failed to remove the subscription from the database', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;