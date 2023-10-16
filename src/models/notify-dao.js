const SQL = require('sql-template-strings');
const { getDatabase } = require('../db/database.js');

async function storeNotificationToUser(receiver, timestamp, content) {
    const db = await getDatabase();
    await db.all(SQL`
  insert into notifications (host_id, time, content)
  values (${receiver}, ${timestamp}, ${content})
`);
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

module.exports = { storeNotificationToUser };
