window.addEventListener(`load`, function () {
    console.log("shelom")
    const searchBarForm = document.querySelector("#searchInput")
    const searchByTitleContainer = document.querySelector("#searchByTitle")
    const searchByAuthorContainer = document.querySelector("#searchByAuthor")
    const searchNavBar = document.querySelector(".search_bar")

    window.addEventListener(`click`, (e)=>{
        console.log(e.target)
        if(e.target.className != "search"){
            searchNavBar.style.overflow = "hidden"
            searchNavBar.style.border="1px solid black"
        }
     
    })

    searchNavBar.addEventListener(`click`,()=>{
        searchNavBar.style.overflow = "visible"
        searchNavBar.style.border = "7px solid purple"
        searchBarForm.style.border = "transparent"
    })


    searchBarForm.addEventListener(`input`, async (e) => {
        searchNavBar.style.overflow = "visible"
        searchByTitleContainer.innerHTML = ""
        searchByAuthorContainer.innerHTML = ""
        const results = await getSearchResults(e)

        const resultByTitle = results["articlesByTitle"]
        const resultsByUser = results["articlesByUser"]

        if (resultByTitle != null) {
            const byTitleHeader = document.createElement("div")
            byTitleHeader.innerHTML = "<h2>Matching Title</h2>"
            searchByTitleContainer.append(byTitleHeader)
            for (let i = 0; i < resultByTitle.length; i++) {
                const searchResultDiv = document.createElement("div")
                searchResultDiv.setAttribute("id", `${resultByTitle[i]["article_id"]}`)
                const searchResult = document.createElement("p")
                searchResult.setAttribute("id", `${resultByTitle[i]["article_id"]}`)
                searchResult.innerText = `${resultByTitle[i]["title"]}`
                searchResultDiv.append(searchResult)
                searchResultDiv.addEventListener(`click`, (e)=>{
                    window.location.href = `/article/${e.target.id}`
                })
                searchByTitleContainer.append(searchResultDiv)
            }
        }

        if (resultsByUser != null) {
            const byUserHeader = document.createElement("div")
            byUserHeader.innerHTML = "<h2>Matching user</h2>"
            searchByTitleContainer.append(byUserHeader)
            for (let i = 0; i < resultsByUser.length; i++) {
                const searchResultDiv = document.createElement("div")
                searchResultDiv.setAttribute("id", `${resultsByUser[i]["user_id"]}`)
                const searchResult = document.createElement("p")
                searchResult.setAttribute("id", `${resultsByUser[i]["user_id"]}`)
                searchResult.innerText = `${resultsByUser[i]["fname"]} ${resultByTitle[i]["lname"]}`
                searchResultDiv.addEventListener(`click`, (e)=>{
                    
                    
                    //add user route here, 
                    window.location.href = `/`
                })
                searchResultDiv.append(searchResult)
                searchByAuthorContainer.append(searchResultDiv)
            }
        }

    })

    async function getSearchResults(e) {
        e.preventDefault()
        const response = await fetch(`/api/get-search?searchTerm=a`)
        const list = await response.json()

        return list
    }

})