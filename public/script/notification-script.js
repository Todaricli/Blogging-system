window.addEventListener('load', async function () {
    const notificationBell = document.querySelector('.bell-icon');
    activateBell();
    setTimeout(deactivateBell, 5000);
    await getAllSubscribers();

    notificationBell.addEventListener('click', () => {
        deactivateBell();
        setTimeout(activateBell, 100);
    });

    function activateBell() {
        notificationBell.classList.add('activate');
    }

    function deactivateBell() {
        notificationBell.classList.remove('activate');
    }

    async function getAllSubscribers() {
        const response = await fetch(
            `/api/get-all-notifications`
        );
        let data = makeArray(await response.json());
        console.log(data);
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
