var xValues, yValues, intGraph, intensity;

function initGraph() {
    xValues = [];
    yValues = [];

    for (var i = 0; i < 12; i++) {
        xValues.push(-11+i);
        yValues.push(NaN);
    }

    intGraph = new Chart("intGraph", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Intensity Vs Time (Seconds)",
                data: yValues,
                borderColor: "red",
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{ticks: { min: -10, max: 0}}],
                yAxes: [{ticks: { min: 0, max: 100}}]
            }
        }
    });
}

function updateGraph() {
    getIntensity();

    yValues.shift();
    yValues.push(intensity);

    intGraph.data.datasets[0].data = yValues;
    intGraph.update();
}

function getIntensity() {
    return fetch("../../data/graph.json")
        .then(response => response.json())
        .then(data => {
            intensity = Math.min(Math.max(data.graph, 0.0), 100.0);
        });
}
