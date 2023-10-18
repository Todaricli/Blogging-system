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

router.get('/api/get-search/single-date', async function (req, res) {
    const searchDate = req.query.searchDate

    const articlesByDate = await searchDao.getArticlesBySingleDate(searchDate);

    console.log(articlesByDate[1])

    const returnObj = {
        articlesByDate
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
    let articlesLength = ""
    let usersLength = ""

    const articles = await searchDao.getArticlesByTitleForSearch(search);
    console.log(articles)
    if(articles != undefined){
        articlesLength = articles.length;
    }else{
        articlesLength = 0
    }
    

    const users = await searchDao.getArticlesByAuthorNameForSearch(search);

    if(articles != undefined){
        usersLength = users.length;
    }else{
        usersLength = 0
    }


    res.locals.articles = articles;
    res.locals.users = users;
    res.locals.articlesLength = articlesLength;
    res.locals.usersLength = usersLength;

    res.render("searchedArticles")
})
module.exports = router
