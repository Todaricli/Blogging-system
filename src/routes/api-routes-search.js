const express = require('express');
const router = express.Router();
const searchDao = require(`../models/search-dao`)

router.get('/api/get-search', async function (req, res) {
    const searchTerm = req.query.searchTerm

    const articlesByTitle = await searchDao.getArticlesByTitleForSearch(searchTerm);
    const articlesByUser = await searchDao.getArticlesByAuthorNameForSearch(searchTerm);

    const returnObj = {
        articlesByTitle,
        articlesByUser
    }

    res.json(returnObj)
});

router.get(`/test`, (req,res)=>{
    res.render("test")
})

router.get("/searched-Article", async (req,res) =>{
    const search = req.query.search
    res.locals.search = search
    res.locals.articles = await searchDao.getArticlesByTitleForSearch(search);
    res.locals.users= await searchDao.getArticlesByAuthorNameForSearch(search);

    res.render("searchedArticles")
})
module.exports = router
