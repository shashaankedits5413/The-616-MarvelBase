/* =========================================================
   THE 616 MARVELBASE
   THEME SYSTEM
   ========================================================= */

const THEME_STORAGE_KEY = "the616-theme";

const THEMES = {
    classic: {
        name: "616 CLASSIC",
        accent: "#24D7E8"
    },

    stark: {
        name: "STARK PROTOCOL",
        accent: "#FF4A3D"
    },

    multiverse: {
        name: "MULTIVERSE",
        accent: "#B56CFF"
    },

    doom: {
        name: "DOOM",
        accent: "#39D98A"
    }
};


/* =========================================================
   APPLY THEME
   ========================================================= */

function applyTheme(theme) {

    if (!THEMES[theme]) {
        theme = "classic";
    }

    document.body.dataset.theme = theme;

    localStorage.setItem(
        THEME_STORAGE_KEY,
        theme
    );

    updateThemeButtons(theme);
}


/* =========================================================
   UPDATE ACTIVE BUTTON
   ========================================================= */

function updateThemeButtons(activeTheme) {

    document
        .querySelectorAll(".theme-option")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme === activeTheme
            );
        });
}


/* =========================================================
   CREATE THEME CONTROL
   ========================================================= */

function createThemeControl() {
    const control = document.createElement("div");
    control.className = "theme-control";

    control.innerHTML = `
        <button
            class="theme-toggle"
            type="button"
            aria-label="Change theme"
            aria-expanded="false"
        >
            <span class="theme-toggle-icon">◈</span>
            <span class="theme-toggle-label">THEME</span>
        </button>

        <div class="theme-menu">

           

            ${Object.entries(THEMES)
                .map(([id, theme]) => `
                    <button
                        class="theme-option"
                        type="button"
                        data-theme="${id}"
                    >
                        <span
                            class="theme-swatch"
                            style="--swatch:${theme.accent}"
                        ></span>

                        <span class="theme-option-text">
                            ${theme.name}
                        </span>

                        <span class="theme-check">✓</span>
                    </button>
                `)
                .join("")}

        </div>
    `;

    document.body.appendChild(control);

    const toggle = control.querySelector(".theme-toggle");

    toggle.addEventListener("click", event => {
        event.stopPropagation();

        const open = control.classList.toggle("open");

        toggle.setAttribute(
            "aria-expanded",
            String(open)
        );
    });

    control
        .querySelectorAll(".theme-option")
        .forEach(button => {
            button.addEventListener("click", () => {

                applyTheme(button.dataset.theme);

                control.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });

    document.addEventListener("click", event => {
        if (!control.contains(event.target)) {
            control.classList.remove("open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
}


/* =========================================================
   LOAD SAVED THEME
   ========================================================= */

function loadSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );

    applyTheme(
        THEMES[savedTheme]
            ? savedTheme
            : "classic"
    );
}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createThemeControl();

        loadSavedTheme();

    }
);