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

        movies = data;

        displayTimeline(movies);

    })

    .catch(error => {

        console.error("TIMELINE ERROR:", error);

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


    // ========================================
    // UPDATE CURRENT TIMELINE LABEL
    // ========================================

    const timelineLabel =
        document.getElementById("current-timeline");


    if (timelineLabel) {

        if (currentTimeline === "all") {

            timelineLabel.textContent =
                "ALL MARVEL TIMELINES";

        } else {

            timelineLabel.textContent =
                currentTimeline.toUpperCase() + " TIMELINE";

        }

    }


    // ========================================
    // SORT BY YEAR
    // ========================================

    const sortedMovies =
        [...movieList].sort(
            (a, b) => a.year - b.year
        );


    // ========================================
    // NO RESULTS
    // ========================================

    if (sortedMovies.length === 0) {

        timeline.innerHTML = `

            <div class="timeline-empty">

                <h2>
                    No Movies Found
                </h2>

                <p>
                    No movies match this timeline or search.
                </p>

            </div>

        `;

        return;
    }


    // ========================================
    // CREATE EVENTS
    // ========================================

    sortedMovies.forEach(movie => {

        const event =
            document.createElement("div");

        event.className =
            "timeline-event";


        event.innerHTML = `

            <div class="timeline-year">
                ${movie.year}
            </div>


            <div class="timeline-dot">
            </div>


            <div class="timeline-card">

                <div class="timeline-card-top">

                    <span class="timeline-type">
                        ${movie.type}
                    </span>

                    <span class="timeline-phase">
                        ${movie.phase}
                    </span>

                </div>


                <h2>
                    ${movie.title}
                </h2>


                <p>
                    ${movie.description}
                </p>


                <div class="timeline-label">

                    TIMELINE:
                    <strong>
                        ${movie.type}
                    </strong>

                </div>

            </div>

        `;


        timeline.appendChild(event);

    });

}


// ========================================
// FILTER TIMELINE
// ========================================

function filterTimeline(type) {

    currentTimeline = type;


    // ========================================
    // UPDATE BUTTONS
    // ========================================

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
            (type === "all" &&
                buttonText === "all timelines") ||

            buttonText === type.toLowerCase()
        ) {

            button.classList.add("active");

        }

    });


    // ========================================
    // FILTER MOVIES
    // ========================================

    if (type === "all") {

        displayTimeline(movies);

        return;

    }


    const filteredMovies =
        movies.filter(movie =>
            movie.type &&
            movie.type.toLowerCase() ===
            type.toLowerCase()
        );


    displayTimeline(filteredMovies);

}


// ========================================
// SEARCH
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const search =
            document.getElementById(
                "timeline-search"
            );


        if (!search) {
            return;
        }


        search.addEventListener(
            "input",
            function () {

                const text =
                    search.value
                        .toLowerCase()
                        .trim();


                let results =
                    movies.filter(movie => {

                        const title =
                            movie.title
                                ?.toLowerCase() || "";

                        const description =
                            movie.description
                                ?.toLowerCase() || "";

                        const type =
                            movie.type
                                ?.toLowerCase() || "";

                        return (
                            title.includes(text) ||
                            description.includes(text) ||
                            type.includes(text)
                        );

                    });


                // APPLY TIMELINE FILTER

                if (
                    currentTimeline !== "all"
                ) {

                    results =
                        results.filter(movie =>
                            movie.type &&
                            movie.type.toLowerCase() ===
                            currentTimeline.toLowerCase()
                        );

                }


                displayTimeline(results);

            }
        );

    });