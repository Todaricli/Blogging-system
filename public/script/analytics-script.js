window.addEventListener(`load`, async function () {

    let information = null;
    async function getInformation() {
        const response = await fetch(`/api/get-analytics`)
        information = await response.json();
    }
    // await getInformation()

    console.log(information)
    const date = new Date();
    const yesterday = new Date(date - 86400000)
    let day = 0


    console.log(date)

    console.log(new Date(yesterday - 86400000));

    let x1 = []
    let y1 = []
    for (let i = 0; i < 10; i++) {
        let newDate = new Date(date - day)
        x1.unshift(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`)
        day += 86400000;
    }
    console.log(x1)
    for (let i = 0; i < x1.length; i++) {
        let yEle = await fetch(`/api/get-search/single-date?searchDate=${x1[i]}`)
        let yJson = await yEle.json()
        let totatCommentCount = 0
        for (let i = 0; i < yJson["articlesByDate"].length; i++) {
            if (yJson["articlesByDate"][i]["comments_count"] != undefined) {
                totatCommentCount += yJson["articlesByDate"][i]["comments_count"]
            }
            // console.log(yJson["articlesByDate"][i]["comments_count"])
        }
        y1.unshift(totatCommentCount)
        // console.log(yJson)
    }

    const update = {
        width:800,
        height:300
    }

    plot = document.getElementById('plot');
    Plotly.newPlot(plot, [{
        x: x1,
        y: y1
    }], {
        title: {
            text:'Number of comments in Last 10 Days',
            font: {
              family: 'Courier New, monospace',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          },xaxis: {
            showgrid: false
        },
        yaxis: {
            showgrid: false,
            showline: true
        }
    });
    Plotly.relayout(`plot`,update)

})