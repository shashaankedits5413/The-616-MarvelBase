let locations = [];
let characters = [];
let movies = [];
let teams = [];
let events = [];


// ===============================
// LOAD DATABASE
// ===============================

Promise.all([

    fetch("data/locations.json")
        .then(res => res.json()),

    fetch("data/characters.json")
        .then(res => res.json()),

    fetch("data/movies.json")
        .then(res => res.json()),

    fetch("data/teams.json")
        .then(res => res.json()),

    fetch("data/events.json")
        .then(res => res.json())

])

.then(([
    locationData,
    characterData,
    movieData,
    teamData,
    eventData
]) => {


    // ===============================
    // LOCATIONS
    // ===============================

    locations = Array.isArray(locationData)
        ? locationData
        : locationData.locations || [];


    // ===============================
    // CHARACTERS
    // ===============================

    characters = Array.isArray(characterData)
        ? characterData
        : characterData.characters || [];


    // ===============================
    // MOVIES + SHOWS
    // ===============================

    if (Array.isArray(movieData)) {

        movies = movieData;

    } else {

        movies = [

            ...(movieData.movies || []),

            ...(movieData.shows || [])

        ];

    }


    // ===============================
    // TEAMS
    // ===============================

    teams = Array.isArray(teamData)
        ? teamData
        : teamData.teams || [];


    // ===============================
    // EVENTS
    // ===============================

    events = Array.isArray(eventData)
        ? eventData
        : eventData.events || [];


    // ===============================
    // DISPLAY LOCATIONS
    // ===============================

    displayLocations(locations);


    // ===============================
    // DEEP LINK
    // ===============================

    const params =
        new URLSearchParams(
            window.location.search
        );


    const locationID =
        params.get("id");


    if (locationID) {

        const location =
            locations.find(item =>

                String(item.id || "")
                    .toLowerCase() ===
                locationID.toLowerCase()

            );


        if (location) {

            openProfile(location);

        }

    }

})


.catch(error => {

    console.error(
        "Failed to load location database:",
        error
    );

});


// ===============================
// DISPLAY LOCATIONS
// ===============================

function displayLocations(database) {

    const grid =
        document.getElementById("location-grid");

    const count =
        document.getElementById("location-count");


    if (!grid) return;


    grid.innerHTML = "";


    if (count) {

        count.textContent =
            database.length;

    }


    if (database.length === 0) {

        grid.innerHTML = `
            <p class="no-results">
                No locations found.
            </p>
        `;

        return;

    }


    database.forEach(location => {

        grid.appendChild(
            createLocationCard(location)
        );

    });

}


// ===============================
// CREATE LOCATION CARD
// ===============================

function createLocationCard(location) {

    const card =
        document.createElement("div");

    card.className =
        "movie-card";


    card.setAttribute(
        "role",
        "button"
    );

    card.setAttribute(
        "tabindex",
        "0"
    );


    card.innerHTML = `

        <img
            class="movie-poster"
            src="${location.image || "images/location-default.jpg"}"
            alt="${location.name || "Location"}"
        >

        <div class="movie-info">

            <p class="movie-type">
                ${location.type || "Location"}
            </p>

            <h3>
                ${location.name || "Unknown Location"}
            </h3>

            <p class="movie-year">
                ${location.universe || ""}
            </p>

            <button
                class="view-profile"
                type="button">
                VIEW LOCATION
            </button>

        </div>

    `;


    const image =
        card.querySelector("img");


    if (image) {

        image.addEventListener(
            "error",
            function() {

                this.src =
                    "images/location-default.jpg";

            }
        );

    }


    // ===============================
    // CARD CLICK
    // ===============================

    card.addEventListener(
        "click",
        function(event) {

            if (
                event.target.closest(".view-profile")
            ) {

                return;

            }

            openProfile(location);

        }
    );


    // ===============================
    // VIEW PROFILE BUTTON
    // ===============================

    const viewButton =
        card.querySelector(".view-profile");


    if (viewButton) {

        viewButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                openProfile(location);

            }
        );

    }


    // ===============================
    // KEYBOARD ACCESS
    // ===============================

    card.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openProfile(location);

            }

        }
    );


    return card;

}


// ===============================
// SEARCH
// ===============================

const searchInput =
    document.getElementById(
        "location-search"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const filtered =
                locations.filter(location => {

                    return [

                        location.name,
                        location.type,
                        location.universe,
                        location.status,
                        location.description

                    ]
                    .filter(Boolean)
                    .some(value =>

                        String(value)
                            .toLowerCase()
                            .includes(query)

                    );

                });


            displayLocations(filtered);

        }
    );

}


// ===============================
// OPEN PROFILE
// ===============================

function openProfile(location) {

    const modal =
        document.getElementById(
            "profile-modal"
        );


    if (!modal) return;


    // ===============================
    // BASIC INFORMATION
    // ===============================

    const profileType =
        document.getElementById(
            "profile-type"
        );


    const profileName =
        document.getElementById(
            "profile-name"
        );


    const profileUniverse =
        document.getElementById(
            "profile-universe"
        );


    const profileTypeStat =
        document.getElementById(
            "profile-type-stat"
        );


    const profileUniverseStat =
        document.getElementById(
            "profile-universe-stat"
        );


    const profileStatus =
        document.getElementById(
            "profile-status"
        );


    const profileDescription =
        document.getElementById(
            "profile-description"
        );


    if (profileType) {

        profileType.textContent =
            location.type || "Location";

    }


    if (profileName) {

        profileName.textContent =
            location.name ||
            "Unknown Location";

    }


    if (profileUniverse) {

        profileUniverse.textContent =
            location.universe ||
            "Unknown";

    }


    if (profileTypeStat) {

        profileTypeStat.textContent =
            location.type ||
            "Unknown";

    }


    if (profileUniverseStat) {

        profileUniverseStat.textContent =
            location.universe ||
            "Unknown";

    }


    if (profileStatus) {

        profileStatus.textContent =
            location.status ||
            "Unknown";

    }


    if (profileDescription) {

        profileDescription.textContent =
            location.description ||
            "No description available.";

    }


    // ===============================
    // CONNECTIONS
    // ===============================

    displayCharacters(
        location.characters
    );


    displayLocationMovies(
        location.movies
    );


    displayLocationTeams(
        location.teams
    );


    displayLocationEvents(
        location.events
    );


    displayRelatedLocations(
        location.relatedLocations
    );


    // ===============================
    // RESET MODAL SCROLL
    // ===============================

    const profileBox =
        document.querySelector(
            "#profile-modal .profile-box"
        );


    if (profileBox) {

        profileBox.scrollTop = 0;

    }


    // ===============================
    // OPEN MODAL
    // ===============================

    modal.classList.add("active");


    // ===============================
    // UPDATE URL
    // ===============================

    if (location.id) {

        history.replaceState(
            null,
            "",
            `locations.html?id=${encodeURIComponent(
                location.id
            )}`
        );

    }

}


// ===============================
// CHARACTERS
// ===============================

function displayCharacters(characterValues) {

    const container =
        document.getElementById(
            "profile-characters"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !Array.isArray(characterValues) ||
        characterValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    characterValues.forEach(value => {

        const target =
            String(value || "")
                .trim()
                .toLowerCase();


        const character =
            characters.find(item => {

                const id =
                    String(item.id || "")
                        .trim()
                        .toLowerCase();


                const name =
                    String(item.name || "")
                        .trim()
                        .toLowerCase();


                const realName =
                    String(item.realName || "")
                        .trim()
                        .toLowerCase();


                return (
                    id === target ||
                    name === target ||
                    realName === target
                );

            });


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
                formatText(value);


            text.style.opacity =
                "0.55";


            container.appendChild(
                text
            );

        }


        container.appendChild(
            document.createTextNode(" ")
        );

    });


    if (
        container.children.length === 0
    ) {

        container.textContent =
            "No linked characters found.";

    }

}


// ===============================
// MOVIES + SHOWS
// ===============================

function displayLocationMovies(movieValues) {

    const container =
        document.getElementById(
            "profile-movies"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !Array.isArray(movieValues) ||
        movieValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    movieValues.forEach(value => {

        const target =
            String(value || "")
                .trim()
                .toLowerCase();


        const movie =
            movies.find(item => {

                const id =
                    String(item.id || "")
                        .trim()
                        .toLowerCase();


                const title =
                    String(item.title || "")
                        .trim()
                        .toLowerCase();


                return (
                    id === target ||
                    title === target
                );

            });


        if (movie) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "profile-button";


            button.textContent =
                movie.title;


            button.addEventListener(
                "click",
                function() {

                    window.location.href =
                        `movies.html?id=${encodeURIComponent(
                            movie.id
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
                formatText(value);


            text.style.opacity =
                "0.55";


            container.appendChild(
                text
            );

        }


        container.appendChild(
            document.createTextNode(" ")
        );

    });


    if (
        container.children.length === 0
    ) {

        container.textContent =
            "No linked movies found.";

    }

}


// ===============================
// TEAMS
// ===============================

function displayLocationTeams(teamValues) {

    const container =
        document.getElementById(
            "profile-teams"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !Array.isArray(teamValues) ||
        teamValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    teamValues.forEach(value => {

        const target =
            String(value || "")
                .trim()
                .toLowerCase();


        const team =
            teams.find(item => {

                const id =
                    String(item.id || "")
                        .trim()
                        .toLowerCase();


                const name =
                    String(item.name || "")
                        .trim()
                        .toLowerCase();


                return (
                    id === target ||
                    name === target
                );

            });


        if (team) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "profile-button";


            button.textContent =
                team.name;


            button.addEventListener(
                "click",
                function() {

                    window.location.href =
                        `teams.html?id=${encodeURIComponent(
                            team.id
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
                formatText(value);


            text.style.opacity =
                "0.55";


            container.appendChild(
                text
            );

        }


        container.appendChild(
            document.createTextNode(" ")
        );

    });


    if (
        container.children.length === 0
    ) {

        container.textContent =
            "No linked teams found.";

    }

}


// ===============================
// EVENTS
// ===============================

function displayLocationEvents(eventValues) {

    const container =
        document.getElementById(
            "profile-events"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !Array.isArray(eventValues) ||
        eventValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    eventValues.forEach(value => {

        const target =
            String(value || "")
                .trim()
                .toLowerCase();


        const event =
            events.find(item => {

                const id =
                    String(item.id || "")
                        .trim()
                        .toLowerCase();


                const name =
                    String(item.name || "")
                        .trim()
                        .toLowerCase();


                const title =
                    String(item.title || "")
                        .trim()
                        .toLowerCase();


                return (
                    id === target ||
                    name === target ||
                    title === target
                );

            });


        if (event) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "profile-button";


            button.textContent =
                event.name ||
                event.title;


            button.addEventListener(
                "click",
                function() {

                    window.location.href =
                        `events.html?id=${encodeURIComponent(
                            event.id
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
                formatText(value);


            text.style.opacity =
                "0.55";


            container.appendChild(
                text
            );

        }


        container.appendChild(
            document.createTextNode(" ")
        );

    });


    if (
        container.children.length === 0
    ) {

        container.textContent =
            "No linked events found.";

    }

}


// ===============================
// RELATED LOCATIONS
// ===============================

function displayRelatedLocations(
    locationValues
) {

    const container =
        document.getElementById(
            "profile-related"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !Array.isArray(locationValues) ||
        locationValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    locationValues.forEach(value => {

        const target =
            String(value || "")
                .trim()
                .toLowerCase();


        const relatedLocation =
            locations.find(item => {

                const id =
                    String(item.id || "")
                        .trim()
                        .toLowerCase();


                const name =
                    String(item.name || "")
                        .trim()
                        .toLowerCase();


                return (
                    id === target ||
                    name === target
                );

            });


        if (relatedLocation) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "profile-button";


            button.textContent =
                relatedLocation.name;


            button.addEventListener(
                "click",
                function() {

                    openProfile(
                        relatedLocation
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
                formatText(value);


            text.style.opacity =
                "0.55";


            container.appendChild(
                text
            );

        }


        container.appendChild(
            document.createTextNode(" ")
        );

    });


    if (
        container.children.length === 0
    ) {

        container.textContent =
            "No linked locations found.";

    }

}


// ===============================
// CLOSE PROFILE
// ===============================

function closeProfile() {

    const modal =
        document.getElementById(
            "profile-modal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    history.replaceState(
        null,
        "",
        "locations.html"
    );

}


// ===============================
// CLOSE BUTTON
// ===============================

const closeButton =
    document.querySelector(
        "#profile-modal .close-button"
    );


if (closeButton) {

    closeButton.addEventListener(
        "click",
        closeProfile
    );

}


// ===============================
// OUTSIDE CLICK
// ===============================

const profileModal =
    document.getElementById(
        "profile-modal"
    );


if (profileModal) {

    profileModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                profileModal
            ) {

                closeProfile();

            }

        }
    );

}


// ===============================
// ESCAPE KEY
// ===============================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            profileModal &&
            profileModal.classList.contains(
                "active"
            )
        ) {

            closeProfile();

        }

    }
);


// ===============================
// FORMAT TEXT
// ===============================

function formatText(value) {

    return String(value || "")
        .replace(/-/g, " ")
        .replace(
            /\b\w/g,
            char => char.toUpperCase()
        );

}