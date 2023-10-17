const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function storeNotificationToUser(
    sender,
    receiver,
    timestamp,
    content,
    isRead
) {
    const db = await getDatabase();
    await db.all(SQL`
  insert into notifications (host_id, receiver_id, time, content, isRead)
  values (${sender}, ${receiver}, ${timestamp}, ${content},${isRead})
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

// async function getSubscriptionsByUserID(userid) {
//     const db = await getDatabase();
//     const subscription = await db.all(SQL`
//         select user.*
//         from user left join subscription on user.id = subscription.being_subscribed_id
//         where subscription.follower_id = ${userid}
//     `)
//     return subscription;
// }

module.exports = {
    storeNotificationToUser,
    getAllNotificationsById,
};
