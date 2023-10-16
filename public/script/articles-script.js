// window.addEventListener('load', async function () {
//     const top5_button_array = document.querySelectorAll('.btn_readmore');
//     await generateReadMoreLinks();

//     async function generateReadMoreLinks() {
//         const response = await fetch(`/api/get-top5-articles-from-db`);
//         console.log(response);
//         const articles = await response.json();

//         for (let i = 0; i < articles.length; i++) {
//             const author_id = articles[i].author_id;
//             const article_response = await fetch(
//                 `/api/get-article-by-id?id=${author_id}`
//             );
//             const article = await article_response.json();
//             console.log(article);
//             top5_button_array[i].addEventListener('click', async () => {
//                 await fetch(`/article?article=${JSON.stringify({article})}`);
//             });
//         }
//     }
//     const buttons = document.querySelectorAll('.btn_readmore');
//     for (button of buttons) {
//         button.addEventListener('click', async () => {});
//     }
// });
