var wifiAvailable;

function initWifi() {
    wifiAvailable = false;
    document.getElementById("wifi").style.backgroundColor = "red";
}

function updateWifi() {
    if (wifiAvailable) disconnectWifi();
    else connectWifi();
}

function disconnectWifi() {
    // Disconnect from wifi with backend here
    wifiAvailable = false;
    document.getElementById("wifi").style.backgroundColor = "red";
    disconnectControl();
}

function connectWifi() {
    // Connect to wifi with backend here
    wifiAvailable = true;
    document.getElementById("wifi").style.backgroundColor = "green";
}
