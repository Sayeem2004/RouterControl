var controlAvailable;

function initControl() {
    controlAvailable = false;
    document.getElementById("onoff").style.backgroundColor = "red";
}

function updateControl() {
    if (controlAvailable) disconnectControl();
    else connectControl();
}

function disconnectControl() {
    // Stop limiting with backend here
    controlAvailable = false;
    document.getElementById("onoff").style.backgroundColor = "red";
}

function connectControl() {
    // Start limiting with backend here
    controlAvailable = true;
    document.getElementById("onoff").style.backgroundColor = "green";
}
