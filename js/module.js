function populateModuleTable() {
    let moduleTable = document.getElementsByClassName("module-table")[0];
    let tbody = moduleTable.getElementsByTagName("tbody")[0];

    // Clear existing rows
    tbody.innerHTML = "";

    // Sample module data
    fetch("../data/module.json")
        .then(response => response.json())
        .then(modules => {
            modules.forEach((module, index) => {
                let row = tbody.insertRow();
                row.insertCell(0).innerText = module.kodeLokasi;
                row.insertCell(1).innerText = module.kodeBarang;
                row.insertCell(2).innerText = module.namaBarang;
                row.insertCell(3).innerText = module.jenisBarang;
                row.insertCell(4).innerText = module.edisi;
                row.insertCell(5).innerText = module.stok;

                let actionCell = row.insertCell(6);
                let detailButton = document.createElement("button");
                detailButton.innerText = "View Detail";
                detailButton.className = "view-detail-btn btn-primary";
                detailButton.style.padding = "6px 12px";
                detailButton.style.cursor = "pointer";
                detailButton.style.backgroundColor = "#007BFF";
                detailButton.style.color = "white";
                detailButton.style.border = "none";
                detailButton.style.borderRadius = "4px";
                detailButton.onmouseover = () => detailButton.style.backgroundColor = "#0056b3";
                detailButton.onmouseout = () => detailButton.style.backgroundColor = "#007BFF";

                detailButton.onclick = () => {
                    // Show modal with details
                    document.getElementById("modalCover").src = "../" + module.cover;
                    document.getElementById("modalTitle").innerText = module.namaBarang;
                    document.getElementById("modalKode").innerText = module.kodeBarang;
                    document.getElementById("modalLokasi").innerText = module.kodeLokasi;
                    document.getElementById("modalJenis").innerText = module.jenisBarang;
                    document.getElementById("modalEdisi").innerText = module.edisi;
                    document.getElementById("modalStok").innerText = module.stok;

                    document.getElementById("moduleModal").style.display = "block";
                };
                actionCell.appendChild(detailButton);
            });
        })
        .catch(error => console.error("Error loading module data:", error));
}

// Logic to close the modal
document.addEventListener("DOMContentLoaded", () => {
    let modal = document.getElementById("moduleModal");
    let closeBtn = document.getElementById("closeModal");

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Close when clicking outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

(() => { populateModuleTable(); })();