document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const suggestionBox = document.getElementById("suggestion-box");
    const cardTracking = document.getElementById("card-tracking");

    let trackingData = {};

    // Load JSON data
    fetch("../data/tracking.json")
        .then(response => response.json())
        .then(data => {
            trackingData = data;
        })
        .catch(error => console.error("Error loading tracking data:", error));

    // Handle input
    searchInput.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();
        suggestionBox.innerHTML = "";

        if (query.length === 0) {
            suggestionBox.style.display = "none";
            return;
        }

        const matches = Object.keys(trackingData).filter(key => 
            key.toLowerCase().includes(query) || 
            trackingData[key].nama.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            suggestionBox.style.display = "block";
            matches.forEach(key => {
                const item = trackingData[key];
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.textContent = `${item.nomorDO} - ${item.nama}`;
                suggestionItem.addEventListener("click", () => {
                    displayTrackingDetail(item);
                    suggestionBox.style.display = "none";
                    searchInput.value = item.nomorDO;
                });
                suggestionBox.appendChild(suggestionItem);
            });
        } else {
            suggestionBox.style.display = "none";
        }
    });

    // Hide suggestion box on outside click
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
            suggestionBox.style.display = "none";
        }
    });

    function displayTrackingDetail(item) {
        cardTracking.style.display = "flex";
        cardTracking.style.flexDirection = "column";
        cardTracking.innerHTML = `
            <h3>Detail Pengiriman</h3>
            <p><strong>Nomor DO:</strong> ${item.nomorDO}</p>
            <p><strong>Nama Penerima:</strong> ${item.nama}</p>
            <p><strong>Status:</strong> ${item.status}</p>
            <p><strong>Ekspedisi:</strong> ${item.ekspedisi}</p>
            <p><strong>Tanggal Kirim:</strong> ${item.tanggalKirim}</p>
            <p><strong>Paket:</strong> ${item.paket}</p>
            <p><strong>Total Pembayaran:</strong> ${item.total}</p>

            <h4 style="margin-bottom: 5px; margin-top: 15px;">Timeline Perjalanan:</h4>
            <div class="timeline-container">
                <ul class="timeline">
                    ${item.perjalanan.slice().reverse().map((p, index) => `
                        <li class="timeline-item ${index === 0 ? 'active' : ''}">
                            <span class="timeline-time">${p.waktu}</span>
                            <p class="timeline-desc">${p.keterangan}</p>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `;
    }
});