/* ========================================
   THE 616 MARVELBASE
   ADVANCED GLOBAL SEARCH
   ======================================== */

let globalCharacters = [];
let globalMovies = [];
let globalTeams = [];
let globalLocations = [];
let globalEvents = [];
let globalUniverses = [];


// ========================================
// LOAD ALL DATABASES
// ========================================

Promise.all([

    fetch("data/characters.json")
        .then(res => res.json()),

    fetch("data/movies.json")
        .then(res => res.json()),

    fetch("data/teams.json")
        .then(res => res.json()),

    fetch("data/locations.json")
        .then(res => res.json()),

    fetch("data/events.json")
        .then(res => res.json()),

    fetch("data/universes.json")
        .then(res => res.json())

])

.then(([
    characterData,
    movieData,
    teamData,
    locationData,
    eventData,
    universeData
]) => {

    // ========================================
    // CHARACTERS
    // ========================================

    globalCharacters =
        Array.isArray(characterData)
            ? characterData
            : characterData.characters || [];


    // ========================================
    // MOVIES + SHOWS
    // ========================================

    if (Array.isArray(movieData)) {

        globalMovies = movieData;

    } else {

        globalMovies = [
            ...(movieData.movies || []),
            ...(movieData.shows || [])
        ];

    }


    // ========================================
    // TEAMS
    // ========================================

    globalTeams =
        Array.isArray(teamData)
            ? teamData
            : teamData.teams || [];


    // ========================================
    // LOCATIONS
    // ========================================

    globalLocations =
        Array.isArray(locationData)
            ? locationData
            : locationData.locations || [];


    // ========================================
    // EVENTS
    // ========================================

    globalEvents =
        Array.isArray(eventData)
            ? eventData
            : eventData.events || [];


    // ========================================
    // UNIVERSES
    // ========================================

    globalUniverses =
        Array.isArray(universeData)
            ? universeData
            : universeData.universes || [];


    // ========================================
    // START SEARCH
    // ========================================

    setupGlobalSearch();

})

.catch(error => {

    console.error(
        "Global search failed to load:",
        error
    );

});


// ========================================
// SEARCH SCORING
// ========================================

function getSearchScore(
    query,
    fields
) {

    let score = 0;

    fields.forEach(field => {

        const value =
            String(field || "")
                .toLowerCase()
                .trim();

        if (!value) return;


        // Exact match
        if (value === query) {

            score += 100;

        }

        // Starts with query
        else if (value.startsWith(query)) {

            score += 60;

        }

        // Contains query
        else if (value.includes(query)) {

            score += 30;

        }

    });

    return score;
}


// ========================================
// CONVERT VALUE TO SEARCHABLE TEXT
// ========================================

function searchableValue(value) {

    if (Array.isArray(value)) {

        return value
            .map(item => searchableValue(item))
            .join(" ");

    }


    if (
        value &&
        typeof value === "object"
    ) {

        return Object.values(value)
            .map(item => searchableValue(item))
            .join(" ");

    }


    return String(value || "");

}


// ========================================
// GET MULTIPLE POSSIBLE VALUES
// ========================================

function getValues(
    item,
    keys
) {

    return keys
        .flatMap(key => {

            const value =
                item?.[key];

            if (Array.isArray(value)) {
                return value;
            }

            if (
                value &&
                typeof value === "object"
            ) {
                return Object.values(value);
            }

            return value !== undefined &&
                value !== null
                ? [value]
                : [];

        })
        .map(value =>
            searchableValue(value)
        );

}


// ========================================
// SETUP SEARCH
// ========================================

function setupGlobalSearch() {

    const input =
        document.getElementById(
            "global-search-input"
        );


    const results =
        document.getElementById(
            "global-search-results"
        );


    if (!input || !results) {

        return;

    }


    // ========================================
    // SEARCH INPUT
    // ========================================

    input.addEventListener(
        "input",
        function() {

            const query =
                this.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                results.innerHTML = "";

                results.classList.remove(
                    "active"
                );

                return;

            }


            const matches =
                searchAllDatabases(query);


            displayGlobalResults(
                matches
            );

        }
    );


    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================

    input.addEventListener(
        "keydown",
        function(event) {

            const resultButtons =
                results.querySelectorAll(
                    ".global-search-result"
                );


            if (
                event.key === "Escape"
            ) {

                results.classList.remove(
                    "active"
                );

                input.blur();

                return;

            }


            if (
                !resultButtons.length
            ) {

                return;

            }


            const current =
                Array.from(
                    resultButtons
                ).findIndex(
                    button =>
                        button ===
                        document.activeElement
                );


            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                const next =
                    current + 1 <
                    resultButtons.length
                        ? current + 1
                        : 0;

                resultButtons[next].focus();

            }


            else if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                const previous =
                    current - 1 >= 0
                        ? current - 1
                        : resultButtons.length - 1;

                resultButtons[previous].focus();

            }


            else if (
                event.key === "Enter"
            ) {

                if (
                    current >= 0
                ) {

                    event.preventDefault();

                    resultButtons[current].click();

                }

            }

        }
    );


    // ========================================
    // CLOSE RESULTS OUTSIDE SEARCH
    // ========================================

    document.addEventListener(
        "click",
        function(event) {

            if (
                !event.target.closest(
                    ".global-search"
                )
            ) {

                results.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ========================================
// SEARCH ALL DATABASES
// ========================================

function searchAllDatabases(query) {

    const results = [];


    // ========================================
    // CHARACTERS
    // ========================================

    globalCharacters.forEach(item => {

        const name =
            String(item.name || "");

        const realName =
            String(item.realName || "");

        const type =
            String(item.type || "");

        const species =
            String(item.species || "");

        const status =
            String(item.status || "");

        const alignment =
            String(item.alignment || "");

        const aliases =
            getValues(
                item,
                [
                    "alias",
                    "aliases",
                    "codeName",
                    "codename"
                ]
            );


        const score =
            getSearchScore(
                query,
                [
                    name,
                    realName,
                    ...aliases,
                    type,
                    species,
                    status,
                    alignment
                ]
            );


        if (score > 0) {

            results.push({

                category:
                    "Character",

                name:
                    item.name ||
                    "Unknown Character",

                subtitle:
                    [
                        item.realName,
                        item.type
                    ]
                        .filter(Boolean)
                        .join(" • ") ||
                    "Character",

                score,

                url:
                    `characters.html?id=${encodeURIComponent(
                        item.id
                    )}`

            });

        }

    });


    // ========================================
    // MOVIES + SHOWS
    // ========================================

    globalMovies.forEach(item => {

        const title =
            String(item.title || "");

        const type =
            String(item.type || "");

        const universe =
            String(item.universe || "");

        const director =
            String(item.director || "");

        const phase =
            String(item.phase || "");

        const year =
            String(item.year || "");

        const score =
            getSearchScore(
                query,
                [
                    title,
                    type,
                    universe,
                    director,
                    phase,
                    year
                ]
            );


        if (score > 0) {

            results.push({

                category:
                    item.type ||
                    "Movie",

                name:
                    item.title ||
                    "Unknown Movie",

                subtitle:
                    [
                        item.year,
                        item.universe,
                        item.phase
                    ]
                        .filter(Boolean)
                        .join(" • "),

                score,

                url:
                    `movies.html?id=${encodeURIComponent(
                        item.id
                    )}`

            });

        }

    });


    // ========================================
    // TEAMS
    // ========================================

    globalTeams.forEach(item => {

        const name =
            String(item.name || "");

        const type =
            String(item.type || "");

        const universe =
            String(item.universe || "");

        const description =
            String(item.description || "");

        const status =
            String(item.status || "");

        const founded =
            String(item.founded || "");

        const members =
            getValues(
                item,
                [
                    "members"
                ]
            );


        const score =
            getSearchScore(
                query,
                [
                    name,
                    type,
                    universe,
                    description,
                    status,
                    founded,
                    ...members
                ]
            );


        if (score > 0) {

            results.push({

                category:
                    "Team",

                name:
                    item.name ||
                    "Unknown Team",

                subtitle:
                    [
                        item.type,
                        item.universe
                    ]
                        .filter(Boolean)
                        .join(" • "),

                score,

                url:
                    `teams.html?id=${encodeURIComponent(
                        item.id
                    )}`

            });

        }

    });


    // ========================================
    // LOCATIONS
    // ========================================

    globalLocations.forEach(item => {

        const name =
            String(item.name || "");

        const type =
            String(item.type || "");

        const universe =
            String(item.universe || "");

        const status =
            String(item.status || "");

        const description =
            String(item.description || "");

        const location =
            String(item.location || "");

        const country =
            String(item.country || "");

        const city =
            String(item.city || "");


        const score =
            getSearchScore(
                query,
                [
                    name,
                    type,
                    universe,
                    status,
                    description,
                    location,
                    country,
                    city
                ]
            );


        if (score > 0) {

            results.push({

                category:
                    "Location",

                name:
                    item.name ||
                    "Unknown Location",

                subtitle:
                    [
                        item.type,
                        item.universe
                    ]
                        .filter(Boolean)
                        .join(" • "),

                score,

                url:
                    `locations.html?id=${encodeURIComponent(
                        item.id
                    )}`

            });

        }

    });


    // ========================================
    // EVENTS
    // ========================================

    globalEvents.forEach(item => {

        const name =
            String(
                item.name ||
                item.title ||
                ""
            );

        const type =
            String(item.type || "");

        const universe =
            String(item.universe || "");

        const location =
            String(item.location || "");

        const description =
            String(item.description || "");

        const year =
            String(item.year || "");

        const date =
            String(item.date || "");

        const participants =
            getValues(
                item,
                [
                    "participants",
                    "characters",
                    "teams"
                ]
            );


        const score =
            getSearchScore(
                query,
                [
                    name,
                    type,
                    universe,
                    location,
                    description,
                    year,
                    date,
                    ...participants
                ]
            );


        if (score > 0) {

            results.push({

                category:
                    "Event",

                name:
                    item.name ||
                    item.title ||
                    "Unknown Event",

                subtitle:
                    [
                        item.year,
                        item.universe,
                        item.location
                    ]
                        .filter(Boolean)
                        .join(" • "),

                score,

                url:
                    `events.html?id=${encodeURIComponent(
                        item.id
                    )}`

            });

        }

    });


    // ========================================
    // UNIVERSES
    // ========================================

    globalUniverses.forEach(item => {

        const name =
            String(
                item.name ||
                item.title ||
                ""
            );

        const designation =
            String(
                item.designation ||
                ""
            );

        const realName =
            String(
                item.realName ||
                ""
            );

        const type =
            String(item.type || "");

        const description =
            String(item.description || "");

        const realm =
            String(
                item.realm ||
                item.location ||
                ""
            );

        const id =
            String(item.id || "");


        const score =
            getSearchScore(
                query,
                [
                    name,
                    designation,
                    realName,
                    type,
                    description,
                    realm,
                    id
                ]
            );


        if (score > 0) {

            results.push({

                category:
                    "Universe",

                name:
                    item.name ||
                    item.title ||
                    "Unknown Universe",

                subtitle:
                    [
                        item.designation ||
                        item.realName,
                        item.type
                    ]
                        .filter(Boolean)
                        .join(" • ") ||
                    "Universe",

                score,

                url:
                    `universes.html?id=${encodeURIComponent(
                        item.id
                    )}`

            });

        }

    });


    // ========================================
    // SORT RESULTS
    // ========================================

    results.sort(
        (a, b) =>
            b.score - a.score ||
            a.name.localeCompare(
                b.name
            )
    );


    return results;

}


// ========================================
// DISPLAY RESULTS
// ========================================

function displayGlobalResults(matches) {

    const results =
        document.getElementById(
            "global-search-results"
        );


    if (!results) return;


    results.innerHTML = "";


    // ========================================
    // NO RESULTS
    // ========================================

    if (matches.length === 0) {

        results.innerHTML = `

            <div class="global-search-empty">
                No results found.
            </div>

        `;

        results.classList.add(
            "active"
        );

        return;

    }


    // ========================================
    // RESULT LIMIT
    // ========================================

    matches
        .slice(0, 12)
        .forEach(match => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "global-search-result";


            button.tabIndex = 0;


            const category =
                document.createElement(
                    "span"
                );


            category.className =
                "global-result-category";


            category.textContent =
                match.category;


            const name =
                document.createElement(
                    "strong"
                );


            name.textContent =
                match.name;


            const subtitle =
                document.createElement(
                    "small"
                );


            subtitle.textContent =
                match.subtitle;


            button.appendChild(
                category
            );


            button.appendChild(
                name
            );


            button.appendChild(
                subtitle
            );


            button.addEventListener(
                "click",
                function() {

                    window.location.href =
                        match.url;

                }
            );


            results.appendChild(
                button
            );

        });


    results.classList.add(
        "active"
    );

}