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
        console.log(searchBarForm.value)
        const results = await getSearchResults(searchBarForm.value)

        const resultByTitle = results["articlesByTitle"]
        const resultsByUser = results["articlesByUser"]

        if (resultByTitle != undefined) {
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

        if (resultsByUser != undefined) {
            const byUserHeader = document.createElement("div")
            byUserHeader.innerHTML = "<h2>Matching user</h2>"
            searchByTitleContainer.append(byUserHeader)
            for (let i = 0; i < resultsByUser.length; i++) {
                const searchResultDiv = document.createElement("div")
                searchResultDiv.setAttribute("id", `${resultsByUser[i]["user_id"]}`)
                const searchResult = document.createElement("p")
                searchResult.setAttribute("id", `${resultsByUser[i]["user_id"]}`)
                searchResult.innerText = `${resultsByUser[i]["fname"]} ${resultsByUser[i]["lname"]}`
                searchResultDiv.addEventListener(`click`, (e)=>{
                    
                    
                    //add user route here, 
                    window.location.href = `/`
                })
                searchResultDiv.append(searchResult)
                searchByAuthorContainer.append(searchResultDiv)
            }
        }

    })

    async function getSearchResults(search) {
        const response = await fetch(`/api/get-search?searchTerm=${search}`)
        const list = await response.json()

        return list
    }




    var today = new Date();
var current_month = today.getMonth();
var current_year = today.getFullYear();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Cached elements
var calendar_title = document.getElementById("current-month-year");
var tbody = document.getElementById("calendar-body");

displayCalendar(current_month, current_year);

function displayCalendar(month, year){ 
	calendar_title.innerHTML = months[month] + " " + year;
	var first_day = new Date(year, month, 1);
	var weekday_start = first_day.getDay();
	tbody.innerHTML = "" ;
	date = 1;
	for(var row = 0; row < 6; row++){
		var tr = document.createElement('tr');
		for(var cell = 0; cell < 7; cell++){
			var td = document.createElement('td');
			if(row===0 && cell< weekday_start){
				td.appendChild(document.createTextNode(""));
			}else if(date > getDaysInMonth(month, year)){
				break;
			}else{
				var full_date = new Date(year, month, date);
				if(date == today.getDate() && year == today.getFullYear() && month == today.getMonth()){
					td.className += "today ";
				}
				if(Math.round(Math.abs(today.getTime() - full_date.getTime()) / (1000 * 60 * 60 * 24)) < 90) {
					td.className += "clickable";
				}
				td.appendChild(document.createTextNode(date));
				date++;
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
}
function getDaysInMonth(month, year){
	return 32 - new Date(year, month, 32).getDate();
}
function prevMonth(){
	current_year = (current_month === 0) ? current_year - 1 : current_year;
	current_month = (current_month === 0) ? 11 : current_month - 1;
	displayCalendar(current_month, current_year);
}
function nextMonth(){
	current_year = (current_month === 11) ? current_year + 1 : current_year;
	current_month = (current_month + 1) % 12;
	displayCalendar(current_month, current_year);
}
document.addEventListener('click', function (event) {
	var span = document.getElementsByClassName("close")[0];
	var modal = document.getElementById('alert-modal');
	var modal_paragraph = document.getElementById('modal-text');

	if(!event.target.matches('td.clickable')) return;
	event.preventDefault();
	day_clicked = Number(event.target.innerHTML);
	modal_paragraph.textContent = "You clicked on " + (current_month+1) + "/" + day_clicked + "/" + current_year + "!";
	modal.style.display = "block";
	span.onclick = function() {
		modal.style.display = "none";
	};
}, false);

})