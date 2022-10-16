var table, list, parent;

function initList() {
    table = document.getElementById("listTable");
    parent = document.getElementById("divList");
}

function updateList() {
    getList();

    var newTable = document.createElement('table');
    var head = document.createElement('tr');
    head.insertCell(0).innerHTML = "MAC Address";
    head.insertCell(1).innerHTML = "Signal Strength";
    newTable.appendChild(head);

    for (var i = 0; i < list.length; i++) {
        var row = document.createElement('tr');
        row.insertCell(0).innerHTML = list[i].MAC;
        row.insertCell(1).innerHTML = list[i].signal;
        newTable.appendChild(row);
    }

    parent.removeChild(table);
    parent.appendChild(newTable);
    table = parent.children[0];
}

function getList() {
    fetch("/home/jemz/Desktop/RouterControl/docs/data/list.json")
        .then(response => response.json())
        .then(data => {
            list = data;
        });
}
