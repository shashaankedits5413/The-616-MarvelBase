/* =========================================
   THE 616 MARVELBASE
   NEON CYBER-TRAIL
   ========================================= */

const NEON_CONFIG = {
    primary: "#00f3ff",
    secondary: "#b000ff",

    trailLength: 15,
    lineWidth: 2.0,
    glowBlur: 20,

    positionEase: 0.22,

    // Tail disappearance
    fadeSpeed: 2.4,

    // Cursor bullseye
    bullseyeRadius: 7,
    bullseyeLineWidth: 1.5,

    // Velocity chromatic aberration
    aberrationStrength: 0.018,
    aberrationSpeed: 2.5,

    pointDistance: 4,

    /* =====================================
       CLICK GLITCH
       ===================================== */

    // Maximum local effect radius
    glitchRadius: 90,

    // Expanding circle
    glitchRingRadius: 12,
    glitchRingMaxRadius: 95,
    glitchRingSpeed: 260,

    // Corrupted fragments
    glitchFragments: 18,
    glitchFragmentSpeed: 230,
    glitchFragmentLifetime: 420,

    // Local glitch slices
    glitchSliceCount: 7,
    glitchSliceWidth: 80,
    glitchSliceShift: 18
};

const TRAIL_STORAGE_KEY = "the616-neon-trail";
const TRAIL_RESTORE_MAX_AGE = 2500;

/* =========================================
   CANVAS SETUP
   ========================================= */

const canvas =
    document.getElementById("neon-trail-canvas");

if (canvas) {

    const ctx =
        canvas.getContext("2d");


    /* =========================================
       GLITCH EFFECT ARRAYS
       ========================================= */

    const glitchFragments = [];
    const glitchRings = [];
    const glitchSlices = [];


    /* =========================================
       CORRUPTED SYMBOL POOL
       ========================================= */

    const glitchSymbols = [
        "0",
        "1",
        "01",
        "10",
        "0x",
        "FF",
        "ERR",
        "NULL",
        "SYS",
        "404",
        ">>",
        "<<",
        "//",
        "##",
        "::",
        "??",
        "XX"
    ];


    /* =========================================
       RANDOM SYMBOL
       ========================================= */

    function randomGlitchSymbol() {

        return glitchSymbols[
            Math.floor(
                Math.random() *
                glitchSymbols.length
            )
        ];
    }


    /* =========================================
       CLICK EVENT
       ========================================= */

    document.addEventListener(
        "click",
        function(event) {

            triggerGlitch(
                event.clientX,
                event.clientY
            );
        }
    );


    /* =========================================
       TRIGGER LOCAL GLITCH
       ========================================= */

    function triggerGlitch(
        x,
        y
    ) {

        /* -------------------------------------
           EXPANDING RING
           ------------------------------------- */

        glitchRings.push({

            x,
            y,

            radius:
                NEON_CONFIG.glitchRingRadius,

            rotation:
                Math.random() *
                Math.PI *
                2,

            rotationSpeed:
                (
                    Math.random() - 0.5
                ) *
                8,

            speed:
                NEON_CONFIG.glitchRingSpeed,

            life:
                420,

            maxLife:
                420,

            symbols:
                Array.from(
                    {
                        length: 16
                    },
                    function() {
                        return randomGlitchSymbol();
                    }
                )
        });


        /* -------------------------------------
           LOCAL HORIZONTAL GLITCH SLICES
           ------------------------------------- */

        for (
            let i = 0;
            i < NEON_CONFIG.glitchSliceCount;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                Math.random() *
                NEON_CONFIG.glitchRadius *
                0.65;


            glitchSlices.push({

                x:
                    x +
                    Math.cos(angle) *
                    distance,

                y:
                    y +
                    Math.sin(angle) *
                    distance,

                width:
                    25 +
                    Math.random() *
                    NEON_CONFIG.glitchSliceWidth,

                height:
                    2 +
                    Math.random() *
                    6,

                shift:
                    (
                        Math.random() - 0.5
                    ) *
                    NEON_CONFIG.glitchSliceShift,

                life:
                    100,

                maxLife:
                    100
            });
        }


        /* -------------------------------------
           RGB CORRUPTION FRAGMENTS
           ------------------------------------- */

        for (
            let i = 0;
            i < NEON_CONFIG.glitchFragments;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                NEON_CONFIG.glitchFragmentSpeed *
                (
                    0.35 +
                    Math.random() *
                    0.65
                );


            glitchFragments.push({

                x,
                y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                rotation:
                    Math.random() *
                    Math.PI *
                    2,

                rotationSpeed:
                    (
                        Math.random() - 0.5
                    ) *
                    12,

                symbol:
                    randomGlitchSymbol(),

                life:
                    NEON_CONFIG.glitchFragmentLifetime,

                maxLife:
                    NEON_CONFIG.glitchFragmentLifetime,

                flickerTimer:
                    0,

                flickerRate:
                    30 +
                    Math.random() *
                    100,

                scale:
                    0.7 +
                    Math.random() *
                    0.7,

                distanceTravelled: 0
            });
        }
    }


    /* =========================================
       UPDATE GLITCH EFFECTS
       ========================================= */

    function updateGlitch(
        deltaTime
    ) {

        /* -------------------------------------
           SLICES
           ------------------------------------- */

        for (
            let i = glitchSlices.length - 1;
            i >= 0;
            i--
        ) {

            const slice =
                glitchSlices[i];


            slice.life -=
                deltaTime * 1000;


            if (
                slice.life <= 0
            ) {

                glitchSlices.splice(
                    i,
                    1
                );
            }
        }


        /* -------------------------------------
           EXPANDING RINGS
           ------------------------------------- */

        for (
            let i = glitchRings.length - 1;
            i >= 0;
            i--
        ) {

            const ring =
                glitchRings[i];


            ring.life -=
                deltaTime * 1000;


            const previousRadius =
                ring.radius;


            ring.radius = Math.min(
                ring.radius +
                ring.speed *
                deltaTime,

                NEON_CONFIG.glitchRingMaxRadius
            );


            ring.rotation +=
                ring.rotationSpeed *
                deltaTime;


            /*
                Remove once it reaches
                the maximum radius or dies.
            */

            if (
                ring.life <= 0 ||
                ring.radius >=
                NEON_CONFIG.glitchRingMaxRadius
            ) {

                glitchRings.splice(
                    i,
                    1
                );
            }
        }


        /* -------------------------------------
           RGB FRAGMENTS
           ------------------------------------- */

        for (
            let i = glitchFragments.length - 1;
            i >= 0;
            i--
        ) {

            const fragment =
                glitchFragments[i];


            fragment.life -=
                deltaTime * 1000;


            const oldX =
                fragment.x;

            const oldY =
                fragment.y;


            fragment.x +=
                fragment.vx *
                deltaTime;

            fragment.y +=
                fragment.vy *
                deltaTime;


            fragment.distanceTravelled +=
                Math.sqrt(
                    Math.pow(
                        fragment.x - oldX,
                        2
                    ) +
                    Math.pow(
                        fragment.y - oldY,
                        2
                    )
                );


            /*
                Digital drag.
            */

            fragment.vx *=
                Math.pow(
                    0.16,
                    deltaTime
                );

            fragment.vy *=
                Math.pow(
                    0.16,
                    deltaTime
                );


            fragment.rotation +=
                fragment.rotationSpeed *
                deltaTime;


            fragment.flickerTimer +=
                deltaTime * 1000;


            if (
                fragment.flickerTimer >
                fragment.flickerRate
            ) {

                fragment.symbol =
                    randomGlitchSymbol();

                fragment.flickerTimer =
                    0;
            }


            /*
                Keep fragments local.
            */

            if (
                fragment.distanceTravelled >
                NEON_CONFIG.glitchRadius
            ) {

                fragment.life =
                    Math.min(
                        fragment.life,
                        100
                    );
            }


            if (
                fragment.life <= 0
            ) {

                glitchFragments.splice(
                    i,
                    1
                );
            }
        }
    }


    /* =========================================
       DRAW LOCAL GLITCH SLICES
       ========================================= */

    function drawGlitchSlices() {

        for (
            const slice of glitchSlices
        ) {

            const opacity =
                slice.life /
                slice.maxLife;


            /* ---------------------------------
               CYAN SLICE
               --------------------------------- */

            ctx.save();

            ctx.globalAlpha =
                opacity *
                0.75;

            ctx.fillStyle =
                NEON_CONFIG.primary;

            ctx.shadowColor =
                NEON_CONFIG.primary;

            ctx.shadowBlur =
                10;


            ctx.fillRect(
                slice.x +
                slice.shift -
                4,

                slice.y,

                slice.width,

                slice.height
            );


            ctx.restore();


            /* ---------------------------------
               MAGENTA RGB OFFSET
               --------------------------------- */

            ctx.save();

            ctx.globalAlpha =
                opacity *
                0.5;

            ctx.fillStyle =
                NEON_CONFIG.secondary;

            ctx.fillRect(
                slice.x +
                slice.shift +
                6,

                slice.y +
                2,

                slice.width *
                0.7,

                Math.max(
                    1,
                    slice.height - 2
                )
            );


            ctx.restore();
        }
    }


    /* =========================================
       DRAW EXPANDING GLITCH RINGS
       ========================================= */

    function drawGlitchRings() {

        for (
            const ring of glitchRings
        ) {

            const progress =
                1 -
                ring.life /
                ring.maxLife;


            /*
                Strong at the beginning,
                fading as it expands.
            */

            const opacity =
                Math.pow(
                    1 - progress,
                    0.65
                );


            /* ---------------------------------
               MAIN CYAN CIRCLE
               --------------------------------- */

            ctx.save();

            ctx.globalAlpha =
                opacity *
                0.9;

            ctx.strokeStyle =
                NEON_CONFIG.primary;

            ctx.lineWidth =
                1.5;

            ctx.shadowColor =
                NEON_CONFIG.primary;

            ctx.shadowBlur =
                18;


            ctx.beginPath();

            ctx.arc(
                ring.x,
                ring.y,
                ring.radius,
                0,
                Math.PI * 2
            );

            ctx.stroke();


            ctx.restore();


            /* ---------------------------------
               MAGENTA OFFSET CIRCLE
               --------------------------------- */

            ctx.save();

            ctx.globalAlpha =
                opacity *
                0.45;

            ctx.strokeStyle =
                NEON_CONFIG.secondary;

            ctx.lineWidth =
                1;

            ctx.shadowColor =
                NEON_CONFIG.secondary;

            ctx.shadowBlur =
                12;


            ctx.beginPath();

            ctx.arc(
                ring.x + 3,
                ring.y,
                ring.radius + 3,
                0,
                Math.PI * 2
            );

            ctx.stroke();


            ctx.restore();


            /* ---------------------------------
               BINARY / CORRUPTED SYMBOLS
               --------------------------------- */

            const symbolCount =
                ring.symbols.length;


            for (
                let i = 0;
                i < symbolCount;
                i++
            ) {

                const angle =
                    ring.rotation +
                    (
                        i /
                        symbolCount
                    ) *
                    Math.PI *
                    2;


                /*
                    Small irregularity makes
                    the ring feel digital.
                */

                const radialJitter =
                    (
                        Math.random() - 0.5
                    ) *
                    4;


                const distance =
                    ring.radius +
                    radialJitter;


                const symbolX =
                    ring.x +
                    Math.cos(angle) *
                    distance;


                const symbolY =
                    ring.y +
                    Math.sin(angle) *
                    distance;


                ctx.save();

                ctx.translate(
                    symbolX,
                    symbolY
                );

                ctx.rotate(
                    angle +
                    Math.PI / 2
                );


                ctx.font =
                    "bold 10px monospace";


                /*
                    CYAN CHANNEL
                */

                ctx.globalAlpha =
                    opacity *
                    (
                        0.35 +
                        Math.random() *
                        0.65
                    );

                ctx.fillStyle =
                    NEON_CONFIG.primary;

                ctx.shadowColor =
                    NEON_CONFIG.primary;

                ctx.shadowBlur =
                    10;


                ctx.fillText(
                    ring.symbols[i],
                    -4,
                    0
                );


                /*
                    MAGENTA CHANNEL
                */

                ctx.globalAlpha =
                    opacity *
                    0.35;

                ctx.fillStyle =
                    NEON_CONFIG.secondary;


                ctx.fillText(
                    ring.symbols[i],
                    3,
                    0
                );


                ctx.restore();
            }
        }
    }


    /* =========================================
       DRAW RGB FRAGMENTS
       ========================================= */

    function drawGlitchFragments() {

        for (
            const fragment of glitchFragments
        ) {

            const progress =
                1 -
                fragment.life /
                fragment.maxLife;


            /*
                Fade out instead of fading in.
            */

            const fade =
                Math.max(
                    0,
                    1 -
                    progress
                );


            const flicker =
                Math.random() >
                0.82
                    ? 0
                    : 1;


            ctx.save();

            ctx.translate(
                fragment.x,
                fragment.y
            );

            ctx.rotate(
                fragment.rotation
            );

            ctx.scale(
                fragment.scale,
                fragment.scale
            );


            ctx.font =
                "bold 12px monospace";


            /* ---------------------------------
               CYAN CHANNEL
               --------------------------------- */

            ctx.globalAlpha =
                fade *
                flicker *
                0.85;

            ctx.fillStyle =
                NEON_CONFIG.primary;

            ctx.shadowColor =
                NEON_CONFIG.primary;

            ctx.shadowBlur =
                14;


            ctx.fillText(
                fragment.symbol,
                -4,
                0
            );


            /* ---------------------------------
               RED CHANNEL
               --------------------------------- */

            ctx.globalAlpha =
                fade *
                flicker *
                0.65;

            ctx.fillStyle =
                "#ff1744";

            ctx.shadowColor =
                "#ff1744";

            ctx.shadowBlur =
                10;


            ctx.fillText(
                fragment.symbol,
                4,
                0
            );


            /* ---------------------------------
               PIXEL STATIC
               --------------------------------- */

            if (
                progress > 0.45
            ) {

                ctx.globalAlpha =
                    fade *
                    0.5;

                ctx.fillStyle =
                    "#ffffff";


                ctx.fillRect(
                    Math.random() * 18 - 9,
                    Math.random() * 14 - 7,
                    Math.random() * 4 + 1,
                    Math.random() * 3 + 1
                );
            }


            ctx.restore();
        }
    }


    /* =========================================
       DRAW ALL GLITCH EFFECTS
       ========================================= */

    function drawGlitchEffects() {

        drawGlitchSlices();

        drawGlitchRings();

        drawGlitchFragments();
    }


    /* =========================================
       DIMENSIONS
       ========================================= */

    let width =
        window.innerWidth;

    let height =
        window.innerHeight;


    let devicePixelRatio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    /* =========================================
       MOUSE
       ========================================= */

    let mouse = {
        x: width / 2,
        y: height / 2
    };


    let smoothMouse = {
        x: width / 2,
        y: height / 2
    };


    let previousMouse = {
        x: width / 2,
        y: height / 2
    };


    let velocity = 0;
    let targetVelocity = 0;

    let mouseInside = false;


    const trail = [];

    function saveTrailState() {
    try {
        sessionStorage.setItem(
            TRAIL_STORAGE_KEY,
            JSON.stringify({
                timestamp: Date.now(),

                mouse: {
                    x: mouse.x,
                    y: mouse.y
                },

                smoothMouse: {
                    x: smoothMouse.x,
                    y: smoothMouse.y
                },

                trail: trail
                    .slice(0, NEON_CONFIG.trailLength)
                    .map(point => ({
                        x: point.x,
                        y: point.y,
                        opacity: point.opacity
                    }))
            })
        );
    } catch (error) {
        console.warn(
            "Could not save neon trail state:",
            error
        );
    }
}

    function restoreTrailState() {
        try {
            const rawState =
                sessionStorage.getItem(
                    TRAIL_STORAGE_KEY
                );

            if (!rawState) {
                return;
            }

            const state =
                JSON.parse(rawState);

            if (
                !state ||
                !state.timestamp ||
                Date.now() -
                    state.timestamp >
                    TRAIL_RESTORE_MAX_AGE
            ) {
                sessionStorage.removeItem(
                    TRAIL_STORAGE_KEY
                );

                return;
            }

            if (state.mouse) {
                mouse.x =
                    Number(state.mouse.x);

                mouse.y =
                    Number(state.mouse.y);
            }

            if (state.smoothMouse) {
                smoothMouse.x =
                    Number(
                        state.smoothMouse.x
                    );

                smoothMouse.y =
                    Number(
                        state.smoothMouse.y
                    );
            }

            if (
                Array.isArray(
                    state.trail
                )
            ) {
                trail.length = 0;

                state.trail
                    .slice(
                        0,
                        NEON_CONFIG.trailLength
                    )
                    .forEach(point => {
                        trail.push({
                            x: Number(point.x),
                            y: Number(point.y),
                            opacity: Math.max(
                                0,
                                Math.min(
                                    1,
                                    Number(
                                        point.opacity
                                    )
                                )
                            )
                        });
                    });
            }

            mouseInside = true;

        } catch (error) {
            console.warn(
                "Could not restore neon trail state:",
                error
            );

            sessionStorage.removeItem(
                TRAIL_STORAGE_KEY
            );
        }
    }


    let lastTime =
        performance.now();


    /* =========================================
       COLOR HELPERS
       ========================================= */

    function hexToRgb(hex) {

        const cleanHex =
            hex.replace("#", "");


        const value =
            parseInt(
                cleanHex,
                16
            );


        return {
            r:
                (value >> 16) & 255,

            g:
                (value >> 8) & 255,

            b:
                value & 255
        };
    }


    const primaryRGB =
        hexToRgb(
            NEON_CONFIG.primary
        );


    const secondaryRGB =
        hexToRgb(
            NEON_CONFIG.secondary
        );


    function rgbToString(
        rgb,
        alpha = 1
    ) {

        return `rgba(
            ${rgb.r},
            ${rgb.g},
            ${rgb.b},
            ${alpha}
        )`;
    }


    function interpolateColor(
        colorA,
        colorB,
        amount
    ) {

        return {

            r:
                colorA.r +
                (
                    colorB.r -
                    colorA.r
                ) *
                amount,

            g:
                colorA.g +
                (
                    colorB.g -
                    colorA.g
                ) *
                amount,

            b:
                colorA.b +
                (
                    colorB.b -
                    colorA.b
                ) *
                amount
        };
    }


    /* =========================================
       CANVAS RESIZE
       ========================================= */

    function resizeCanvas() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        devicePixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            width *
            devicePixelRatio;


        canvas.height =
            height *
            devicePixelRatio;


        canvas.style.width =
            width +
            "px";


        canvas.style.height =
            height +
            "px";


        ctx.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );
    }


    resizeCanvas();

        restoreTrailState();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =========================================
       MOUSE TRACKING
       ========================================= */

    document.addEventListener(
        "mousemove",
        function(event) {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

            mouseInside =
                true;
        }
    );


    document.addEventListener(
        "mouseenter",
        function() {

            mouseInside =
                true;
        }
    );


    document.addEventListener(
        "mouseleave",
        function() {

            mouseInside =
                false;
        }
    );


    /* =========================================
       DISTANCE
       ========================================= */

    function distance(
        x1,
        y1,
        x2,
        y2
    ) {

        const dx =
            x2 - x1;

        const dy =
            y2 - y1;


        return Math.sqrt(
            dx * dx +
            dy * dy
        );
    }


    /* =========================================
       ADD TRAIL POINT
       ========================================= */

    function addTrailPoint(
        x,
        y
    ) {

        if (
            trail.length > 0
        ) {

            const last =
                trail[0];


            const moved =
                distance(
                    x,
                    y,
                    last.x,
                    last.y
                );


            if (
                moved <
                NEON_CONFIG.pointDistance
            ) {

                return;
            }
        }


        trail.unshift({

            x,
            y,

            opacity:
                1
        });


        while (
            trail.length >
            NEON_CONFIG.trailLength
        ) {

            trail.pop();
        }
    }


    /* =========================================
       WEIGHTED MOUSE MOTION
       ========================================= */

    function updateSmoothMouse(
        deltaTime
    ) {

        const smoothing =
            1 -
            Math.pow(
                1 -
                NEON_CONFIG.positionEase,
                deltaTime * 60
            );


        smoothMouse.x +=
            (
                mouse.x -
                smoothMouse.x
            ) *
            smoothing;


        smoothMouse.y +=
            (
                mouse.y -
                smoothMouse.y
            ) *
            smoothing;


        const movement =
            distance(
                smoothMouse.x,
                smoothMouse.y,
                previousMouse.x,
                previousMouse.y
            );


        targetVelocity =
            movement /
            Math.max(
                deltaTime,
                0.001
            );


        velocity +=
            (
                targetVelocity -
                velocity
            ) *
            0.18;


        previousMouse.x =
            smoothMouse.x;

        previousMouse.y =
            smoothMouse.y;
    }


    /* =========================================
       TRAIL UPDATE
       ========================================= */

    function updateTrail(
        deltaTime
    ) {

        if (
            mouseInside
        ) {

            addTrailPoint(
                smoothMouse.x,
                smoothMouse.y
            );
        }


        for (
            let i = trail.length - 1;
            i >= 0;
            i--
        ) {

            trail[i].opacity -=
                NEON_CONFIG.fadeSpeed *
                deltaTime;


            if (
                trail[i].opacity <= 0
            ) {

                trail.splice(
                    i,
                    1
                );
            }
        }
    }


    /* =========================================
       GET TRAIL POINT
       ========================================= */

    function getPoint(
        index
    ) {

        if (
            trail.length === 0
        ) {

            return null;
        }


        return trail[
            Math.min(
                index,
                trail.length - 1
            )
        ];
    }


    /* =========================================
       SMOOTH BEZIER PATH
       ========================================= */

    function drawSmoothPath(
        offsetX = 0
    ) {

        if (
            trail.length < 2
        ) {

            return;
        }


        ctx.beginPath();


        const first =
            getPoint(0);


        ctx.moveTo(
            first.x +
            offsetX,

            first.y
        );


        for (
            let i = 0;
            i < trail.length - 1;
            i++
        ) {

            const current =
                getPoint(i);

            const next =
                getPoint(i + 1);

            const nextNext =
                getPoint(i + 2);


            if (!next) {

                break;
            }


            const control1X =
                current.x +
                (
                    next.x -
                    current.x
                ) *
                0.55 +
                offsetX;


            const control1Y =
                current.y +
                (
                    next.y -
                    current.y
                ) *
                0.55;


            let control2X;
            let control2Y;


            if (
                nextNext
            ) {

                control2X =
                    next.x -
                    (
                        nextNext.x -
                        current.x
                    ) *
                    0.10 +
                    offsetX;


                control2Y =
                    next.y -
                    (
                        nextNext.y -
                        current.y
                    ) *
                    0.10;

            } else {

                control2X =
                    next.x +
                    offsetX;


                control2Y =
                    next.y;
            }


            ctx.bezierCurveTo(
                control1X,
                control1Y,
                control2X,
                control2Y,
                next.x +
                offsetX,
                next.y
            );
        }
    }


    /* =========================================
       TRAIL GRADIENT
       ========================================= */

    function createGradient() {

        const newest =
            trail[0];


        const oldest =
            trail[
                trail.length - 1
            ];


        const gradient =
            ctx.createLinearGradient(
                newest.x,
                newest.y,
                oldest.x,
                oldest.y
            );


        gradient.addColorStop(
            0,
            NEON_CONFIG.primary
        );


        gradient.addColorStop(
            0.5,
            rgbToString(
                interpolateColor(
                    primaryRGB,
                    secondaryRGB,
                    0.5
                )
            )
        );


        gradient.addColorStop(
            1,
            NEON_CONFIG.secondary
        );


        return gradient;
    }


    /* =========================================
       DRAW NEON TRAIL
       ========================================= */

    function drawTrail() {

        if (
            trail.length < 2
        ) {

            return;
        }


        const gradient =
            createGradient();


        const newestOpacity =
            trail[0].opacity;


        /* -------------------------------------
           MAIN GLOW
           ------------------------------------- */

        ctx.save();


        ctx.globalAlpha =
            newestOpacity;


        ctx.strokeStyle =
            gradient;


        ctx.lineWidth =
            NEON_CONFIG.lineWidth;


        ctx.lineCap =
            "round";


        ctx.lineJoin =
            "round";


        ctx.shadowColor =
            NEON_CONFIG.primary;


        ctx.shadowBlur =
            NEON_CONFIG.glowBlur;


        drawSmoothPath();


        ctx.stroke();


        ctx.restore();


        /* -------------------------------------
           BRIGHT CORE
           ------------------------------------- */

        ctx.save();


        ctx.globalAlpha =
            newestOpacity *
            0.95;


        ctx.strokeStyle =
            gradient;


        ctx.lineWidth =
            1.05;


        ctx.lineCap =
            "round";


        ctx.lineJoin =
            "round";


        drawSmoothPath();


        ctx.stroke();


        ctx.restore();


        /* -------------------------------------
           CHROMATIC ABERRATION
           ------------------------------------- */

        const speed =
            Math.min(
                velocity / 1200,
                1
            );


        if (
            speed > 0.08
        ) {

            const offset =
                speed *
                NEON_CONFIG.aberrationSpeed;


            /* CYAN */

            ctx.save();


            ctx.globalAlpha =
                0.28 *
                speed;


            ctx.strokeStyle =
                NEON_CONFIG.primary;


            ctx.lineWidth =
                NEON_CONFIG.lineWidth;


            ctx.shadowColor =
                NEON_CONFIG.primary;


            ctx.shadowBlur =
                NEON_CONFIG.glowBlur *
                0.7;


            drawSmoothPath(
                -offset
            );


            ctx.stroke();


            ctx.restore();


            /* MAGENTA */

            ctx.save();


            ctx.globalAlpha =
                0.28 *
                speed;


            ctx.strokeStyle =
                NEON_CONFIG.secondary;


            ctx.lineWidth =
                NEON_CONFIG.lineWidth;


            ctx.shadowColor =
                NEON_CONFIG.secondary;


            ctx.shadowBlur =
                NEON_CONFIG.glowBlur *
                0.7;


            drawSmoothPath(
                offset
            );


            ctx.stroke();


            ctx.restore();
        }


        /* -------------------------------------
           DISSOLVING POINTS
           ------------------------------------- */

        for (
            let i = 1;
            i < trail.length;
            i++
        ) {

            const point =
                trail[i];


            const progress =
                i /
                (
                    trail.length - 1
                );


            const color =
                interpolateColor(
                    primaryRGB,
                    secondaryRGB,
                    progress
                );


            const radius =
                Math.max(
                    0.25,
                    NEON_CONFIG.lineWidth *
                    (
                        1 -
                        progress
                    )
                );


            ctx.save();


            ctx.globalAlpha =
                point.opacity *
                0.5;


            ctx.fillStyle =
                rgbToString(color);


            ctx.shadowColor =
                rgbToString(color);


            ctx.shadowBlur =
                NEON_CONFIG.glowBlur *
                0.35;


            ctx.beginPath();


            ctx.arc(
                point.x,
                point.y,
                radius,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();
        }
    }


function drawBullseye(
    x,
    y,
    timestamp
) {

    ctx.save();

    ctx.translate(
        x,
        y
    );

    ctx.rotate(
        timestamp * 0.002
    );

    ctx.strokeStyle =
        NEON_CONFIG.primary;

    ctx.lineWidth =
        NEON_CONFIG.bullseyeLineWidth;

    ctx.shadowColor =
        NEON_CONFIG.primary;

    ctx.shadowBlur =
        NEON_CONFIG.glowBlur;


    /* -------------------------------------
       OUTER RING
       ------------------------------------- */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        NEON_CONFIG.bullseyeRadius,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    /* -------------------------------------
       INNER RING
       ------------------------------------- */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        NEON_CONFIG.bullseyeRadius * 0.45,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    /* -------------------------------------
       CROSSHAIR
       ------------------------------------- */

    const innerRadius =
        NEON_CONFIG.bullseyeRadius * 0.45;

    const crosshairSize =
        NEON_CONFIG.bullseyeRadius * 2.2;

    ctx.beginPath();

    /* Right */
    ctx.moveTo(
        innerRadius,
        0
    );

    ctx.lineTo(
        crosshairSize,
        0
    );

    /* Left */
    ctx.moveTo(
        -innerRadius,
        0
    );

    ctx.lineTo(
        -crosshairSize,
        0
    );

    /* Bottom */
    ctx.moveTo(
        0,
        innerRadius
    );

    ctx.lineTo(
        0,
        crosshairSize
    );

    /* Top */
    ctx.moveTo(
        0,
        -innerRadius    
    );

    ctx.lineTo(
        0,
        -crosshairSize
    );

    ctx.stroke();

    ctx.restore();
}


    /* =========================================
       MAIN ANIMATION LOOP
       ========================================= */

    function animate(
        currentTime
    ) {

        const deltaTime =
            Math.min(
                (
                    currentTime -
                    lastTime
                ) / 1000,
                0.05
            );


        lastTime =
            currentTime;


        updateSmoothMouse(
            deltaTime
        );


        updateTrail(
            deltaTime
        );


        updateGlitch(
            deltaTime
        );


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        drawTrail();


        drawGlitchEffects();


        drawBullseye(
    smoothMouse.x,
    smoothMouse.y,
    currentTime
);


        requestAnimationFrame(
            animate
        );
    }

    requestAnimationFrame(
        animate
    );

    window.addEventListener(
        "pagehide",
        saveTrailState
    );


}
