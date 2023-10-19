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

router.post('/api/updateInfo', async (req, res) => {
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
                res.status(200).send('Information updated!')
            }
        } else {
            const iconPath = `/images/avatars/${info.icon}.png`;
            const sqlReponse = await userDao.updateUserProfile(user_id, email, fname, lname, DOB, desc, iconPath);
            if (sqlReponse) { 
                res.status(200).send('Information updated!')
            }
        }
    } catch (e) {
        res.status(500).send('Updateing Error: ' + e);
    }
})

router.post('/api/updateUsername', async (req, res) => {

})

router.post('/api/updatePassword', async (req, res) => {

})

module.exports = router;