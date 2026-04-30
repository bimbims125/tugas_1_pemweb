// EMAIL VALIDATION
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function login() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value;
    const password = passwordInput.value;

    emailInput.classList.remove("error");

    // email validation
    if (!isValidEmail(email)) {
        emailInput.classList.add("error");
        showPopup("Format email tidak valid!", "error");
        return;
    }
    const res = await fetch("data/users.json");
    const users = await res.json();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        window.location.href = "pages/dashboard.html";
    } else {
        showPopup("Username atau password salah!", "error");
    }
}

function showPopup(message, type = "info") {
    const popup = document.getElementById("popup");
    const msg = document.getElementById("popupMessage");
    const box = document.querySelector(".popup-content");

    msg.innerText = message;

    // warna berdasarkan type
    if (type === "success") {
        box.style.borderTop = "10px solid green";
    } else if (type === "error") {
        box.style.borderTop = "10px solid red";
    } else {
        box.style.borderTop = "10px solid blue";
    }

    popup.style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// klik X
document.getElementById("closePopup").onclick = closePopup;

// klik luar popup
window.onclick = function(e) {
    const popup = document.getElementById("popup");
    if (e.target === popup) {
        closePopup();
    }
};