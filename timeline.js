// ========================================
// THE 616 MARVELBASE
// MARVEL TIMELINE
// ========================================

window.scrollTo(0, 0);

let movies = [];
let currentTimeline = "all";


// ========================================
// LOAD MOVIES DATABASE
// ========================================

fetch("data/movies.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load movies.json");
        }

        return response.json();

    })
    .then(data => {

        if (Array.isArray(data)) {

            movies = data;

        } else {

            movies = [
                ...(data.movies || []),
                ...(data.shows || [])
            ];

        }

        displayTimeline(movies);

    })
    .catch(error => {

        console.error(
            "TIMELINE ERROR:",
            error
        );

        const timeline =
            document.getElementById("timeline");

        if (timeline) {

            timeline.innerHTML = `
                <div class="timeline-empty">
                    <h2>Unable to Load Timeline</h2>
                    <p>
                        The Marvel timeline could not be loaded.
                    </p>
                </div>
            `;

        }

    });


// ========================================
// DISPLAY TIMELINE
// ========================================

function displayTimeline(movieList) {

    const timeline =
        document.getElementById("timeline");

    if (!timeline) {
        return;
    }

    timeline.innerHTML = "";


    const timelineLabel =
        document.getElementById("current-timeline");

    if (timelineLabel) {

        if (currentTimeline === "all") {

            timelineLabel.textContent =
                "ALL MARVEL TIMELINES";

        } else {

            timelineLabel.textContent =
                currentTimeline.toUpperCase() +
                " TIMELINE";

        }

    }


    // ========================================
    // SORT BY YEAR
    // ========================================

    const sortedMovies =
        [...movieList].sort((a, b) => {

            const yearA =
                Number(a.year) || 0;

            const yearB =
                Number(b.year) || 0;

            return yearA - yearB;

        });


    // ========================================
    // NO RESULTS
    // ========================================

    if (sortedMovies.length === 0) {

        timeline.innerHTML = `
            <div class="timeline-empty">
                <h2>No Movies Found</h2>
                <p>
                    No movies match this timeline or search.
                </p>
            </div>
        `;

        return;

    }


    // ========================================
    // CREATE TIMELINE EVENTS
    // ========================================

    sortedMovies.forEach(movie => {

        const event =
            document.createElement("div");

        event.className =
            "timeline-event";


        event.innerHTML = `

            <div class="timeline-year">
                ${movie.year || "Unknown"}
            </div>


            <div class="timeline-dot"></div>


            <div
                class="timeline-card"
                role="button"
                tabindex="0"
                aria-label="Open ${escapeHTML(
                    movie.title || "Unknown title"
                )}"
            >

                <div class="timeline-poster">

                    <img
                        src="${movie.image || ""}"
                        alt="${escapeHTML(
                            movie.title || "Marvel movie"
                        )}"
                    >

                </div>


                <div class="timeline-card-content">

                    <div class="timeline-card-top">

                        <span class="timeline-type">
                            ${escapeHTML(
                                movie.type || "MEDIA"
                            )}
                        </span>

                        <span class="timeline-phase">
                            ${escapeHTML(
                                movie.phase || ""
                            )}
                        </span>

                    </div>


                    <h2>
                        ${escapeHTML(
                            movie.title ||
                            "Unknown Title"
                        )}
                    </h2>


                    <p>
                        ${escapeHTML(
                            movie.description ||
                            "No description available."
                        )}
                    </p>


                    <div class="timeline-label">

                        TIMELINE:
                        <strong>
                            ${escapeHTML(
                                movie.type || "MEDIA"
                            )}
                        </strong>

                    </div>


                    <button
                        class="timeline-view-button"
                        type="button"
                    >
                        <span>VIEW PROFILE</span>
                        <span class="timeline-arrow">→</span>
                    </button>

                </div>

            </div>

        `;


        // ========================================
        // OPEN PROFILE
        // ========================================

        const timelineCard =
            event.querySelector(
                ".timeline-card"
            );


        const viewButton =
            event.querySelector(
                ".timeline-view-button"
            );


        if (timelineCard) {

            timelineCard.addEventListener(
                "click",
                function() {

                    openTimelineMovie(movie);

                }
            );


            timelineCard.addEventListener(
                "keydown",
                function(eventKey) {

                    if (
                        eventKey.key === "Enter" ||
                        eventKey.key === " "
                    ) {

                        eventKey.preventDefault();

                        openTimelineMovie(movie);

                    }

                }
            );

        }


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                function(eventClick) {

                    eventClick.stopPropagation();

                    openTimelineMovie(movie);

                }
            );

        }


        timeline.appendChild(event);

    });

}


// ========================================
// OPEN MOVIE PROFILE
// ========================================

function openTimelineMovie(movie) {

    if (!movie || !movie.id) {
        return;
    }

    window.location.href =
        `movies.html?id=${encodeURIComponent(
            movie.id
        )}`;

}


// ========================================
// FILTER TIMELINE
// ========================================

function filterTimeline(type) {

    currentTimeline = type;


    const buttons =
        document.querySelectorAll(
            ".timeline-filter"
        );


    buttons.forEach(button => {

        button.classList.remove("active");

    });


    buttons.forEach(button => {

        const buttonText =
            button.textContent
                .trim()
                .toLowerCase();


        if (

            (
                type === "all" &&
                buttonText === "all timelines"
            )

            ||

            buttonText ===
                type.toLowerCase()

        ) {

            button.classList.add("active");

        }

    });


    applyTimelineSearch();

}


// ========================================
// SEARCH + FILTER
// ========================================

function applyTimelineSearch() {

    const search =
        document.getElementById(
            "timeline-search"
        );


    const text =
        search
            ? search.value
                .toLowerCase()
                .trim()
            : "";


    let results =
        movies.filter(movie => {

            const title =
                String(
                    movie.title || ""
                ).toLowerCase();


            const description =
                String(
                    movie.description || ""
                ).toLowerCase();


            const type =
                String(
                    movie.type || ""
                ).toLowerCase();


            const phase =
                String(
                    movie.phase || ""
                ).toLowerCase();


            const universe =
                String(
                    movie.universe || ""
                ).toLowerCase();


            const year =
                String(
                    movie.year || ""
                ).toLowerCase();


            return (

                title.includes(text) ||
                description.includes(text) ||
                type.includes(text) ||
                phase.includes(text) ||
                universe.includes(text) ||
                year.includes(text)

            );

        });


    if (
        currentTimeline !== "all"
    ) {

        results =
            results.filter(movie => {

                return (
                    movie.type &&
                    movie.type
                        .toLowerCase()
                        .trim() ===
                    currentTimeline
                        .toLowerCase()
                        .trim()
                );

            });

    }


    displayTimeline(results);

}


// ========================================
// TIMELINE SEARCH
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const search =
            document.getElementById(
                "timeline-search"
            );


        if (!search) {
            return;
        }


        search.addEventListener(
            "input",
            function() {

                applyTimelineSearch();

            }
        );

    }
);


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}