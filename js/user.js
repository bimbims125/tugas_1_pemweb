
function populateUserTable() {
    let userTable = document.getElementsByClassName("user-table")[0];
    let tbody = userTable.getElementsByTagName("tbody")[0];

    // Clear existing rows
    tbody.innerHTML = "";

    // Sample user data
    fetch("../data/users.json")
        .then(response => response.json())
        .then(users => {
            users.forEach((user, index) => {
                let row = tbody.insertRow();
                row.insertCell(0).innerText = index + 1;
                row.insertCell(1).innerText = user.nama;
                row.insertCell(2).innerText = user.email;
                row.insertCell(3).innerText = user.role;
                row.insertCell(4).innerText = user.lokasi;
            });
        })
        .catch(error => console.error("Error loading user data:", error));
}

(()=>{populateUserTable();})();