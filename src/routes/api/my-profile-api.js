const express = require('express');
const router = express.Router();

const userDao = require('../../models/user-dao.js');

router.post('/api/deleteAccount', async (req, res) => {
    try {
        const user_id = req.body.userKey;
        let done = undefined;
        if (user_id) {
            done = await userDao.deleteUserById(user_id)
            if (!done) {
                throw new Error('Deleting failed');
            }
            console.log(done);
            res.status(200).send("Account Deleted")
        } else {
            throw new Error('User not found');
        }
    } catch (e) {
        res.status(500).send('Deleting Error: ' + e)
    }
})

module.exports = router;