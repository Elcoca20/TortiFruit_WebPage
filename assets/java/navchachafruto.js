const menuToggle = document.getElementById("menu-toggle");
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        document.querySelector(".nav-menu").classList.toggle("active");
    });
}