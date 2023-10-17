window.addEventListener('load', async function () {
    // selectors
    const notificationBell = document.querySelector('.bell-icon');

    notificationBell.addEventListener('click', () => {
        deactivateBell();
        setTimeout(activateBell, 100);
    });

    const userNotifications = await getAllSubscribers();
    console.log(userNotifications);
    setNotificationDropDownMenu();

    activateBell();
    setTimeout(deactivateBell, 5000);
    await getAllSubscribers();

    function activateBell() {
        notificationBell.classList.add('activate');
    }

    function deactivateBell() {
        notificationBell.classList.remove('activate');
    }

    async function getAllSubscribers() {
        const response = await fetch(`/api/get-all-notifications`);
        let data = makeArray(await response.json());
        return data;
    }

    function setNotificationDropDownMenu() {
        const notifyDropMenu = document.querySelector('.notify-content');
        for (notification of userNotifications) {
            let aTag = document.createElement('a');
            let p1Tag = document.createElement('p');
            p1Tag.innerHTML = notification.content;
            let p2Tag = document.createElement('p');
            p2Tag.innerHTML = `Time recieved: ${notification.time}`;

            aTag.appendChild(p1Tag);
            aTag.appendChild(p2Tag);
            notifyDropMenu.appendChild(aTag);
        }
    }

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
