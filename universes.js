window.scrollTo(0, 0);

let universes = [];
let characters = [];
let movies = [];
let teams = [];
let locations = [];
let events = [];


// ========================================
// LOAD ALL DATABASES
// ========================================

Promise.all([
    fetch("data/universes.json").then(response => response.json()),
    fetch("data/characters.json").then(response => response.json()),
    fetch("data/movies.json").then(response => response.json()),
    fetch("data/teams.json").then(response => response.json()),
    fetch("data/locations.json").then(response => response.json()),
    fetch("data/events.json").then(response => response.json())
])
.then(([
    universeData,
    characterData,
    movieData,
    teamData,
    locationData,
    eventData
]) => {

    universes = Array.isArray(universeData)
        ? universeData
        : universeData.universes || [];

    characters = Array.isArray(characterData)
        ? characterData
        : characterData.characters || [];

    if (Array.isArray(movieData)) {
        movies = movieData;
    } else {
        movies = [
            ...(movieData.movies || []),
            ...(movieData.shows || [])
        ];
    }

    teams = Array.isArray(teamData)
        ? teamData
        : teamData.teams || [];

    locations = Array.isArray(locationData)
        ? locationData
        : locationData.locations || [];

    events = Array.isArray(eventData)
        ? eventData
        : eventData.events || [];

    displayUniverses(universes);

    handleUniverseDeepLink();

})
.catch(error => {
    console.error("Error loading universe database:", error);
});


// ========================================
// DISPLAY UNIVERSES
// ========================================

function displayUniverses(universeList) {

    const grid = document.getElementById("universe-grid");

    if (!grid) return;

    grid.innerHTML = universeList.map(universe => `
        <div class="universe-card">

            <div class="universe-info">

                <span class="universe-designation">
                    ${universe.designation || ""}
                </span>

                <h2>
                    ${universe.name || "Unknown Universe"}
                </h2>

                <p>
                    <strong>Type:</strong>
                    ${universe.type || "Unknown"}
                </p>

                <p>
                    ${universe.description || ""}
                </p>

                <button
                    class="universe-button"
                    onclick="openUniverse('${universe.id}')"
                >
                    Explore Reality
                </button>

            </div>

        </div>
    `).join("");
}


// ========================================
// OPEN UNIVERSE PROFILE
// ========================================

function openUniverse(id, updateURL = true) {

    const universe =
        universes.find(item => item.id === id);

    if (!universe) return;

    const modal =
        document.getElementById("universe-modal");

    if (!modal) return;


    // ----------------------------------------
    // RESET MODAL SCROLL
    // ----------------------------------------

    const profileBox =
        modal.querySelector(".profile-box");

    if (profileBox) {
        profileBox.scrollTop = 0;
    }


    // ----------------------------------------
    // BASIC INFORMATION
    // ----------------------------------------

    const profileName =
        document.getElementById("profile-name");

    const profileRealName =
        document.getElementById("profile-real-name");

    if (profileName) {
        profileName.textContent =
            universe.name || "Unknown Universe";
    }

    if (profileRealName) {
        profileRealName.textContent =
            universe.designation || "";
    }


    // ----------------------------------------
    // STATS
    // ----------------------------------------

    const statsContainer =
        document.querySelector(".profile-stats");

    if (statsContainer) {

        statsContainer.innerHTML = `
            <div>
                <strong>TYPE</strong>
                <span>${universe.type || "Unknown"}</span>
            </div>

            <div>
                <strong>THREAT LEVEL</strong>
                <span>${universe.threatLevel || "Unknown"}</span>
            </div>

            <div>
                <strong>STATUS</strong>
                <span>${universe.status || "Unknown"}</span>
            </div>
        `;
    }


    // ----------------------------------------
    // FIND CONNECTIONS
    // ----------------------------------------

    const universeCharacters =
        getUniverseCharacters(universe);

    const universeMovies =
        getUniverseMovies(universe);

    const universeTeams =
        getUniverseTeams(universe);

    const universeLocations =
        getUniverseLocations(universe);

    const universeEvents =
        getUniverseEvents(universe);

    const relatedUniverses =
        getRelatedUniverses(universe);


    // ----------------------------------------
    // MODAL BODY
    // ----------------------------------------

    const modalBody =
        document.getElementById("modal-body-content");

    if (!modalBody) return;

    modalBody.innerHTML = "";


    // ----------------------------------------
    // OVERVIEW
    // ----------------------------------------

    const overview =
        document.createElement("div");

    overview.className =
        "profile-section";

    overview.innerHTML = `
        <h3>Overview</h3>
        <p>${universe.description || "No description available."}</p>
    `;

    modalBody.appendChild(overview);


    // ----------------------------------------
    // CHARACTERS
    // ----------------------------------------

    createConnectionSection(
        modalBody,
        "Characters",
        universeCharacters,
        "character",
        "characters.html?id="
    );


    // ----------------------------------------
    // MOVIES & SHOWS
    // ----------------------------------------

    createConnectionSection(
        modalBody,
        "Movies & Shows",
        universeMovies,
        "movie",
        "movies.html?id="
    );


    // ----------------------------------------
    // TEAMS
    // ----------------------------------------

    createConnectionSection(
        modalBody,
        "Teams",
        universeTeams,
        "team",
        "teams.html?id="
    );


    // ----------------------------------------
    // LOCATIONS
    // ----------------------------------------

    createConnectionSection(
        modalBody,
        "Locations",
        universeLocations,
        "location",
        "locations.html?id="
    );


    // ----------------------------------------
    // EVENTS
    // ----------------------------------------

    createConnectionSection(
        modalBody,
        "Events",
        universeEvents,
        "event",
        "events.html?id="
    );


    // ----------------------------------------
    // RELATED UNIVERSES
    // ----------------------------------------

    createRelatedUniverseSection(
        modalBody,
        relatedUniverses
    );


    // ----------------------------------------
    // OPEN MODAL
    // ----------------------------------------

    modal.classList.add("active");


    // ----------------------------------------
    // DEEP LINK
    // ----------------------------------------

    if (updateURL) {

        const newURL =
            `${window.location.pathname}?id=${encodeURIComponent(universe.id)}`;

        window.history.replaceState(
            {},
            "",
            newURL
        );
    }
}


// ========================================
// NORMALIZE VALUES
// ========================================

function normalizeValue(value) {

    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}


// ========================================
// GET UNIVERSE IDENTIFIERS
// ========================================

function getUniverseIdentifiers(universe) {

    return [
        universe.id,
        universe.name,
        universe.title,
        universe.designation,
        universe.realName,
        universe.universe
    ]
        .filter(Boolean)
        .map(normalizeValue);
}


// ========================================
// CHECK IF OBJECT BELONGS TO UNIVERSE
// ========================================

function objectBelongsToUniverse(object, universe) {

    if (!object) return false;

    const identifiers =
        getUniverseIdentifiers(universe);

    const values = [];


    Object.keys(object).forEach(key => {

        const value = object[key];

        if (
            typeof value === "string" ||
            typeof value === "number"
        ) {
            values.push(value);
        }

        if (Array.isArray(value)) {

            value.forEach(item => {

                if (
                    typeof item === "string" ||
                    typeof item === "number"
                ) {
                    values.push(item);
                }

            });
        }
    });


    return values.some(value => {

        const normalized =
            normalizeValue(value);

        return identifiers.some(identifier =>
            normalized === identifier ||
            normalized.includes(identifier) ||
            identifier.includes(normalized)
        );

    });
}


// ========================================
// CHARACTERS
// ========================================

function getUniverseCharacters(universe) {

    const results = [];

    characters.forEach(character => {

        if (
            objectBelongsToUniverse(
                character,
                universe
            )
        ) {
            results.push(character);
        }

    });


    // Also use the universe's own character list

    if (Array.isArray(universe.characters)) {

        universe.characters.forEach(name => {

            const normalizedName =
                normalizeValue(name);

            const match =
                characters.find(character =>
                    normalizeValue(character.name) === normalizedName ||
                    normalizeValue(character.id) === normalizedName ||
                    normalizeValue(character.realName) === normalizedName
                );

            if (
                match &&
                !results.some(item => item.id === match.id)
            ) {
                results.push(match);
            }

        });
    }


    return results;
}


// ========================================
// MOVIES & SHOWS
// ========================================

function getUniverseMovies(universe) {

    const results = [];

    movies.forEach(movie => {

        if (
            objectBelongsToUniverse(
                movie,
                universe
            )
        ) {
            results.push(movie);
        }

    });


    return results;
}


// ========================================
// TEAMS
// ========================================

function getUniverseTeams(universe) {

    const results = [];

    teams.forEach(team => {

        if (
            objectBelongsToUniverse(
                team,
                universe
            )
        ) {
            results.push(team);
        }

    });


    return results;
}


// ========================================
// LOCATIONS
// ========================================

function getUniverseLocations(universe) {

    const results = [];

    locations.forEach(location => {

        if (
            objectBelongsToUniverse(
                location,
                universe
            )
        ) {
            results.push(location);
        }

    });


    return results;
}


// ========================================
// EVENTS
// ========================================

function getUniverseEvents(universe) {

    const results = [];

    events.forEach(event => {

        if (
            objectBelongsToUniverse(
                event,
                universe
            )
        ) {
            results.push(event);
        }

    });


    // Also use the universe's own event list

    if (Array.isArray(universe.events)) {

        universe.events.forEach(name => {

            const normalizedName =
                normalizeValue(name);

            const match =
                events.find(event =>
                    normalizeValue(event.name) === normalizedName ||
                    normalizeValue(event.title) === normalizedName ||
                    normalizeValue(event.id) === normalizedName
                );

            if (
                match &&
                !results.some(item => item.id === match.id)
            ) {
                results.push(match);
            }

        });
    }


    return results;
}


// ========================================
// RELATED UNIVERSES
// ========================================

function getRelatedUniverses(universe) {

    const results = [];

    if (
        Array.isArray(universe.relatedUniverses)
    ) {

        universe.relatedUniverses.forEach(id => {

            const match =
                universes.find(item =>
                    item.id === id ||
                    normalizeValue(item.name) ===
                    normalizeValue(id) ||
                    normalizeValue(item.designation) ===
                    normalizeValue(id)
                );

            if (
                match &&
                match.id !== universe.id &&
                !results.some(item => item.id === match.id)
            ) {
                results.push(match);
            }

        });
    }


    return results;
}


// ========================================
// CREATE CONNECTION SECTION
// ========================================

function createConnectionSection(
    container,
    title,
    items,
    type,
    baseURL
) {

    if (!container || !items || items.length === 0) {
        return;
    }


    const section =
        document.createElement("div");

    section.className =
        "profile-section";


    const heading =
        document.createElement("h3");

    heading.textContent =
        title;


    const connections =
        document.createElement("div");

    connections.className =
        "profile-connections";


    items.forEach(item => {

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "profile-button";


        let name =
            item.name ||
            item.title ||
            item.designation ||
            "Unknown";


        button.textContent =
            name;


        button.addEventListener(
            "click",
            function() {

                window.location.href =
                    `${baseURL}${encodeURIComponent(item.id)}`;

            }
        );


        connections.appendChild(button);

    });


    section.appendChild(heading);
    section.appendChild(connections);

    container.appendChild(section);
}


// ========================================
// RELATED UNIVERSES SECTION
// ========================================

function createRelatedUniverseSection(
    container,
    universesList
) {

    if (
        !container ||
        !universesList ||
        universesList.length === 0
    ) {
        return;
    }


    const section =
        document.createElement("div");

    section.className =
        "profile-section";


    const heading =
        document.createElement("h3");

    heading.textContent =
        "Related Universes";


    const connections =
        document.createElement("div");

    connections.className =
        "profile-connections";


    universesList.forEach(universe => {

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "profile-button";

        button.textContent =
            universe.name ||
            universe.designation ||
            "Unknown Universe";


        button.addEventListener(
            "click",
            function() {

                openUniverse(
                    universe.id,
                    true
                );

            }
        );


        connections.appendChild(button);

    });


    section.appendChild(heading);
    section.appendChild(connections);

    container.appendChild(section);
}


// ========================================
// CLOSE UNIVERSE PROFILE
// ========================================

function closeUniverse() {

    const modal =
        document.getElementById("universe-modal");

    if (modal) {
        modal.classList.remove("active");
    }


    // Remove deep-link ID

    window.history.replaceState(
        {},
        "",
        window.location.pathname
    );
}


// ========================================
// SEARCH UNIVERSES
// ========================================

const universeSearch =
    document.getElementById("universe-search");


if (universeSearch) {

    universeSearch.addEventListener(
        "input",
        function(event) {

            const query =
                event.target.value
                    .trim()
                    .toLowerCase();


            const filtered =
                universes.filter(universe => {

                    const name =
                        String(
                            universe.name || ""
                        ).toLowerCase();

                    const designation =
                        String(
                            universe.designation || ""
                        ).toLowerCase();

                    const description =
                        String(
                            universe.description || ""
                        ).toLowerCase();

                    const type =
                        String(
                            universe.type || ""
                        ).toLowerCase();

                    const charactersText =
                        Array.isArray(universe.characters)
                            ? universe.characters.join(" ").toLowerCase()
                            : "";


                    return (
                        name.includes(query) ||
                        designation.includes(query) ||
                        description.includes(query) ||
                        type.includes(query) ||
                        charactersText.includes(query)
                    );

                });


            displayUniverses(filtered);

        }
    );
}


// ========================================
// DEEP LINKING
// ========================================

function handleUniverseDeepLink() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        params.get("id");


    if (!id) return;


    const universe =
        universes.find(
            item => item.id === id
        );


    if (universe) {

        openUniverse(
            universe.id,
            false
        );

    }
}


// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }


        const modal =
            document.getElementById("universe-modal");


        if (
            modal &&
            modal.classList.contains("active")
        ) {
            closeUniverse();
        }

    }
);