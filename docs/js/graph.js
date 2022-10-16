var xValues, yValues, intChart;

function initGraph() {
    xValues = [];
    yValues = [];
    for (var i = 0; i < 12; i++) {
        xValues.push(-11+i);
        yValues.push(NaN);
    }
    intChart = new Chart("intChart", {
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
    intensity = getIntensity(wifiAvailable);
    yValues.shift();
    yValues.push(intensity);
    intChart.data.datasets[0].data = yValues;
    intChart.update();
}

function getIntensity() {
    // Update with intensity with backend here
    if (wifiAvailable) return Math.floor(Math.random() * 100);
    else return NaN;
}
