window.addEventListener("load", function () {
    const dropdown = document.querySelector('.dropdown');
    const dropDownContent = document.querySelector('.dropdown-content');

    window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('clicked')) {
            dropDownContent.style.display = 'none';
        }
    });

    dropdown.addEventListener('click', (e) => {
        if (e.target.classList.contains('clicked')) {
            dropDownContent.style.display = 'block';
        }
    });

    const notifyDrop = document.querySelector('.notify-drop');
    const notifyContent = document.querySelector('.notify-content');
    let notifyClicked = false;

    window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('clicked')) {
            notifyContent.style.display = 'none';
            notifyClicked = false;
        }
    });

    notifyDrop.addEventListener('click', (e) => {
        if (e.target.classList.contains('clicked')) {
            notifyContent.style.display = 'block';
            notifyClicked = true;
        }
    });

    // notifyDrop.addEventListener('mouseenter', (e) => {
    //     notifyContent.style.display = 'block';
    // });
    // notifyDrop.addEventListener('mouseleave', (e) => {
    //     if (!notifyClicked) {
    //         notifyContent.style.display = 'none';
    //         console.log("wtf");
    //     }
    // });

});
