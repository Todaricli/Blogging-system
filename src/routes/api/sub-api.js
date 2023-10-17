const express = require('express');
const router = express.Router();

const subDao = require('../../models/sub-dao');

router.post('/api/checkIfSub', async function (req, res) {
    const user_id = req.body.user_id;
    const check_id = req.body.check_id;
    const result = await subDao.checkIfSubscribe(user_id, check_id);
    res.status(200).send(result);
});

module.exports = router;