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

        globalMovies =
            movieData;

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
    // CLOSE RESULTS WHEN CLICKING OUTSIDE
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
            String(item.name || "")
                .toLowerCase();


        const realName =
            String(item.realName || "")
                .toLowerCase();


        const type =
            String(item.type || "")
                .toLowerCase();


        const species =
            String(item.species || "")
                .toLowerCase();


        if (
            name.includes(query) ||
            realName.includes(query) ||
            type.includes(query) ||
            species.includes(query)
        ) {

            results.push({

                category:
                    "Character",

                name:
                    item.name ||
                    "Unknown Character",

                subtitle:
                    item.realName ||
                    item.type ||
                    "Character",

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
            String(item.title || "")
                .toLowerCase();


        const type =
            String(item.type || "")
                .toLowerCase();


        const universe =
            String(item.universe || "")
                .toLowerCase();


        const director =
            String(item.director || "")
                .toLowerCase();


        if (
            title.includes(query) ||
            type.includes(query) ||
            universe.includes(query) ||
            director.includes(query)
        ) {

            results.push({

                category:
                    item.type ||
                    "Movie",

                name:
                    item.title ||
                    "Unknown Movie",

                subtitle:
                    `${item.year || ""} ${
                        item.universe || ""
                    }`.trim(),

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
            String(item.name || "")
                .toLowerCase();


        const type =
            String(item.type || "")
                .toLowerCase();


        const universe =
            String(item.universe || "")
                .toLowerCase();


        const description =
            String(item.description || "")
                .toLowerCase();


        if (
            name.includes(query) ||
            type.includes(query) ||
            universe.includes(query) ||
            description.includes(query)
        ) {

            results.push({

                category:
                    "Team",

                name:
                    item.name ||
                    "Unknown Team",

                subtitle:
                    `${item.type || ""} ${
                        item.universe || ""
                    }`.trim(),

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
            String(item.name || "")
                .toLowerCase();


        const type =
            String(item.type || "")
                .toLowerCase();


        const universe =
            String(item.universe || "")
                .toLowerCase();


        const status =
            String(item.status || "")
                .toLowerCase();


        const description =
            String(item.description || "")
                .toLowerCase();


        if (
            name.includes(query) ||
            type.includes(query) ||
            universe.includes(query) ||
            status.includes(query) ||
            description.includes(query)
        ) {

            results.push({

                category:
                    "Location",

                name:
                    item.name ||
                    "Unknown Location",

                subtitle:
                    `${item.type || ""} ${
                        item.universe || ""
                    }`.trim(),

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
            ).toLowerCase();


        const type =
            String(item.type || "")
                .toLowerCase();


        const universe =
            String(item.universe || "")
                .toLowerCase();


        const location =
            String(item.location || "")
                .toLowerCase();


        const description =
            String(item.description || "")
                .toLowerCase();


        if (
            name.includes(query) ||
            type.includes(query) ||
            universe.includes(query) ||
            location.includes(query) ||
            description.includes(query)
        ) {

            results.push({

                category:
                    "Event",

                name:
                    item.name ||
                    item.title ||
                    "Unknown Event",

                subtitle:
                    `${item.year || ""} ${
                        item.universe || ""
                    }`.trim(),

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
            ).toLowerCase();


        const designation =
            String(
                item.designation ||
                item.realName ||
                item.id ||
                ""
            ).toLowerCase();


        const type =
            String(item.type || "")
                .toLowerCase();


        const description =
            String(item.description || "")
                .toLowerCase();


        const realm =
            String(
                item.realm ||
                item.location ||
                ""
            ).toLowerCase();


        if (
            name.includes(query) ||
            designation.includes(query) ||
            type.includes(query) ||
            description.includes(query) ||
            realm.includes(query)
        ) {

            results.push({

                category:
                    "Universe",

                name:
                    item.name ||
                    item.title ||
                    "Unknown Universe",

                subtitle:
                    item.designation ||
                    item.realName ||
                    item.type ||
                    "Universe",

                url:
                    `universes.html?id=${encodeURIComponent(
                        item.id
                    )}`

            });

        }

    });


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