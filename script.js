
// Efecto de aparición de las secciones
document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.querySelector(".typewriter-text");
    const title = "Arquitectura de Plataformas y Servicios de TI";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typewriter) {
        if (reduceMotion) {
            typewriter.textContent = title;
        } else {
            let characterIndex = 0;
            const typeNextCharacter = () => {
                if (characterIndex >= title.length) {
                    return;
                }

                typewriter.textContent += title[characterIndex];
                characterIndex += 1;
                window.setTimeout(typeNextCharacter, 48);
            };

            window.setTimeout(typeNextCharacter, 450);
        }
    }

    const cursorTrail = document.querySelector(".cursor-trail");
    const trailDots = cursorTrail?.querySelectorAll("span");
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (cursorTrail && trailDots?.length && finePointer && !reduceMotion) {
        const positions = Array.from(trailDots, () => ({ x: 0, y: 0 }));
        let pointerX = 0;
        let pointerY = 0;
        let animationFrame = 0;
        let hasPointerPosition = false;

        const animateTrail = () => {
            animationFrame = 0;
            let isMoving = false;

            positions.forEach((position, index) => {
                const target = index === 0
                    ? { x: pointerX, y: pointerY }
                    : positions[index - 1];
                const easing = index === 0 ? 0.34 : 0.24;
                const deltaX = target.x - position.x;
                const deltaY = target.y - position.y;

                position.x += deltaX * easing;
                position.y += deltaY * easing;
                isMoving = isMoving || Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1;
                trailDots[index].style.transform =
                    `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
            });

            if (isMoving) {
                animationFrame = window.requestAnimationFrame(animateTrail);
            }
        };

        document.addEventListener("pointermove", (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;
            cursorTrail.classList.add("is-active");

            if (!hasPointerPosition) {
                positions.forEach((position) => {
                    position.x = pointerX;
                    position.y = pointerY;
                });
                hasPointerPosition = true;
            }

            if (!animationFrame) {
                animationFrame = window.requestAnimationFrame(animateTrail);
            }
        });

        document.addEventListener("pointerleave", () => {
            cursorTrail.classList.remove("is-active");
        });
    }

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
