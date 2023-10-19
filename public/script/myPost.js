window.addEventListener(`load`, async function(){

    const deleteButton = document.querySelectorAll(".delete-button")
    const articleCount = document.querySelector("#article-count-header")
    const dropDownDiv = document.querySelector(".each-posts-links")

    let articleCounter = deleteButton.length

    deleteButton.forEach((e,i)=>{
        deleteButton[i].addEventListener(`click`, async(e)=>{
            let articleId = e.target.getAttribute("article-id")
            if(confirm("are you sure you want to delete this article?")){
                await deleteArticle(articleId)
                const elementToRemove =document.querySelector(`#article${articleId}`)
                articleCounter--
                elementToRemove.innerHTML = "<h2>article has been deleted</h2>"
                articleCount.innerHTML = `your stories(${articleCounter})`
            }else{
                txt = "cancelled"
            }
        })
    })
    

    async function deleteArticle(id){
        await fetch(`/api/delete-article?articleId=${id}`)
        alert("Article deleted")
    }
})