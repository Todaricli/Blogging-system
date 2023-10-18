window.addEventListener('click', function() {
    const textareaOpener1 = document.querySelector('.textareaOpener-1');
    const textareaOpener2 = document.querySelector('.textareaOpener-2');
    const textareaOpener3 = document.querySelector('.textareaOpener-3');

    
    const replyContainer = document.getElementById('reply-container');
    const secondLevel = document.getElementById('second-level-form');
    const thirdLevel = document.getElementById('second-level-form');


    // textareaOpeners.forEach((textareaOpener) => {
    //     textareaOpener.addEventListener('click', function() {
    //         const replyContainer = document.getElementById('reply-container');
    //         if (replyContainer.style.display === 'block') {
    //             replyContainer.style.display = 'none';
    //         } else {
    //             replyContainer.style.display = 'block';
    //         }
    //     })
    // })

    textareaOpener1.addEventListener('click', function() {
        if (replyContainer.style.display === 'block') {
            replyContainer.style.display = 'none';
        } else {
            replyContainer.style.display = 'block';
        }
    })

    textareaOpener2.addEventListener('click', function() {
        if (secondLevel.style.display === 'block') {
            secondLevel.style.display = 'none';
        } else {
            secondLevel.style.display = 'block';
        }
    })

    textareaOpener3.addEventListener('click', function() {
        if (thirdLevel.style.display === 'block') {
            thirdLevel.style.display = 'none';
        } else {
            thirdLevel.style.display = 'block';
        }
    })




})

    


