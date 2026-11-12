// ヘッダー・メニュー等、共通の動作を実装してください。

// hamburger menu
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

// for top initial animation
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
        ".top-news-section, .top-about-section, .top-about-your-stay-section, .top-gallery-wrapper, .top-stories-section, .banner-section, .site-footer"
    );

    // Check if the page was reloaded manually by the user
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    // If it's a manual refresh, clear the flag so the animation replays
    if (isReload) {
        sessionStorage.removeItem("erumi_sections_revealed");
    }

    // If already revealed during this browsing session (and NOT a refresh), show instantly
    if (sessionStorage.getItem("erumi_sections_revealed") === "true") {
        sections.forEach((section) => {
            section.classList.add("is-visible");
        });
        return;
    }

    // Otherwise, apply reveal class and setup the observer
    sections.forEach((section) => {
        section.classList.add("reveal-section");
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            let hasAnimated = false;
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                    hasAnimated = true;
                }
            });

            if (hasAnimated) {
                sessionStorage.setItem("erumi_sections_revealed", "true");
            }
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    sections.forEach((section) => observer.observe(section));
});
