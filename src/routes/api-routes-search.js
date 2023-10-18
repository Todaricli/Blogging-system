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
    let search = req.query.search
    res.locals.search = search;
    console.log(search)

    const articles = await searchDao.getArticlesByTitleForSearch(search);
    console.log(articles)

    const articlesLength = articles.length;

    const users = await searchDao.getArticlesByAuthorNameForSearch(search);

    const usersLength = users.length;

    res.locals.articles = articles;
    res.locals.users = users;
    res.locals.articlesLength = articlesLength;
    res.locals.usersLength = usersLength;

    res.render("searchedArticles")
})

router.get('/filtered-articles', async function(req, res) {
    const {startDate, endDate}  = req.query;
    console.log(startDate);
    console.log(endDate);
  
    const articles = await searchDao.filterArticlesBySelectedDates(startDate, endDate)
    console.log(articles)
  
    res.locals.articles = articles;
    res.locals.articlesByDate = articles;
    res.locals.articlesLength = articles.length;
    res.locals.startDate = startDate;
    res.locals.endDate = endDate;
    res.render("searchedArticles")
  
})

module.exports = router
