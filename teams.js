window.scrollTo(0, 0);

let teams = [];
let characters = [];
let movies = [];
let locations = [];
let events = [];
let universes = [];


// ========================================
// LOAD DATABASE
// ========================================

Promise.all([

    fetch("data/teams.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load teams.json");
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

    fetch("data/locations.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load locations.json");
            }

            return response.json();
        }),

    fetch("data/events.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load events.json");
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
    teamData,
    characterData,
    movieData,
    locationData,
    eventData,
    universeData
]) => {

    // ========================================
    // TEAMS DATABASE
    // ========================================

    teams = Array.isArray(teamData)
        ? teamData
        : teamData.teams || [];


    // ========================================
    // CHARACTERS DATABASE
    // ========================================

    characters = Array.isArray(characterData)
        ? characterData
        : characterData.characters || [];


    // ========================================
    // MOVIES DATABASE
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
    // LOCATIONS DATABASE
    // ========================================

    locations = Array.isArray(locationData)
        ? locationData
        : locationData.locations || [];


    // ========================================
    // EVENTS DATABASE
    // ========================================

    events = Array.isArray(eventData)
        ? eventData
        : eventData.events || [];


    // ========================================
    // UNIVERSES DATABASE
    // ========================================

    universes = Array.isArray(universeData)
        ? universeData
        : universeData.universes || [];


    // ========================================
    // DISPLAY TEAMS
    // ========================================

    displayTeams(teams);


    // ========================================
    // OPEN TEAM FROM URL
    //
    // Example:
    // teams.html?id=avengers
    // ========================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const teamId =
        urlParams.get("id");

    if (teamId) {

        const team =
            teams.find(item =>
                String(item.id || "")
                    .toLowerCase()
                    .trim() ===
                teamId
                    .toLowerCase()
                    .trim()
            );

        if (team) {

            openProfile(team);

        }

    }

})

.catch(error => {

    console.error(
        "Team database failed to load:",
        error
    );

    const teamGrid =
        document.getElementById(
            "team-grid"
        );

    if (teamGrid) {

        teamGrid.innerHTML = `
            <p class="error-message">
                Unable to load team database.
            </p>
        `;

    }

});



// ========================================
// DISPLAY TEAMS
// ========================================

function displayTeams(database) {

    const teamGrid =
        document.getElementById(
            "team-grid"
        );

    if (!teamGrid) {

        console.error(
            "Team grid not found."
        );

        return;

    }

    teamGrid.innerHTML = "";


    // ========================================
    // UPDATE COUNT
    // ========================================

    const teamCount =
        document.getElementById(
            "team-count"
        );

    if (teamCount) {

        teamCount.textContent =
            database.length;

    }


    // ========================================
    // DISPLAY TEAM CARDS
    // ========================================

    database.forEach(team => {

        teamGrid.appendChild(
            createTeamCard(team)
        );

    });


    // ========================================
    // NO RESULTS
    // ========================================

    if (database.length === 0) {

        teamGrid.innerHTML = `
            <p class="error-message">
                No teams found.
            </p>
        `;

    }

}



// ========================================
// CREATE TEAM CARD
// ========================================

function createTeamCard(team) {

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

        <div class="movie-poster">

            <img
                src="${team.image || "images/team-default.jpg"}"
                alt="${team.name || "Marvel team"}"
                onerror="this.src='images/team-default.jpg'"
            >

        </div>


        <div class="movie-info">

            <p class="movie-type">
                ${formatText(team.type || "TEAM")}
            </p>


            <h2>
                ${team.name || "Unknown Team"}
            </h2>


            <p class="movie-year">
                ${team.universe || ""}
            </p>


            <button
                class="view-profile"
                type="button"
            >
                VIEW TEAM
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

                openProfile(team);

            }
        );

    }


    // ========================================
    // CLICKING CARD
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

            openProfile(team);

        }
    );


    // ========================================
    // KEYBOARD ACCESSIBILITY
    // ========================================

    card.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openProfile(team);

            }

        }
    );


    return card;

}



// ========================================
// SEARCH
// ========================================

const search =
    document.getElementById(
        "team-search"
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
                teams.filter(team => {

                    const name =
                        String(
                            team.name || ""
                        ).toLowerCase();

                    const type =
                        String(
                            team.type || ""
                        ).toLowerCase();

                    const status =
                        String(
                            team.status || ""
                        ).toLowerCase();

                    const universe =
                        String(
                            team.universe || ""
                        ).toLowerCase();

                    const description =
                        String(
                            team.description || ""
                        ).toLowerCase();

                    const members =
                        Array.isArray(team.members)
                            ? team.members
                                .join(" ")
                                .toLowerCase()
                            : "";


                    return (
                        name.includes(searchText) ||
                        type.includes(searchText) ||
                        status.includes(searchText) ||
                        universe.includes(searchText) ||
                        description.includes(searchText) ||
                        members.includes(searchText)
                    );

                });


            displayTeams(results);

        }
    );

}



// ========================================
// OPEN PROFILE
// ========================================

function openProfile(team) {

    if (!team) {
        return;
    }


    // ========================================
    // BASIC PROFILE ELEMENTS
    // ========================================

    const profileType =
        document.getElementById(
            "profile-type"
        );

    const profileName =
        document.getElementById(
            "profile-name"
        );

    const profileFounded =
        document.getElementById(
            "profile-founded"
        );

    const profileStatus =
        document.getElementById(
            "profile-status"
        );

    const profileUniverse =
        document.getElementById(
            "profile-universe"
        );

    const profileFoundedStat =
        document.getElementById(
            "profile-founded-stat"
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
                team.type || "Team"
            );

    }

    if (profileName) {

        profileName.textContent =
            team.name ||
            "Unknown Team";

    }

    if (profileFounded) {

        profileFounded.textContent =
            team.founded ||
            "";

    }

    if (profileStatus) {

        profileStatus.textContent =
            team.status ||
            "Unknown";

    }

    if (profileUniverse) {

        profileUniverse.textContent =
            team.universe ||
            "Unknown";

    }

    if (profileFoundedStat) {

        profileFoundedStat.textContent =
            team.founded ||
            "Unknown";

    }

    if (profileDescription) {

        profileDescription.textContent =
            team.description ||
            "No description available.";

    }


    // ========================================
    // MEMBERS
    // ========================================

    displayMembers(
        team.members
    );


    // ========================================
    // MOVIES & SHOWS
    // ========================================

    displayTeamMovies(
        team.movies
    );


    // ========================================
    // LOCATIONS
    // ========================================

    displayTeamLocations(
        team
    );


    // ========================================
    // EVENTS
    // ========================================

    displayTeamEvents(
        team
    );


    // ========================================
    // UNIVERSE
    // ========================================

    displayTeamUniverse(
        team
    );


    // ========================================
    // RELATED TEAMS
    // ========================================

    displayRelatedTeams(
        team.relatedTeams
    );


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

    if (team.id) {

        const newURL =
            `teams.html?id=${encodeURIComponent(
                team.id
            )}`;

        window.history.replaceState(
            {},
            "",
            newURL
        );

    }

}



// ========================================
// DISPLAY MEMBERS
// ========================================

function displayMembers(memberValues) {

    const container =
        document.getElementById(
            "profile-members"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    if (
        !Array.isArray(memberValues) ||
        memberValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    memberValues.forEach(memberValue => {

        const target =
            String(memberValue || "")
                .trim()
                .toLowerCase();


        const character =
            characters.find(character => {

                if (!character) {
                    return false;
                }

                const characterID =
                    String(character.id || "")
                        .trim()
                        .toLowerCase();

                const characterName =
                    String(character.name || "")
                        .trim()
                        .toLowerCase();

                const realName =
                    String(character.realName || "")
                        .trim()
                        .toLowerCase();

                return (
                    characterID === target ||
                    characterName === target ||
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

        }

        else {

            const text =
                document.createElement(
                    "span"
                );

            text.textContent =
                formatText(
                    memberValue
                );

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

}



// ========================================
// DISPLAY TEAM MOVIES
// ========================================

function displayTeamMovies(movieValues) {

    const container =
        document.getElementById(
            "profile-movies"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    if (
        !Array.isArray(movieValues) ||
        movieValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    movieValues.forEach(movieValue => {

        const target =
            String(movieValue || "")
                .trim()
                .toLowerCase();


        const movie =
            movies.find(item => {

                if (!item) {
                    return false;
                }

                const movieID =
                    String(item.id || "")
                        .trim()
                        .toLowerCase();

                const movieTitle =
                    String(item.title || "")
                        .trim()
                        .toLowerCase();

                return (
                    movieID === target ||
                    movieTitle === target
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

        }

        else {

            const text =
                document.createElement(
                    "span"
                );

            text.textContent =
                movieValue;

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

}



// ========================================
// GENERIC TEAM CONNECTION HELPERS
// ========================================

function normalizeValue(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

}


function getTeamValues(team) {

    if (!team) {
        return [];
    }

    return [
        team.id,
        team.name
    ]
        .filter(Boolean)
        .map(normalizeValue);

}


function valueContainsTeam(value, team) {

    if (!value) {
        return false;
    }


    const teamValues =
        getTeamValues(team);


    if (Array.isArray(value)) {

        return value.some(item =>
            valueContainsTeam(
                item,
                team
            )
        );

    }


    const normalized =
        normalizeValue(value);


    return teamValues.some(
        teamValue =>
            normalized === teamValue
    );

}


function objectContainsTeam(
    object,
    team,
    fields
) {

    if (!object || !team) {
        return false;
    }


    return fields.some(field => {

        const value =
            object[field];

        return valueContainsTeam(
            value,
            team
        );

    });

}



// ========================================
// CREATE CONNECTION SECTION
// ========================================

function createConnectionSection(
    id,
    title,
    items,
    onClick,
    emptyText = "None listed."
) {

    const section =
        document.createElement(
            "section"
        );

    section.className =
        "profile-section";

    section.id =
        id;


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


    section.appendChild(
        heading
    );

    section.appendChild(
        connections
    );


    if (
        !items ||
        items.length === 0
    ) {

        const empty =
            document.createElement(
                "p"
            );

        empty.textContent =
            emptyText;

        connections.appendChild(
            empty
        );

    }

    else {

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
                "Unknown";


            button.addEventListener(
                "click",
                function() {

                    onClick(item);

                }
            );


            connections.appendChild(
                button
            );

        });

    }


    return section;

}



// ========================================
// DISPLAY TEAM LOCATIONS
// ========================================

function displayTeamLocations(team) {

    const existing =
        document.getElementById(
            "team-locations-section"
        );

    if (existing) {
        existing.remove();
    }


    const matches =
        locations.filter(location =>
            objectContainsTeam(
                location,
                team,
                [
                    "teams",
                    "team",
                    "featuredTeams",
                    "relatedTeams",
                    "organizations",
                    "affiliations"
                ]
            )
        );


    const section =
        createConnectionSection(
            "team-locations-section",
            "LOCATIONS",
            matches,
            function(location) {

                window.location.href =
                    `locations.html?id=${encodeURIComponent(
                        location.id
                    )}`;

            }
        );


    insertConnectionSection(
        section
    );

}



// ========================================
// DISPLAY TEAM EVENTS
// ========================================

function displayTeamEvents(team) {

    const existing =
        document.getElementById(
            "team-events-section"
        );

    if (existing) {
        existing.remove();
    }


    const matches =
        events.filter(event =>
            objectContainsTeam(
                event,
                team,
                [
                    "teams",
                    "team",
                    "featuredTeams",
                    "relatedTeams",
                    "participants",
                    "involvedTeams",
                    "organizations"
                ]
            )
        );


    const section =
        createConnectionSection(
            "team-events-section",
            "EVENTS",
            matches,
            function(event) {

                window.location.href =
                    `events.html?id=${encodeURIComponent(
                        event.id
                    )}`;

            }
        );


    insertConnectionSection(
        section
    );

}



// ========================================
// DISPLAY TEAM UNIVERSE
// ========================================

function displayTeamUniverse(team) {

    const existing =
        document.getElementById(
            "team-universe-section"
        );

    if (existing) {
        existing.remove();
    }


    const teamUniverse =
        normalizeValue(
            team.universe
        );


    if (!teamUniverse) {
        return;
    }


    const universe =
        universes.find(item => {

            if (!item) {
                return false;
            }


            const values = [
                item.id,
                item.name,
                item.title,
                item.designation,
                item.realName,
                item.universe
            ]
                .filter(Boolean)
                .map(normalizeValue);


            return values.includes(
                teamUniverse
            );

        });


    if (!universe) {
        return;
    }


    const section =
        createConnectionSection(
            "team-universe-section",
            "UNIVERSE",
            [universe],
            function() {

                window.location.href =
                    `universes.html?id=${encodeURIComponent(
                        universe.id
                    )}`;

            }
        );


    insertConnectionSection(
        section
    );

}



// ========================================
// INSERT CONNECTION SECTION
// ========================================

function insertConnectionSection(
    section
) {

    const profileBox =
        document.querySelector(
            "#profile-modal .profile-box"
        );


    if (!profileBox) {
        return;
    }


    const related =
        document.getElementById(
            "profile-related"
        );


    if (
        related &&
        related.parentElement
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



// ========================================
// DISPLAY RELATED TEAMS
// ========================================

function displayRelatedTeams(
    relatedTeamValues
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
        !Array.isArray(
            relatedTeamValues
        ) ||
        relatedTeamValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }


    relatedTeamValues.forEach(
        relatedTeamValue => {

            const target =
                String(
                    relatedTeamValue || ""
                )
                    .trim()
                    .toLowerCase();


            const relatedTeam =
                teams.find(team => {

                    if (!team) {
                        return false;
                    }


                    const teamID =
                        String(
                            team.id || ""
                        )
                            .trim()
                            .toLowerCase();


                    const teamName =
                        String(
                            team.name || ""
                        )
                            .trim()
                            .toLowerCase();


                    return (
                        teamID === target ||
                        teamName === target
                    );

                });


            if (relatedTeam) {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "profile-button";

                button.textContent =
                    relatedTeam.name;


                button.addEventListener(
                    "click",
                    function() {

                        openProfile(
                            relatedTeam
                        );

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
                    formatText(
                        relatedTeamValue
                    );

                text.style.opacity =
                    "0.55";


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
        "teams.html"
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