var widChart, ctx, width;

function initInfo() {
    widChart = document.getElementById("widChart");
    render();

    ctx = widChart.getContext("2d");
    updateInfo();
}

function updateInfo() {
    width = getWidth();
    var outer = Math.min(widChart.width, widChart.height) / 2;
    var inner = outer - (width / 100.0 * outer);
    drawCircle(outer, inner);
}

function drawCircle(outer, inner) {
    var cx = widChart.width / 2, cy = widChart.height / 2;

    ctx.lineWidth = outer-inner;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = 'blue';
    ctx.globalAlpha = 0.50;

    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, 2*Math.PI);
    ctx.stroke();
}

function getWidth() {
    fetch("../../data/info.json")
        .then(response => response.json())
        .then(data => {
            console.log(Math.min(Math.max(data.info, 0.0), 100.0));
        }
    );
}

function render() {
    const dimensions = getObjectFitSize(
        true,
        widChart.clientWidth,
        widChart.clientHeight,
        widChart.width,
        widChart.height
    );

    widChart.width = dimensions.width;
    widChart.height = dimensions.height;
}

function getObjectFitSize(contains, containerWidth, containerHeight, width, height) {
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = contains ? doRatio > cRatio : doRatio < cRatio;

    if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
    } else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
    }

    return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2
    };
}
