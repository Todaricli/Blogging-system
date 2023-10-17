const express = require('express');
const router = express.Router();

const likeDao = require('../../models/like-dao');
const { verifyAuthenticated } = require('../../middleware/auth-middleware/login-auth.js');


router.post('/api/checkIfLiked', async function (req, res) {
    const user_id = req.body.user_id;
    const article_id = req.body.article_id;
    const result = await likeDao.checkIfLiked(user_id, article_id);
    res.status(200).send(result === true ? '1' : '0');
});

router.get("/removeLike", verifyAuthenticated, async function (req, res) {
    const article_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
            await likeDao.removeLike(user_id, article_id);
            res.status(200).json({ message: 'Like removed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing like' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
})

router.get("/addLike", verifyAuthenticated, async function (req, res) {
    const article_id = req.query.id;
    const user_id = res.locals.user.id;
    if (user_id) {
        try {
            await likeDao.addLike(user_id, article_id);
            res.status(200).json({ message: 'Add Like successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error add like' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
})



module.exports = router;

