const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

const genericDao = require('../models/generic-dao.js');
const articleDao = require('../models/articles-dao.js');

async function storeNotificationToUser(
    sender,
    receiver,
    timestamp,
    content,
    articleId,
    type,
    isRead
) {
    const db = await getDatabase();
    await db.all(SQL`
  insert into notifications (host_id, receiver_id, time, content, article_id, type, isRead)
  values (${sender}, ${receiver}, ${timestamp}, ${content}, ${articleId}, ${type}, ${isRead})
`);
}

async function getAllNotificationsById(userId) {
    const db = await getDatabase();
    const notifications = await db.all(SQL`
    select *
    from notifications
    where notifications.receiver_id = ${userId}
    order by time desc;
`);
    return notifications;
}

async function updateIsRead(id) {
    const db = await getDatabase();
    await db.all(SQL`
    update notifications
    set isRead = 1
    where id = ${id};
`);
}

async function deleteNotification(id) {
    const db = await getDatabase();
    await db.all(SQL`
    delete from notifications
    WHERE id = ${id};
`);
}

async function createNotification(receiverId, senderId, articleId, type) {
    const now = new Date();
    const utcString = now.toISOString();
    const sender = await genericDao.getUserDataById(senderId);
    const contentAction = await createContent(type, articleId);
    const notification = {
        senderId: senderId,
        receiverId: receiverId,
        timestamp: utcString,
        content: `${sender.username} ${contentAction}`,
        articleId: articleId,
        type: type,
        isRead: 0,
    };
    return notification;
}

async function createContent(type, articleId) {
    const article = await articleDao.getArticleTitleById(articleId);
    if (type === 'sub') {
        return `subscribed to you!`;
    } else if (type === 'write') {
        return `published a new article: "${article[0].title}"!`;
    } else if (type === 'comment') {
        return `commented on your article: "${article[0].title}"!`;
    } else if (type === 'reply') {
        return `published a new article: "${article[0].title}"!`;
    } else if (type === 'like') {
        return `published a new article: "${article[0].title}"!`;
    }
}

module.exports = {
    storeNotificationToUser,
    getAllNotificationsById,
    updateIsRead,
    deleteNotification,
    createNotification,
};
