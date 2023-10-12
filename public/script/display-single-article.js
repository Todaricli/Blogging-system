window.addEventListener("load", function () {

    retrieveArtcileInWysiwygFormat();

    async function retrieveArtcileInWysiwygFormat() {
        const articleContentDiv = document.getElementById("article_content");
        console.log("articleContent");
        const articleContent = await fetch("/displaySingleArticleWithDelta");
        const actualContent = await articleContent.text();
        articleContentDiv.innerHTML = actualContent;
    };
});

