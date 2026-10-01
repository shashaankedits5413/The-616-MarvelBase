/* =========================================
   THE 616 MARVELBASE
   616 SYSTEM CLOCK
   ========================================= */

(() => {
    "use strict";

    // Prevent duplicate panels if the script is accidentally loaded twice.
    if (document.getElementById("system-clock")) {
        return;
    }

    /* =====================================
       PANEL STYLES
       ===================================== */

    const style = document.createElement("style");

    style.textContent = `
        #system-clock {
            position: fixed;
            left: 22px;
            bottom: 22px;
            z-index: 100000;

            width: 220px;
            padding: 16px 18px;

            color: var(--theme-text, #FFFFFF);
            background: var(--theme-card, #0B1A2E);
            border: 1px solid var(--theme-border, #1B2C45);
            border-radius: 14px;

            font-family: Arial, sans-serif;
            backdrop-filter: blur(14px);

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.28);

            transition:
                background 0.25s ease,
                border-color 0.25s ease,
                box-shadow 0.25s ease;
        }

        #system-clock .system-clock-label {
            margin: 0 0 9px;

            color: var(--theme-accent, #24D7E8);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
        }

        #system-clock .system-clock-time {
            margin: 0;

            color: var(--theme-text, #FFFFFF);
            font-size: 27px;
            font-weight: 700;
            letter-spacing: 1px;
            font-variant-numeric: tabular-nums;
        }

        #system-clock .system-clock-date {
            margin: 5px 0 14px;

            color: var(--theme-muted, #8A98AA);
            font-size: 11px;
            letter-spacing: 0.3px;
        }

        #system-clock .system-clock-divider {
            height: 1px;
            margin-bottom: 12px;

            background: var(--theme-border, #1B2C45);
        }

        #system-clock .system-clock-status {
            display: flex;
            align-items: center;
            gap: 8px;

            color: var(--theme-text, #FFFFFF);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.1px;
        }

        #system-clock .system-clock-indicator {
            width: 7px;
            height: 7px;
            flex: 0 0 7px;

            border-radius: 50%;
            background: var(--theme-accent, #24D7E8);

            box-shadow:
                0 0 10px var(--theme-glow, rgba(36, 215, 232, 0.2));
        }

        #system-clock .system-clock-sync {
            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-top: 10px;

            color: var(--theme-muted, #8A98AA);
            font-size: 10px;
        }

        #system-clock .system-clock-sync strong {
            color: var(--theme-accent, #24D7E8);
            font-weight: 700;
        }
                    /* =====================================
           MINIMIZED STATE
           ===================================== */

        #system-clock .system-clock-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            cursor: grab;
            user-select: none;
            touch-action: none;
        }

        #system-clock .system-clock-header:active {
            cursor: grabbing;
        }

        #system-clock .system-clock-minimize {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 25px;
            height: 25px;
            padding: 0;

            border: 1px solid var(--theme-border, #1B2C45);
            border-radius: 7px;

            background: var(--theme-card-alt, #0E2037);
            color: var(--theme-muted, #8A98AA);

            font-size: 17px;
            line-height: 1;
            cursor: pointer;

            opacity: 0;
            pointer-events: none;

            transition:
                opacity 0.2s ease,
                color 0.2s ease,
                border-color 0.2s ease;
        }

        #system-clock:hover .system-clock-minimize,
        #system-clock:focus-within .system-clock-minimize {
            opacity: 1;
            pointer-events: auto;
        }

        #system-clock .system-clock-minimize:hover {
            color: var(--theme-accent, #24D7E8);
            border-color: var(--theme-accent, #24D7E8);
        }

        #system-clock.is-minimized {
            width: auto;
            min-width: 165px;
            padding: 12px 15px;
        }

        #system-clock.is-minimized .system-clock-content {
            display: none;
        }

        #system-clock.is-minimized .system-clock-minimize {
            opacity: 1;
            pointer-events: auto;
        }
                    #system-clock.is-minimized::after {
            content: "● DATABASE ONLINE";
            display: block;

            margin-top: 7px;

            color: var(--theme-accent, #24D7E8);
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1px;
        }

        @media (max-width: 650px) {
            #system-clock {
                left: 12px;
                bottom: 12px;
                width: 185px;
                padding: 13px 14px;
            }

            #system-clock .system-clock-time {
                font-size: 23px;
            }
        }

        @media (max-width: 420px) {
            #system-clock {
                width: 160px;
                padding: 11px 12px;
            }

            #system-clock .system-clock-time {
                font-size: 20px;
            }

            #system-clock .system-clock-date {
                font-size: 10px;
            }
        }
    `;

    document.head.appendChild(style);


    /* =====================================
       PANEL HTML
       ===================================== */

    const panel = document.createElement("section");

    panel.id = "system-clock";
    panel.setAttribute("aria-label", "616 System Status");

    panel.innerHTML = `
    <div class="system-clock-header" id="system-clock-drag-handle">
        <p class="system-clock-label">THE 616 SYSTEM</p>

        <button
            class="system-clock-minimize"
            id="system-clock-minimize"
            type="button"
            aria-label="Minimize system clock"
            title="Minimize / restore"
        >−</button>
    </div>

    <div class="system-clock-content">
        <p
            class="system-clock-time"
            id="system-clock-time"
            aria-live="off"
        >--:--:--</p>

        <p
            class="system-clock-date"
            id="system-clock-date"
        >Synchronizing date...</p>

        <div class="system-clock-divider"></div>

        <div class="system-clock-status">
            <span class="system-clock-indicator"></span>
            <span>DATABASE ONLINE</span>
        </div>

        <div class="system-clock-sync">
            <span>System sync</span>
            <strong>100%</strong>
        </div>
    </div>
`;

    document.body.appendChild(panel);

        /* =====================================
       MINIMIZE / RESTORE
       ===================================== */

    const minimizeButton =
        document.getElementById("system-clock-minimize");

    minimizeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        panel.classList.toggle("is-minimized");

        const minimized =
            panel.classList.contains("is-minimized");

        minimizeButton.textContent =
            minimized ? "+" : "−";

        minimizeButton.setAttribute(
            "aria-label",
            minimized
                ? "Restore system clock"
                : "Minimize system clock"
        );

        minimizeButton.title =
            minimized
                ? "Restore clock"
                : "Minimize clock";
    });


    /* =====================================
       DRAG PANEL
       ===================================== */

    const dragHandle =
        document.getElementById("system-clock-drag-handle");

    let dragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    dragHandle.addEventListener("pointerdown", (event) => {
        // Do not start dragging when the minimize button is clicked.
        if (event.target.closest(".system-clock-minimize")) {
            return;
        }

        dragging = true;

        const rect = panel.getBoundingClientRect();

        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        panel.style.left = `${rect.left}px`;
        panel.style.top = `${rect.top}px`;
        panel.style.right = "auto";
        panel.style.bottom = "auto";

        panel.classList.add("is-dragging");

        dragHandle.setPointerCapture(event.pointerId);

        event.preventDefault();
    });

    dragHandle.addEventListener("pointermove", (event) => {
        if (!dragging) {
            return;
        }

        const panelWidth = panel.offsetWidth;
        const panelHeight = panel.offsetHeight;

        const maxLeft =
            window.innerWidth - panelWidth;

        const maxTop =
            window.innerHeight - panelHeight;

        const left = Math.max(
            0,
            Math.min(
                event.clientX - dragOffsetX,
                maxLeft
            )
        );

        const top = Math.max(
            0,
            Math.min(
                event.clientY - dragOffsetY,
                maxTop
            )
        );

        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;
    });

    function stopDragging() {
        dragging = false;
        panel.classList.remove("is-dragging");
    }

    dragHandle.addEventListener("pointerup", stopDragging);
    dragHandle.addEventListener("pointercancel", stopDragging);
    dragHandle.addEventListener("lostpointercapture", stopDragging);


    /* =====================================
       CLOCK UPDATE
       ===================================== */

    const timeElement =
        document.getElementById("system-clock-time");

    const dateElement =
        document.getElementById("system-clock-date");

    function updateSystemClock() {
        const now = new Date();

        timeElement.textContent =
            now.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });

        dateElement.textContent =
            now.toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            });
    }

    updateSystemClock();

    const clockInterval =
        window.setInterval(updateSystemClock, 1000);


    /* =====================================
       CLEANUP
       ===================================== */

    window.addEventListener(
        "pagehide",
        () => {
            window.clearInterval(clockInterval);
        },
        { once: true }
    );

})();