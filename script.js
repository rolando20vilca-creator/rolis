
// Efecto de aparición de las secciones
document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.querySelector(".theme-toggle");
    const themeIcon = themeButton?.querySelector("i");
    const savedTheme = localStorage.getItem("theme");

    const setTheme = (theme) => {
        const isDark = theme === "dark";

        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);

        if (themeButton) {
            themeButton.setAttribute(
                "aria-label",
                isDark ? "Cambiar a modo día" : "Cambiar a modo noche"
            );
            themeButton.setAttribute(
                "title",
                isDark ? "Cambiar a modo día" : "Cambiar a modo noche"
            );
        }

        if (themeIcon) {
            themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
        }
    };

    setTheme(savedTheme === "dark" ? "dark" : "light");

    themeButton?.addEventListener("click", () => {
        const nextTheme =
            document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });

    const elementos = document.querySelectorAll(
        ".section, .tech-card, .timeline-item"
    );

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elementos.forEach((elemento) => {
        observer.observe(elemento);
    });

});
