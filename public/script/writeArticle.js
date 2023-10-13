window.addEventListener("load", function () {

    const toolBox = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],       
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['image', 'code-block']
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
        //Convert content into json object.
        // const actualContent = JSON.parse(content.value);
        const actualContent = content.value;

        const newArticleData = {
            titleKey: title,
            genreKey: genre,
            contentKey: actualContent
        }

        const toastMessage = document.getElementById("write-article-toast-message");

        try {
            const response = await fetch('/api/postNewArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newArticleData)
            });

            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status);
            }

            const responseData = await response.text();

            // Handle the response from the server
            toastMessage.innerText = responseData + 'URL after response:' + window.location.href;
            //remove user input from text editor
            quill.deleteText(0, quill.getLength());
            //remove other user input
            document.getElementById("write_article_title").value = "";


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