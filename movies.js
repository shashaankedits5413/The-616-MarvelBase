window.scrollTo(0, 0);

let movies = [];
let characters = [];
let teams = [];
let locations = [];
let events = [];
let universes = [];


// ========================================
// LOAD DATABASE
// ========================================

Promise.all([

    fetch("data/movies.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Could not load movies.json"
                );
            }

            return response.json();

        }),

    fetch("data/characters.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Could not load characters.json"
                );
            }

            return response.json();

        }),

    fetch("data/teams.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Could not load teams.json"
                );
            }

            return response.json();

        }),

    fetch("data/locations.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Could not load locations.json"
                );
            }

            return response.json();

        }),

    fetch("data/events.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Could not load events.json"
                );
            }

            return response.json();

        }),

    fetch("data/universes.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Could not load universes.json"
                );
            }

            return response.json();

        })

])

.then(([
    movieData,
    characterData,
    teamData,
    locationData,
    eventData,
    universeData
]) => {

    // ========================================
    // MOVIES
    // ========================================

    if (Array.isArray(movieData)) {

        movies = movieData;

    }

    else if (
        movieData &&
        Array.isArray(movieData.movies) &&
        Array.isArray(movieData.shows)
    ) {

        movies = [
            ...movieData.movies,
            ...movieData.shows
        ];

    }

    else {

        throw new Error(
            "movies.json does not contain a valid database."
        );

    }


    // ========================================
    // CHARACTERS
    // ========================================

    characters =
        Array.isArray(characterData)
            ? characterData
            : characterData.characters || [];


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
    // EVENTS
    // ========================================

    events =
        Array.isArray(eventData)
            ? eventData
            : eventData.events || [];


    // ========================================
    // UNIVERSES
    // ========================================

    universes =
        Array.isArray(universeData)
            ? universeData
            : universeData.universes || [];


    // ========================================
    // DISPLAY DATABASE
    // ========================================

    displayDatabase(movies);


    // ========================================
    // OPEN MOVIE FROM URL
    // ========================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const movieId =
        urlParams.get("id");


    if (movieId) {

        const movie =
            movies.find(
                item =>
                    String(item.id) ===
                    String(movieId)
            );


        if (movie) {
            openProfile(movie);
        }

    }

})

.catch(error => {

    console.error(
        "Error loading movie database:",
        error
    );


    const movieGrid =
        document.getElementById(
            "movie-grid"
        );

    const showGrid =
        document.getElementById(
            "show-grid"
        );


    if (movieGrid) {

        movieGrid.innerHTML = `
            <p class="error-message">
                Unable to load movie database.
            </p>
        `;

    }


    if (showGrid) {
        showGrid.innerHTML = "";
    }

});


// ========================================
// DISPLAY DATABASE
// ========================================

function displayDatabase(database) {

    const movieGrid =
        document.getElementById(
            "movie-grid"
        );

    const showGrid =
        document.getElementById(
            "show-grid"
        );


    if (!movieGrid || !showGrid) {

        console.error(
            "Movie or show grid not found."
        );

        return;

    }


    movieGrid.innerHTML = "";
    showGrid.innerHTML = "";


    // ========================================
    // SEPARATE MOVIES AND SHOWS
    // ========================================

    const movieList =
        database.filter(
            item => !isShow(item)
        );

    const showList =
        database.filter(
            item => isShow(item)
        );


    // ========================================
    // UPDATE COUNTS
    // ========================================

    const movieCount =
        document.getElementById(
            "movie-count"
        );

    const showCount =
        document.getElementById(
            "show-count"
        );


    if (movieCount) {
        movieCount.textContent =
            movieList.length;
    }


    if (showCount) {
        showCount.textContent =
            showList.length;
    }


    // ========================================
    // DISPLAY MOVIES
    // ========================================

    movieList.forEach(movie => {

        movieGrid.appendChild(
            createMovieCard(movie)
        );

    });


    // ========================================
    // DISPLAY SHOWS
    // ========================================

    showList.forEach(show => {

        showGrid.appendChild(
            createMovieCard(show)
        );

    });

}


// ========================================
// DETERMINE IF ENTRY IS A SHOW
// ========================================

function isShow(item) {

    if (!item || !item.type) {
        return false;
    }


    const type =
        item.type
            .toLowerCase()
            .trim();


    return (
        type.includes("show") ||
        type.includes("television") ||
        type.includes("tv") ||
        type.includes("netflix") ||
        type.includes("animated")
    );

}


// ========================================
// CREATE MOVIE / SHOW CARD
// ========================================

function createMovieCard(item) {

    const card =
        document.createElement("div");


    card.className =
        "movie-card";


    const entryType =
        isShow(item)
            ? "SHOW"
            : "MOVIE";


    card.innerHTML = `

        <div class="movie-poster">

            <img
                src="${item.image || ""}"
                alt="${item.title || "Marvel entry"}"
            >

        </div>

        <div class="movie-info">

            <p class="movie-type">
                ${formatText(item.type || "")}
            </p>

            <h2>
                ${item.title || "Untitled"}
            </h2>

            <p class="movie-year">
                ${item.year || ""}
            </p>

            <button
                class="view-profile"
                type="button"
            >
                VIEW ${entryType}
            </button>

        </div>

    `;


    // ========================================
    // PROFILE BUTTON
    // ========================================

    const button =
        card.querySelector(
            ".view-profile"
        );


    if (button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                openProfile(item);

            }
        );

    }


    // ========================================
    // CARD CLICK
    // ========================================

    card.addEventListener(
        "click",
        function(event) {

            if (
                event.target.closest(
                    ".view-profile"
                )
            ) {
                return;
            }

            openProfile(item);

        }
    );


    return card;

}


// ========================================
// SEARCH
// ========================================

const search =
    document.getElementById(
        "movie-search"
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
                movies.filter(item => {

                    const title =
                        item.title
                            ? item.title.toLowerCase()
                            : "";


                    const type =
                        item.type
                            ? item.type.toLowerCase()
                            : "";


                    const year =
                        item.year
                            ? item.year.toString()
                            : "";


                    const charactersText =
                        Array.isArray(
                            item.mainCharacters
                        )
                            ? item.mainCharacters
                                .join(" ")
                                .toLowerCase()
                            : "";


                    return (
                        title.includes(searchText) ||
                        type.includes(searchText) ||
                        year.includes(searchText) ||
                        charactersText.includes(searchText)
                    );

                });


            displayDatabase(results);

        }
    );

}


// ========================================
// OPEN PROFILE
// ========================================

function openProfile(item) {

    if (!item) {
        return;
    }


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
    // BASIC INFORMATION
    // ========================================

    const profileType =
        document.getElementById(
            "profile-type"
        );

    const profileName =
        document.getElementById(
            "profile-name"
        );

    const profileYear =
        document.getElementById(
            "profile-year"
        );

    const profileYearStat =
        document.getElementById(
            "profile-year-stat"
        );

    const profileDirector =
        document.getElementById(
            "profile-director"
        );

    const profilePhase =
        document.getElementById(
            "profile-phase"
        );

    const profileDescription =
        document.getElementById(
            "profile-description"
        );

    const profilePlot =
        document.getElementById(
            "profile-plot"
        );


    if (profileType) {

        profileType.textContent =
            formatText(
                item.type || ""
            );

    }


    if (profileName) {

        profileName.textContent =
            item.title ||
            "Untitled";

    }


    if (profileYear) {

        profileYear.textContent =
            item.year ||
            "";

    }


    if (profileYearStat) {

        profileYearStat.textContent =
            item.year ||
            "";

    }


    if (profileDirector) {

        profileDirector.textContent =
            item.director ||
            "Unknown";

    }


    if (profilePhase) {

        profilePhase.textContent =
            item.phase ||
            "Unknown";

    }


    if (profileDescription) {

        profileDescription.textContent =
            item.description ||
            "No description available.";

    }


    if (profilePlot) {

        profilePlot.textContent =
            item.plot ||
            "No plot available.";

    }


    // ========================================
    // MAIN CHARACTERS
    // ========================================

    displayMainCharacters(
        item.mainCharacters
    );


    // ========================================
    // RELATED MOVIES
    // ========================================

    displayRelatedMovies(
        item.relatedMovies
    );


    // ========================================
    // NEW DATABASE CONNECTIONS
    // ========================================

    displayMovieTeams(item);

    displayMovieLocations(item);

    displayMovieEvents(item);

    displayMovieUniverse(item);

activateSpecialEffect(
    "movie",
    item.id
);
    // ========================================
    // SHOW PROFILE
    // ========================================

    const modal =
        document.getElementById(
            "profile-modal"
        );


    if (modal) {
        modal.classList.add("active");
    }


    // ========================================
    // UPDATE URL
    // ========================================

    if (item.id) {

        const newURL =
            `movies.html?id=${encodeURIComponent(item.id)}`;


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
        .trim()
        .toLowerCase();

}


// ========================================
// GET ALL POSSIBLE MOVIE VALUES
// ========================================

function getMovieValues(item) {

    return [

        item.id,
        item.title,

        item.universe,
        item.universeId,
        item.reality,
        item.designation,

        item.location,
        item.setting,

        item.event,
        item.eventId

    ]
        .filter(Boolean)
        .map(normalizeValue);

}


// ========================================
// CHECK WHETHER A VALUE REFERENCES MOVIE
// ========================================

function valueContainsMovie(
    value,
    movie
) {

    if (!value) {
        return false;
    }


    const movieValues =
        getMovieValues(movie);


    if (Array.isArray(value)) {

        return value.some(
            entry =>
                valueContainsMovie(
                    entry,
                    movie
                )
        );

    }


    if (typeof value === "object") {

        return Object.values(value).some(
            entry =>
                valueContainsMovie(
                    entry,
                    movie
                )
        );

    }


    const normalized =
        normalizeValue(value);


    return movieValues.some(
        movieValue =>
            normalized === movieValue ||
            normalized.includes(movieValue) ||
            movieValue.includes(normalized)
    );

}


// ========================================
// CHECK OBJECT FIELDS
// ========================================

function objectContainsMovie(
    object,
    movie,
    fields
) {

    if (!object) {
        return false;
    }


    for (const field of fields) {

        if (
            Object.prototype.hasOwnProperty.call(
                object,
                field
            )
        ) {

            if (
                valueContainsMovie(
                    object[field],
                    movie
                )
            ) {
                return true;
            }

        }

    }


    return false;

}


// ========================================
// GENERIC CONNECTION SECTION
// ========================================

function createMovieConnectionSection(
    id,
    title,
    items,
    linkBuilder
) {

    const profileBox =
        document.querySelector(
            "#profile-modal .profile-box"
        );


    if (!profileBox) {
        return;
    }


    let section =
        document.getElementById(id);


    if (!section) {

        section =
            document.createElement("div");

        section.id =
            id;

        section.className =
            "profile-section";


        /*
            Put database connections before
            the existing RELATED MOVIES section.
        */

        const related =
            document.getElementById(
                "profile-related"
            );


        if (
            related &&
            related.parentElement &&
            related.parentElement.parentNode
        ) {

            related.parentElement.parentNode.insertBefore(
                section,
                related.parentElement
            );

        }

        else {

            profileBox.appendChild(
                section
            );

        }

    }


    section.innerHTML = "";


    const heading =
        document.createElement("h3");


    heading.textContent =
        title;


    section.appendChild(
        heading
    );


    if (
        !items ||
        items.length === 0
    ) {

        const empty =
            document.createElement("p");


        empty.textContent =
            `No ${title.toLowerCase()} currently linked.`;


        section.appendChild(
            empty
        );


        return;

    }


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "profile-connections";


    items.forEach(item => {

        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            "profile-button";


        button.textContent =
            item.name ||
            item.title ||
            item.id ||
            "Unknown";


        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                linkBuilder(item);

            }
        );


        wrapper.appendChild(
            button
        );

    });


    section.appendChild(
        wrapper
    );

}


// ========================================
// MOVIE → TEAMS
// ========================================

function getMovieTeams(movie) {

    return teams.filter(team => {

        return objectContainsMovie(
            team,
            movie,
            [
                "movies",
                "movie",
                "films",
                "shows",
                "media",
                "appearances"
            ]
        );

    });

}


function displayMovieTeams(movie) {

    const linkedTeams =
        getMovieTeams(movie);


    createMovieConnectionSection(
        "movie-teams-section",
        "TEAMS",
        linkedTeams,
        team => {

            window.location.href =
                `teams.html?id=${encodeURIComponent(team.id)}`;

        }
    );

}


// ========================================
// MOVIE → LOCATIONS
// ========================================

function getMovieLocations(movie) {

    return locations.filter(location => {

        return objectContainsMovie(
            location,
            movie,
            [
                "movies",
                "movie",
                "shows",
                "media",
                "appearances",
                "featuredMovies",
                "relatedMovies"
            ]
        );

    });

}


function displayMovieLocations(movie) {

    const linkedLocations =
        getMovieLocations(movie);


    createMovieConnectionSection(
        "movie-locations-section",
        "LOCATIONS",
        linkedLocations,
        location => {

            window.location.href =
                `locations.html?id=${encodeURIComponent(location.id)}`;

        }
    );

}


// ========================================
// MOVIE → EVENTS
// ========================================

function getMovieEvents(movie) {

    return events.filter(event => {

        return objectContainsMovie(
            event,
            movie,
            [
                "movies",
                "movie",
                "shows",
                "media",
                "appearances",
                "relatedMovies"
            ]
        );

    });

}


function displayMovieEvents(movie) {

    const linkedEvents =
        getMovieEvents(movie);


    createMovieConnectionSection(
        "movie-events-section",
        "EVENTS",
        linkedEvents,
        event => {

            window.location.href =
                `events.html?id=${encodeURIComponent(event.id)}`;

        }
    );

}


// ========================================
// MOVIE → UNIVERSE
// ========================================

function getMovieUniverse(movie) {

    const possibleUniverse =
        movie.universe ||
        movie.universeId ||
        movie.reality ||
        movie.designation;


    if (!possibleUniverse) {
        return null;
    }


    const target =
        normalizeValue(
            possibleUniverse
        );


    return universes.find(universe => {

        const values = [

            universe.id,
            universe.name,
            universe.title,
            universe.designation,
            universe.realName,
            universe.universe

        ]
            .filter(Boolean)
            .map(normalizeValue);


        return values.includes(target);

    }) || null;

}


function displayMovieUniverse(movie) {

    const universe =
        getMovieUniverse(movie);


    createMovieConnectionSection(
        "movie-universe-section",
        "UNIVERSE",
        universe
            ? [universe]
            : [],
        selectedUniverse => {

            window.location.href =
                `universes.html?id=${encodeURIComponent(selectedUniverse.id)}`;

        }
    );

}


// ========================================
// DISPLAY MAIN CHARACTERS
// ========================================

function displayMainCharacters(
    characterNames
) {

    const container =
        document.getElementById(
            "profile-characters"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !Array.isArray(characterNames) ||
        characterNames.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    characterNames.forEach(name => {

        const character =
            findCharacterByMovieName(
                name
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
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    window.location.href =
                        `characters.html?id=${encodeURIComponent(character.id)}`;

                }
            );


            container.appendChild(
                button
            );

        }

        else {

            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                name;


            container.appendChild(
                text
            );

        }


        container.appendChild(
            document.createTextNode(" ")
        );

    });

}


// ========================================
// FIND CHARACTER FROM MOVIE NAME
// ========================================

function findCharacterByMovieName(
    name
) {

    if (!name) {
        return null;
    }


    const normalized =
        normalizeValue(name);


    return characters.find(
        character => {

            if (!character) {
                return false;
            }


            const names = [

                character.id,
                character.name,
                character.realName

            ]
                .filter(Boolean)
                .map(normalizeValue);


            /*
                Also check common character aliases
                stored directly in the character object.
            */

            const aliases = [

                character.alias,
                character.aliases,
                character.codeName,
                character.codename

            ];


            const allNames = [

                ...names

            ];


            aliases.forEach(alias => {

                if (Array.isArray(alias)) {

                    alias.forEach(
                        value => {

                            if (value) {
                                allNames.push(
                                    normalizeValue(
                                        value
                                    )
                                );
                            }

                        }
                    );

                }

                else if (alias) {

                    allNames.push(
                        normalizeValue(
                            alias
                        )
                    );

                }

            });


            return allNames.includes(
                normalized
            );

        }
    ) || null;

}


// ========================================
// DISPLAY RELATED MOVIES
// ========================================

function displayRelatedMovies(
    relatedMovies
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
        !Array.isArray(relatedMovies) ||
        relatedMovies.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    relatedMovies.forEach(
        relatedMovieValue => {

            const target =
                String(
                    relatedMovieValue || ""
                )
                    .trim()
                    .toLowerCase();


            const relatedMovie =
                movies.find(
                    movie => {

                        const movieID =
                            String(
                                movie.id || ""
                            )
                                .trim()
                                .toLowerCase();


                        const movieTitle =
                            String(
                                movie.title || ""
                            )
                                .trim()
                                .toLowerCase();


                        return (
                            movieID === target ||
                            movieTitle === target
                        );

                    }
                );


            if (!relatedMovie) {
                return;
            }


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "profile-button";


            button.textContent =
                relatedMovie.title;


            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    openProfile(
                        relatedMovie
                    );

                }
            );


            container.appendChild(
                button
            );


            container.appendChild(
                document.createTextNode(" ")
            );

        }
    );


    if (
        container.children.length === 0
    ) {

        container.textContent =
            "No related movies found.";

    }

}


// ========================================
// CLOSE PROFILE
// ========================================

function closeProfile() {


    clearSpecialEffect();
    
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
        "movies.html"
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
// ESC KEY CLOSES PROFILE
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeProfile();

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