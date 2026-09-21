
function loadFooter() {
    const footer = document.getElementById("footer");

    if (!footer) {
        return;
    }

    const footerPath = window.location.pathname.includes("/html/")
        ? "footer.html"
        : "html/footer.html";

    fetch(footerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Footer file not found: " + response.status);
            }

            return response.text();
        })
        .then(data => {
            footer.innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading Footer:", error);
        });
}
function loadnav() {
    const navElement = document.getElementById("nav");

    if (!navElement) {
        return;
    }

    const navPath = window.location.pathname.includes("/html/")
        ? "navi.html"
        : "html/navi.html";

    fetch(navPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Navigation file not found: " + response.status);
            }

            return response.text();
        })
        .then(data => {
            navElement.innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading navigation:", error);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    loadnav();
    loadFooter();});