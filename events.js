window.scrollTo(0, 0);


let events = [];
let characters = [];
let movies = [];
let teams = [];
let locations = [];
let universes = [];


// ========================================
// LOAD DATABASES
// ========================================

Promise.all([

    fetch("data/events.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load events.json");
            }

            return response.json();

        }),

    fetch("data/characters.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load characters.json");
            }

            return response.json();

        }),

    fetch("data/movies.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load movies.json");
            }

            return response.json();

        }),

    fetch("data/teams.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load teams.json");
            }

            return response.json();

        }),

    fetch("data/locations.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load locations.json");
            }

            return response.json();

        }),

    fetch("data/universes.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load universes.json");
            }

            return response.json();

        })

])

.then(([
    eventData,
    characterData,
    movieData,
    teamData,
    locationData,
    universeData
]) => {

    // ========================================
    // EVENTS
    // ========================================

    events =
        Array.isArray(eventData)
            ? eventData
            : eventData.events || [];


    // ========================================
    // CHARACTERS
    // ========================================

    characters =
        Array.isArray(characterData)
            ? characterData
            : characterData.characters || [];


    // ========================================
    // MOVIES & SHOWS
    // ========================================

    if (Array.isArray(movieData)) {

        movies = movieData;

    } else {

        movies = [
            ...(movieData.movies || []),
            ...(movieData.shows || [])
        ];

    }


    // ========================================
    // TEAMS
    // ========================================

    teams =
        Array.isArray(teamData)
            ? teamData
            : teamData.teams || [];


    // ========================================
    // LOCATIONS
    // ========================================

    locations =
        Array.isArray(locationData)
            ? locationData
            : locationData.locations || [];


    // ========================================
    // UNIVERSES
    // ========================================

    universes =
        Array.isArray(universeData)
            ? universeData
            : universeData.universes || [];


    // ========================================
    // DISPLAY EVENTS
    // ========================================

    displayEvents(events);


    // ========================================
    // DEEP LINK
    // ========================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const eventId =
        urlParams.get("id");


    if (eventId) {

        const event =
            events.find(item =>
                String(item.id || "")
                    .toLowerCase()
                    .trim() ===
                eventId
                    .toLowerCase()
                    .trim()
            );


        if (event) {
            openProfile(event, false);
        }

    }

})

.catch(error => {

    console.error(error);


    const eventGrid =
        document.getElementById(
            "event-grid"
        );


    if (eventGrid) {

        eventGrid.innerHTML = `
            <p class="error-message">
                Unable to load event database.
            </p>
        `;

    }

});


// ========================================
// DISPLAY EVENTS
// ========================================

function displayEvents(database) {

    const eventGrid =
        document.getElementById(
            "event-grid"
        );


    if (!eventGrid) {

        console.error(
            "Event grid not found."
        );

        return;

    }


    eventGrid.innerHTML = "";


    // ========================================
    // UPDATE COUNT
    // ========================================

    const eventCount =
        document.getElementById(
            "event-count"
        );


    if (eventCount) {

        eventCount.textContent =
            database.length;

    }


    // ========================================
    // EVENT CARDS
    // ========================================

    database.forEach(event => {

        eventGrid.appendChild(
            createEventCard(event)
        );

    });


    // ========================================
    // NO RESULTS
    // ========================================

    if (database.length === 0) {

        eventGrid.innerHTML = `
            <p class="error-message">
                No events found.
            </p>
        `;

    }

}


// ========================================
// CREATE EVENT CARD
// ========================================

function createEventCard(event) {

    const card =
        document.createElement("div");


    card.className =
        "movie-card";


    card.innerHTML = `

        <div class="movie-poster">

            <img
                src="${event.image || ""}"
                alt="${event.name || "Marvel event"}"
            >

        </div>


        <div class="movie-info">

            <p class="movie-type">
                ${formatText(
                    event.type || "EVENT"
                )}
            </p>


            <h2>
                ${event.name || "Unknown Event"}
            </h2>


            <p class="movie-year">
                ${event.year || ""}
            </p>


            <button
                class="view-profile"
                type="button"
            >
                VIEW EVENT
            </button>

        </div>

    `;


    const button =
        card.querySelector(
            ".view-profile"
        );


    if (button) {

        button.addEventListener(
            "click",
            function(eventClick) {

                eventClick.stopPropagation();

                openProfile(event);

            }
        );

    }


    card.addEventListener(
        "click",
        function() {

            openProfile(event);

        }
    );


    return card;

}


// ========================================
// SEARCH
// ========================================

const search =
    document.getElementById(
        "event-search"
    );


if (search) {

    search.addEventListener(
        "input",
        function() {

            const searchText =
                search.value
                    .toLowerCase()
                    .trim();


            const results =
                events.filter(event => {

                    const name =
                        String(
                            event.name || ""
                        ).toLowerCase();


                    const type =
                        String(
                            event.type || ""
                        ).toLowerCase();


                    const universe =
                        String(
                            event.universe || ""
                        ).toLowerCase();


                    const location =
                        String(
                            event.location || ""
                        ).toLowerCase();


                    const description =
                        String(
                            event.description || ""
                        ).toLowerCase();


                    const year =
                        String(
                            event.year || ""
                        ).toLowerCase();


                    const participants =
                        Array.isArray(event.participants)
                            ? event.participants
                                .join(" ")
                                .toLowerCase()
                            : "";


                    const comics =
                        Array.isArray(event.comics)
                            ? event.comics
                                .join(" ")
                                .toLowerCase()
                            : "";


                    return (

                        name.includes(searchText) ||

                        type.includes(searchText) ||

                        universe.includes(searchText) ||

                        location.includes(searchText) ||

                        description.includes(searchText) ||

                        year.includes(searchText) ||

                        participants.includes(searchText) ||

                        comics.includes(searchText)

                    );

                });


            displayEvents(results);

        }
    );

}


// ========================================
// OPEN PROFILE
// ========================================

function openProfile(event, updateURL = true) {

    if (!event) {
        return;
    }


    // ========================================
    // PROFILE ELEMENTS
    // ========================================

    const profileType =
        document.getElementById(
            "profile-type"
        );


    const profileName =
        document.getElementById(
            "profile-name"
        );


    const profileDate =
        document.getElementById(
            "profile-date"
        );


    const profileYear =
        document.getElementById(
            "profile-year"
        );


    const profileUniverse =
        document.getElementById(
            "profile-universe"
        );


    const profileLocation =
        document.getElementById(
            "profile-location"
        );


    const profileDescription =
        document.getElementById(
            "profile-description"
        );


    // ========================================
    // BASIC INFORMATION
    // ========================================

    if (profileType) {

        profileType.textContent =
            formatText(
                event.type || "Event"
            );

    }


    if (profileName) {

        profileName.textContent =
            event.name ||
            "Unknown Event";

    }


    if (profileDate) {

        profileDate.textContent =
            event.year || "";

    }


    if (profileYear) {

        profileYear.textContent =
            event.year ||
            "Unknown";

    }


    if (profileUniverse) {

        profileUniverse.textContent =
            event.universe ||
            "Unknown";

    }


    if (profileLocation) {

        profileLocation.textContent =
            event.location ||
            "Unknown";

    }


    if (profileDescription) {

        profileDescription.textContent =
            event.description ||
            "No description available.";

    }


    // ========================================
    // EXISTING CONNECTIONS
    // ========================================

    displayParticipants(
        event.participants
    );


    displayComics(
        event.comics
    );


    displayRelatedEvents(
        event.relatedEvents
    );


    // ========================================
    // NEW DATABASE CONNECTIONS
    // ========================================

    displayEventMovies(event);

    displayEventTeams(event);

    displayEventLocations(event);

    displayEventUniverse(event);


    // ========================================
    // RESET PROFILE SCROLL
    // ========================================

    const profileBox =
        document.querySelector(
            "#profile-modal .profile-box"
        );


    if (profileBox) {
        profileBox.scrollTop = 0;
    }


    // ========================================
    // SHOW MODAL
    // ========================================

    const modal =
        document.getElementById(
            "profile-modal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }


    // ========================================
    // UPDATE URL
    // ========================================

    if (
        updateURL &&
        event.id
    ) {

        const newURL =
            `events.html?id=${encodeURIComponent(
                event.id
            )}`;


        window.history.replaceState(
            {},
            "",
            newURL
        );

    }

}


// ========================================
// NORMALIZE VALUE
// ========================================

function normalizeValue(value) {

    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

}


// ========================================
// GET EVENT IDENTIFIERS
// ========================================

function getEventIdentifiers(event) {

    return [
        event.id,
        event.name,
        event.title
    ]
        .filter(Boolean)
        .map(normalizeValue);

}


// ========================================
// CHECK IF VALUE REFERENCES EVENT
// ========================================

function valueContainsEvent(
    value,
    event
) {

    if (
        value === null ||
        value === undefined
    ) {
        return false;
    }


    const normalizedValue =
        normalizeValue(value);


    if (!normalizedValue) {
        return false;
    }


    return getEventIdentifiers(event)
        .some(identifier =>
            normalizedValue === identifier ||
            normalizedValue.includes(identifier) ||
            identifier.includes(normalizedValue)
        );

}


// ========================================
// CHECK OBJECT FOR EVENT
// ========================================

function objectContainsEvent(
    object,
    event
) {

    if (!object) {
        return false;
    }


    for (const key of Object.keys(object)) {

        const value =
            object[key];


        if (
            typeof value === "string" ||
            typeof value === "number"
        ) {

            if (
                valueContainsEvent(
                    value,
                    event
                )
            ) {
                return true;
            }

        }


        if (Array.isArray(value)) {

            if (
                value.some(item =>
                    valueContainsEvent(
                        item,
                        event
                    )
                )
            ) {
                return true;
            }

        }

    }


    return false;

}


// ========================================
// GET CHARACTER BY VALUE
// ========================================

function findCharacter(value) {

    const target =
        normalizeValue(value);


    return characters.find(character => {

        return (

            normalizeValue(character.id) === target ||

            normalizeValue(character.name) === target ||

            normalizeValue(character.realName) === target

        );

    });

}


// ========================================
// GET MOVIE BY VALUE
// ========================================

function findMovie(value) {

    const target =
        normalizeValue(value);


    return movies.find(movie => {

        return (

            normalizeValue(movie.id) === target ||

            normalizeValue(movie.title) === target ||

            normalizeValue(movie.name) === target

        );

    });

}


// ========================================
// GET TEAM BY VALUE
// ========================================

function findTeam(value) {

    const target =
        normalizeValue(value);


    return teams.find(team => {

        return (

            normalizeValue(team.id) === target ||

            normalizeValue(team.name) === target

        );

    });

}


// ========================================
// GET LOCATION BY VALUE
// ========================================

function findLocation(value) {

    const target =
        normalizeValue(value);


    return locations.find(location => {

        return (

            normalizeValue(location.id) === target ||

            normalizeValue(location.name) === target

        );

    });

}


// ========================================
// GET UNIVERSE BY VALUE
// ========================================

function findUniverse(value) {

    const target =
        normalizeValue(value);


    return universes.find(universe => {

        return (

            normalizeValue(universe.id) === target ||

            normalizeValue(universe.name) === target ||

            normalizeValue(universe.designation) === target ||

            normalizeValue(universe.realName) === target

        );

    });

}


// ========================================
// MERGE UNIQUE
// ========================================

function mergeUnique(
    existing,
    additions
) {

    additions.forEach(item => {

        if (!item) {
            return;
        }


        const exists =
            existing.some(existingItem =>
                existingItem.id &&
                item.id &&
                existingItem.id === item.id
            );


        if (!exists) {
            existing.push(item);
        }

    });


    return existing;

}


// ========================================
// EVENT MOVIES
// ========================================

function getEventMovies(event) {

    const results = [];


    // Direct event fields

    const directFields = [
        "movies",
        "movie",
        "films",
        "shows",
        "media",
        "appearances",
        "relatedMovies"
    ];


    directFields.forEach(field => {

        const value =
            event[field];


        if (Array.isArray(value)) {

            value.forEach(item => {

                const movie =
                    findMovie(item);

                if (movie) {
                    results.push(movie);
                }

            });

        } else if (value) {

            const movie =
                findMovie(value);

            if (movie) {
                results.push(movie);
            }

        }

    });


    // Reverse search through movies

    movies.forEach(movie => {

        if (
            objectContainsEvent(
                movie,
                event
            )
        ) {

            results.push(movie);

        }

    });


    return mergeUnique([], results);

}


// ========================================
// DISPLAY EVENT MOVIES
// ========================================

function displayEventMovies(event) {

    createConnectionSection(
        "Movies & Shows",
        getEventMovies(event),
        "movies.html?id="
    );

}


// ========================================
// EVENT TEAMS
// ========================================

function getEventTeams(event) {

    const results = [];


    const directFields = [
        "teams",
        "team",
        "organizations",
        "groups",
        "affiliations",
        "relatedTeams"
    ];


    directFields.forEach(field => {

        const value =
            event[field];


        if (Array.isArray(value)) {

            value.forEach(item => {

                const team =
                    findTeam(item);

                if (team) {
                    results.push(team);
                }

            });

        } else if (value) {

            const team =
                findTeam(value);

            if (team) {
                results.push(team);
            }

        }

    });


    teams.forEach(team => {

        if (
            objectContainsEvent(
                team,
                event
            )
        ) {

            results.push(team);

        }

    });


    return mergeUnique([], results);

}


// ========================================
// DISPLAY EVENT TEAMS
// ========================================

function displayEventTeams(event) {

    createConnectionSection(
        "Teams",
        getEventTeams(event),
        "teams.html?id="
    );

}


// ========================================
// EVENT LOCATIONS
// ========================================

function getEventLocations(event) {

    const results = [];


    const directFields = [
        "locations",
        "location",
        "places",
        "featuredLocations",
        "relatedLocations"
    ];


    directFields.forEach(field => {

        const value =
            event[field];


        if (Array.isArray(value)) {

            value.forEach(item => {

                const location =
                    findLocation(item);

                if (location) {
                    results.push(location);
                }

            });

        } else if (value) {

            const location =
                findLocation(value);

            if (location) {
                results.push(location);
            }

        }

    });


    locations.forEach(location => {

        if (
            objectContainsEvent(
                location,
                event
            )
        ) {

            results.push(location);

        }

    });


    // Event's existing location field

    if (event.location) {

        const directLocation =
            findLocation(
                event.location
            );


        if (directLocation) {

            results.push(
                directLocation
            );

        }

    }


    return mergeUnique([], results);

}


// ========================================
// DISPLAY EVENT LOCATIONS
// ========================================

function displayEventLocations(event) {

    createConnectionSection(
        "Locations",
        getEventLocations(event),
        "locations.html?id="
    );

}


// ========================================
// EVENT UNIVERSE
// ========================================

function getEventUniverse(event) {

    // Direct universe

    if (event.universe) {

        const directUniverse =
            findUniverse(
                event.universe
            );


        if (directUniverse) {
            return directUniverse;
        }

    }


    // Search all universe records

    const universe =
        universes.find(item =>
            objectContainsEvent(
                item,
                event
            )
        );


    return universe || null;

}


// ========================================
// DISPLAY EVENT UNIVERSE
// ========================================

function displayEventUniverse(event) {

    const universe =
        getEventUniverse(event);


    if (!universe) {
        return;
    }


    createConnectionSection(
        "Universe",
        [universe],
        "universes.html?id="
    );

}


// ========================================
// CREATE CONNECTION SECTION
// ========================================

function createConnectionSection(
    title,
    items,
    baseURL
) {

    const modalBody =
        document.getElementById(
            "profile-modal"
        );


    if (!modalBody) {
        return;
    }


    const existingContainer =
        document.getElementById(
            "profile-modal"
        );


    if (!existingContainer) {
        return;
    }


    // Find the actual profile content area

    const profileContent =
        existingContainer.querySelector(
            ".profile-box"
        );


    if (!profileContent) {
        return;
    }


    if (
        !items ||
        items.length === 0
    ) {
        return;
    }


    const section =
        document.createElement(
            "div"
        );


    section.className =
        "profile-section";


    const heading =
        document.createElement(
            "h3"
        );


    heading.textContent =
        title;


    const connections =
        document.createElement(
            "div"
        );


    connections.className =
        "profile-connections";


    items.forEach(item => {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "profile-button";


        button.textContent =
            item.name ||
            item.title ||
            item.designation ||
            "Unknown";


        button.addEventListener(
            "click",
            function() {

                window.location.href =
                    `${baseURL}${encodeURIComponent(
                        item.id
                    )}`;

            }
        );


        connections.appendChild(
            button
        );

    });


    section.appendChild(
        heading
    );


    section.appendChild(
        connections
    );


    // Insert before Related Events

    const relatedSection =
        document.getElementById(
            "profile-related"
        );


    if (
        relatedSection &&
        relatedSection.parentElement
    ) {

        relatedSection.parentElement.parentNode.insertBefore(
            section,
            relatedSection.parentElement
        );

    } else {

        profileContent.appendChild(
            section
        );

    }

}


// ========================================
// DISPLAY PARTICIPANTS
// ========================================

function displayParticipants(
    participantValues
) {

    const container =
        document.getElementById(
            "profile-participants"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !Array.isArray(participantValues) ||
        participantValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    participantValues.forEach(
        participantValue => {

            const character =
                findCharacter(
                    participantValue
                );


            if (character) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "profile-button";


                button.textContent =
                    character.name;


                button.addEventListener(
                    "click",
                    function() {

                        window.location.href =
                            `characters.html?id=${encodeURIComponent(
                                character.id
                            )}`;

                    }
                );


                container.appendChild(
                    button
                );

            } else {

                const text =
                    document.createElement(
                        "span"
                    );


                text.textContent =
                    participantValue;


                container.appendChild(
                    text
                );

            }


            container.appendChild(
                document.createTextNode(" ")
            );

        }
    );

}


// ========================================
// DISPLAY COMICS
// ========================================

function displayComics(
    comicValues
) {

    const container =
        document.getElementById(
            "profile-comics"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !Array.isArray(comicValues) ||
        comicValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    comicValues.forEach(
        comicValue => {

            const button =
                document.createElement(
                    "span"
                );


            button.className =
                "profile-button";


            button.textContent =
                comicValue;


            container.appendChild(
                button
            );


            container.appendChild(
                document.createTextNode(" ")
            );

        }
    );

}


// ========================================
// DISPLAY RELATED EVENTS
// ========================================

function displayRelatedEvents(
    relatedEventValues
) {

    const container =
        document.getElementById(
            "profile-related"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !Array.isArray(relatedEventValues) ||
        relatedEventValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    relatedEventValues.forEach(
        relatedEventValue => {

            const target =
                normalizeValue(
                    relatedEventValue
                );


            const relatedEvent =
                events.find(event => {

                    return (

                        normalizeValue(event.id) === target ||

                        normalizeValue(event.name) === target

                    );

                });


            if (relatedEvent) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "profile-button";


                button.textContent =
                    relatedEvent.name;


                button.addEventListener(
                    "click",
                    function() {

                        openProfile(
                            relatedEvent
                        );

                    }
                );


                container.appendChild(
                    button
                );

            } else {

                const text =
                    document.createElement(
                        "span"
                    );


                text.textContent =
                    relatedEventValue;


                container.appendChild(
                    text
                );

            }


            container.appendChild(
                document.createTextNode(" ")
            );

        }
    );

}


// ========================================
// CLOSE PROFILE
// ========================================

function closeProfile() {

    const modal =
        document.getElementById(
            "profile-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    window.history.replaceState(
        {},
        "",
        "events.html"
    );

}


// ========================================
// CLOSE WHEN CLICKING OUTSIDE
// ========================================

const profileModal =
    document.getElementById(
        "profile-modal"
    );


if (profileModal) {

    profileModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeProfile();

            }

        }
    );

}


// ========================================
// ESC KEY
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            const modal =
                document.getElementById(
                    "profile-modal"
                );


            if (
                modal &&
                modal.classList.contains("active")
            ) {

                closeProfile();

            }

        }

    }
);


// ========================================
// FORMAT TEXT
// ========================================

function formatText(text) {

    if (!text) {
        return "";
    }


    return String(text)

        .replace(/-/g, " ")

        .split(" ")

        .map(word => {

            if (!word) {
                return "";
            }


            return (
                word.charAt(0).toUpperCase() +
                word.slice(1)
            );

        })

        .join(" ");

}