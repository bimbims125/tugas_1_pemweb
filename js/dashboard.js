async function loadComponent(id, file) {
    return fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

Promise.all([
    loadComponent("navbar", "../components/navbar.html"),
    loadComponent("sidebar", "../components/sidebar.html")
]).then(() => {
    const toggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebarMenu");

    if (toggle && sidebar) {
        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }
});