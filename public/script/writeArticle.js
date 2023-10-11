window.addEventListener("load", function () {

const quill = new Quill('#write_article_content', {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image', 'code-block']
        ]
    },
    scrollingContainer: '#scrolling-container',
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
});

const form = document.querySelector('#write_article_form');

form.addEventListener('submit', function () {

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

    fetch('/postNewArticle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticleData), // Convert data to JSON format
    })
        .then(response => response.json()) // Handle the response from the server
        .then(data => {
            console.log('Response from the server:', data);
            // You can perform further actions with the server's response here
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

});