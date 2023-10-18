window.addEventListener(`load`, async function(){

    const deleteButton = document.querySelector(".delete-button")

    deleteButton.addEventListener(`click`, async(e)=>{
        let articleId = e.target.getAttribute("article-id")
        console.log(articleId)
        if(confirm("are you sure you want to delete this article?")){
            await deleteArticle(articleId)
            txt = "article deleted "
        }else{
            txt = "cancelled"
        }
    })

    async function deleteArticle(id){
        await fetch(`/api/delete-article?articleId=${id}`)
    }
})