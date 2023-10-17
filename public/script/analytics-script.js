window.addEventListener(`load`, async function(){

    let information = null;
    async function getInformation(){
        const response = await fetch(`/api/get-analytics`)
        information = await response.json();
    }
    await getInformation()

    console.log(information)
    
    TESTER = document.getElementById('plot');
	Plotly.newPlot( TESTER, [{
	x: [1, 2, 3, 4, 5,6],
	y: [3, 2, 4, 8, 2,15 ] }], {
	margin: { t: 0 } } );

})