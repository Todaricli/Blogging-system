const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function storeNotificationToUser(
    sender,
    receiver,
    timestamp,
    content,
    type,
    isRead
) {
    const db = await getDatabase();
    await db.all(SQL`
  insert into notifications (host_id, receiver_id, time, content, type, isRead)
  values (${sender}, ${receiver}, ${timestamp}, ${content}, ${type}, ${isRead})
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



module.exports = {
    storeNotificationToUser,
    getAllNotificationsById,
    updateIsRead,
    deleteNotification,
};
