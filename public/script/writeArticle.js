window.addEventListener("load", function () {

    const toolBox = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],       
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
        // ['image', 'code-block']
    ];

    const quill = new Quill('#write_article_content', {
        modules: {
            toolbar: toolBox
        },
        scrollingContainer: '#scrolling-container',
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });

    const form = document.querySelector('#write_article_form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Populate hidden form on submit
        const content = document.querySelector('input[name=write_article_content]');
        content.value = JSON.stringify(quill.getContents());

        const title = document.getElementById("write_article_title").value;
        const genre = document.getElementById("write_article_genre").value;
        const image = document.getElementById("write_article_image").files[0];

        const actualContent = content.value;

        //instantialize FormData obj, and append values
        const formData = new FormData();
        formData.append("titleKey", title);
        formData.append("genreKey", genre);
        formData.append("contentKey", actualContent);
        formData.append("imageKey", image);

        const toastMessage = document.getElementById("write-article-toast-message");

        try {
            const response = await fetch('/api/postNewArticle', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status);
            }
            const articleId = await response.text(); // to be passed into notifications

            // Handle the response from the server
            toastMessage.innerText = `Article ID: ${articleId}, URL after response: ${window.location.href}`;
            //remove user input from text editor
            quill.deleteText(0, quill.getLength());
            //remove other user input
            document.getElementById("write_article_title").value = "";

            alert("New article added!")

            // send and create notifications to subscribers
            await fetch('/api/create-new-article-notif-for-subs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articleId }),
            });
        } catch (error) {
            // Handle any errors that occur during the request
            toastMessage.innerText = error + ". Potential cause: Image uploading is not supported yet.";
            //remove user input from text editor
            quill.deleteText(0, quill.getLength());
            //remove other user input
            document.getElementById("write_article_title").value = "";
        }
    });

});