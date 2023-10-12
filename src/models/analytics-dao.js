// General queries with the database
const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');
const { getAllUserData } = require('./generic-dao.js');

async function getNumFollowers(user_id) {
    const db = getDatabase()

    const numFollowers = db.all(SQL`
    select count(being_subscribed_id) as counts from subscription 
    where being_subscribed_id = ${user_id}
    `)

    return numFollowers

}

async function getTotalLikes(id) {
    const db = getDatabase();

    const numLikes = db.all(SQL`
    select count(id) as counts from likes 
    where user_id == ${id}
    `)

    return numLikes;
}

async function getNumberOfComments(user_id){
    const db = getDatabase();

    const numOfComments = db.all(SQL`
    select count(id) as counts from comments 
    where user_id = ${user_id}
    `)

    return numOfComments
}

module.exports ={
    getNumFollowers,
    getNumberOfComments,
    getTotalLikes
}