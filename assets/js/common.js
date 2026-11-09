// ヘッダー・メニュー等、共通の動作を実装してください。

// hamburger menu

// Hamburger Menu
document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#fullscreen-menu");
    const closeButton = document.querySelector(".menu-close");

    if (!hamburger || !menu || !closeButton) {
        console.error("Hamburger menu elements not found.");
        return;
    }

    function openMenu() {
        menu.classList.add("is-open");

        menu.setAttribute("aria-hidden", "false");
        hamburger.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        menu.classList.remove("is-open");

        menu.setAttribute("aria-hidden", "true");
        hamburger.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }

    // Open menu
    hamburger.addEventListener("click", openMenu);

    // Close menu
    closeButton.addEventListener("click", closeMenu);

    // Close when clicking navigation links
    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // Close using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu();
        }

    });

});
