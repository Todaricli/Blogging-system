window.addEventListener('load', async function () {

    const iconInput = document.querySelectorAll('input[name=icon]');
    iconInput.forEach(icon => {
        icon.addEventListener('click', () => {
            const iconImage = document.getElementById("my-profile-icon-image");
            iconImage.src = `/images/avatars/${icon.value}.png`;
            const iconStorage = document.getElementById('icon_id_temp_storage')
            iconStorage.value = icon.value;
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
    await updateInfo();
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

async function updateInfo() {
    const updateInfoForm = document.getElementById('updateInfo');

    updateInfoForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const icon = document.getElementById('icon_id_temp_storage').value;
        const fname = updateInfoForm.querySelector('#my_profile_fname').value;
        const lname = updateInfoForm.querySelector('#my_profile_lname').value;
        const email = updateInfoForm.querySelector('#my_profile_email').value;
        const DOB = updateInfoForm.querySelector('#my_profile_DOB').value;
        const desc = updateInfoForm.querySelector('#my_profile_desc').value;

        const info = {
            my_profile_fname: fname,
            my_profile_lname: lname,
            my_profile_email: email,
            my_profile_DOB: DOB,
            my_profile_desc: desc,
            icon: icon
        }

        try {
            const response = await fetch('/api/updateInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })

            const responseData = await response.text();

            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status + " " + responseData);
            }

            alert(responseData);

            const directTimer = setTimeout(() => {
                location.reload();
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