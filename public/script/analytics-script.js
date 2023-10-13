window.addEventListener(`load`, async function(){

    let information = null;
    async function getInformation(){
        const response = await fetch(`/api/get-analytics`)
        information = await response.json();
    }
    await getInformation()
    console.log(information)
})