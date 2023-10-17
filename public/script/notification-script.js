window.addEventListener('load', async function () {
    // selectors
    const notificationBell = document.querySelector('.bell-icon');

    notificationBell.addEventListener('click', () => {
        deactivateBell();
        setTimeout(activateBell, 100);
    });

    const userNotifications = await getAllNotifications();
    console.log(userNotifications);
    setNotificationDropDownMenu();

    activateBell();

    function activateBell() {
        notificationBell.classList.add('activate');
    }

    function deactivateBell() {
        notificationBell.classList.remove('activate');
    }

    async function getAllNotifications() {
        const response = await fetch(`/api/get-all-notifications`);
        let data = makeArray(await response.json());
        return data;
    }

    function setNotificationDropDownMenu() {
        const notifyDropMenu = document.querySelector('.notify-content');
        for (notification of userNotifications) {
            let divTag = document.createElement('div');
            divTag.classList.add('clicked');

            let p1Tag = document.createElement('p');
            p1Tag.classList.add('clicked');
            p1Tag.innerHTML = notification.content;

            let p2Tag = document.createElement('p');
            p2Tag.classList.add('clicked');
            p2Tag.innerHTML = `Time recieved: ${notification.time}`;

            divTag.appendChild(p1Tag);
            divTag.appendChild(p2Tag);
            notifyDropMenu.appendChild(divTag);
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
