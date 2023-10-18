window.addEventListener('load', async function () {

    const iconInput = document.querySelectorAll('input[name=icon]');
    iconInput.forEach(icon => {
        icon.addEventListener('click', () => {
            const iconImage = document.getElementById("my-profile-icon-image");
            iconImage.src = `/images/avatars/${icon.value}.png`;
        })
    })

    const updateIconButton = document.getElementById("update-icon-btn");
    const icon_container = document.getElementById("icon_container");

    updateIconButton.addEventListener('click', function (e) {
        console.log("click");
        if (icon_container.style.display === "block") {
            icon_container.style.display = "none";
        } else {
            icon_container.style.display = "block";
        }
        updateIconButton.classList.toggle('active');
    })

    await deleteAccount();
});

async function deleteAccount() {
    const deleteAccountForm = document.getElementById('deleteAccount');

    deleteAccountForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const user_id = document.getElementById("user_id_temp_storage").value;
        console.log(user_id);

        const data = {
            userKey: user_id
        }

        try {
            const response = await fetch('/api/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.text();

            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status + " " + responseData);
            }
            alert(responseData);

            const directTimer = setTimeout(() => {
                window.location.assign('/');
                clearTimeout(directTimer);
            }, 300);

        } catch (e) {
            alert(e);

            const directTimer = setTimeout(() => {
                location.reload();
                clearTimeout(directTimer);
            }, 300);
        }
    })
}