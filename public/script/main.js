window.addEventListener(`load`, () => {

    window.addEventListener(`click`, (e) => {

        const dropdown = document.querySelector(".dropdown")
        const dropDownContent = document.querySelector(".dropdown-content")
        window.addEventListener(`click`, (e) => {
            if (!e.target.classList.contains("skeet")) {
                dropDownContent.style.display = "none"
            }
        })

        dropdown.addEventListener(`click`, (e) => {

            if (e.target.classList.contains("skeet")) {
                dropDownContent.style.display = "block"
            }
        })
    })

})