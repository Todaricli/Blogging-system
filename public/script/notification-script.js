window.addEventListener('load', async function () {
    // manage notifications
    const userNotifications = await getAllNotifications();
    console.log(userNotifications);
    setNotificationDropDownMenu();

    // manage bell icon
    const notificationBell = document.querySelector('.bell-icon');
    const notifNumTag = document.querySelector('.notification-amount > span');
    notificationBell.addEventListener('click', () => {
        deactivateBell();
        if (checkIfMoreThanZeroNotif()) setTimeout(activateBell, 100);
    });
    setNumberOfNotifications();
    if (checkIfMoreThanZeroNotif()) activateBell();

    // Bell Icon Functions
    function setNumberOfNotifications() {
        let notifNum = 0;
        for (notif of userNotifications) {
            if (notif.isRead === 0) notifNum++;
        }
        notifNumTag.textContent = notifNum;
    }

    function checkIfMoreThanZeroNotif() {
        if (parseInt(notifNumTag.textContent) > 0) return true;
        else return false;
    }

    function activateBell() {
        notificationBell.classList.add('activate');
    }

    function deactivateBell() {
        notificationBell.classList.remove('activate');
    }

    // Notification Functions
    async function getAllNotifications() {
        const response = await fetch(`/api/get-all-notifications`);
        let data = makeArray(await response.json());
        return data;
    }

    function setNotificationDropDownMenu() {
        const notifyDropMenu = document.querySelector('.notify-content');
        for (notification of userNotifications) {
            createNotification(notification);
        }

        function createNotification(notification) {
            let divTag = document.createElement('div');
            divTag.classList.add('clicked');
            addLinkToNotificationDiv();
            checkAndUpdateIsRead();

            let p1Tag = document.createElement('p');
            p1Tag.classList.add('clicked');
            p1Tag.innerHTML = notification.content;

            let p2Tag = document.createElement('p');
            p2Tag.classList.add('clicked');
            p2Tag.innerHTML = `Time recieved: ${notification.time}`;

            divTag.appendChild(p1Tag);
            divTag.appendChild(p2Tag);
            notifyDropMenu.appendChild(divTag);

            function addLinkToNotificationDiv() {
                divTag.addEventListener('click', function () {
                    const profileRoute = `/profile?id=${notification.host_id}`;
                    const articleRoute = `/article/${notification.host_id}`;
                    let route;
                    if (
                        notification.type === 'like' ||
                        notification.type === 'sub'
                    ) {
                        route = profileRoute;
                    } else {
                        route = articleRoute;
                    }
                    window.location.href = route;
                });
            }

            function checkAndUpdateIsRead() {
                if (notification.isRead === 1) {
                    divTag.classList.add('read');
                }
                divTag.addEventListener('click', async function () {
                    if (notification.isRead === 0) {
                        await fetch(`/api/update-isRead?id=${notification.id}`);
                    }
                });
            }
        }
    }

    // MISC
    function makeArray(input) {
        if (input === undefined) {
            return [];
        } else if (Array.isArray(input)) {
            return input;
        } else {
            return [input];
        }
    }
});
