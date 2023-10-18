window.addEventListener('load', async function () {
    const user_id = document.getElementById("user_id_temp_storage").value;
    

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
});