let characters = [];
let movies = [];
let teams = [];
let locations = [];
let events = [];
let universes = [];

let currentFilter = "all";


// ========================================
// CHARACTER ALIASES
// Used to connect movies.json mainCharacters
// to characters.json character IDs
// ========================================

const characterAliases = {

    spiderman: [
        "Peter Parker"
    ],

    ironman: [
        "Tony Stark"
    ],

    captainamerica: [
        "Steve Rogers"
    ],

    thor: [
        "Thor",
        "Thor Odinson"
    ],

    hulk: [
        "Bruce Banner"
    ],

    wolverine: [
        "Wolverine",
        "Logan",
        "James Howlett"
    ],

    doctorstrange: [
        "Stephen Strange",
        "Doctor Strange"
    ],

    blackwidow: [
        "Natasha Romanoff"
    ],

    antman: [
        "Scott Lang",
        "Hank Pym"
    ],

    hawkeye: [
        "Clint Barton"
    ],

    blackpanther: [
        "T'Challa"
    ],

    daredevil: [
        "Matt Murdock",
        "Daredevil"
    ],

    punisher: [
        "Frank Castle"
    ],

    ghostrider: [
        "Johnny Blaze"
    ],

    deadpool: [
        "Wade Wilson",
        "Deadpool"
    ],

    captainmarvel: [
        "Carol Danvers"
    ],

    scarletwitch: [
        "Wanda Maximoff"
    ],

    professorx: [
        "Charles Xavier",
        "Professor X"
    ],

    magneto: [
        "Erik Lehnsherr",
        "Max Eisenhardt",
        "Magneto"
    ],

    thanos: [
        "Thanos"
    ],

    loki: [
        "Loki",
        "Loki Laufeyson"
    ],

    mrfantastic: [
        "Reed Richards",
        "Mr. Fantastic"
    ],

    humantorch: [
        "Johnny Storm",
        "Human Torch"
    ],

    silversurfer: [
        "Norrin Radd",
        "Silver Surfer"
    ],

    doctordoom: [
        "Victor von Doom",
        "Doctor Doom"
    ],

    venom: [
        "Eddie Brock",
        "Venom"
    ],

    "green-goblin": [
        "Norman Osborn",
        "Green Goblin"
    ],

    jeangrey: [
        "Jean Grey"
    ],

    storm: [
        "Ororo Munroe",
        "Storm"
    ],

    cyclops: [
        "Scott Summers",
        "Cyclops"
    ],

    groot: [
        "Groot"
    ],

    rocket: [
        "Rocket",
        "Rocket Raccoon"
    ],

    starlord: [
        "Peter Quill",
        "Star-Lord"
    ],

    gambit: [
        "Remy LeBeau",
        "Gambit"
    ],

    mysterio: [
        "Quentin Beck",
        "Mysterio"
    ],

    kingpin: [
        "Wilson Fisk",
        "Kingpin"
    ],

    mystique: [
        "Raven Darkholme",
        "Mystique"
    ],

    ultron: [
        "Ultron"
    ],

    thing: [
        "Ben Grimm",
        "Thing"
    ],

    invisiblewoman: [
        "Susan Storm Richards",
        "Sue Storm",
        "Invisible Woman"
    ],

    drax: [
        "Drax",
        "Arthur Douglas"
    ],

    moonknight: [
        "Marc Spector",
        "Moon Knight"
    ],

    namor: [
        "Namor McKenzie",
        "Namor"
    ],

    blade: [
        "Eric Brooks",
        "Blade"
    ],

    shangchi: [
        "Shang-Chi"
    ],

    lukecage: [
        "Luke Cage",
        "Carl Lucas"
    ],

    ironfist: [
        "Danny Rand",
        "Daniel Rand",
        "Iron Fist"
    ],

    msmarvel: [
        "Kamala Khan",
        "Ms. Marvel"
    ],

    nova: [
        "Richard Rider",
        "Nova"
    ],

    galactus: [
        "Galan",
        "Galactus"
    ],

    vision: [
        "Vision"
    ],

    "war-machine": [
        "James Rhodes",
        "War Machine"
    ],

    falcon: [
        "Sam Wilson",
        "Falcon"
    ],

    "winter-soldier": [
        "Bucky Barnes",
        "James Buchanan Barnes",
        "Winter Soldier"
    ],

    wasp: [
        "Janet van Dyne",
        "Hope van Dyne",
        "Wasp"
    ],

    quicksilver: [
        "Pietro Maximoff",
        "Quicksilver"
    ],

    valkyrie: [
        "Brunnhilde",
        "Valkyrie"
    ],

    beast: [
        "Hank McCoy",
        "Beast"
    ],

    nightcrawler: [
        "Kurt Wagner",
        "Nightcrawler"
    ],

    rogue: [
        "Anna Marie",
        "Rogue"
    ],

    iceman: [
        "Robert Drake",
        "Iceman"
    ],

    colossus: [
        "Piotr Rasputin",
        "Colossus"
    ],

    jubilee: [
        "Jubilation Lee",
        "Jubilee"
    ],

    sabretooth: [
        "Victor Creed",
        "Sabretooth"
    ],

    "miles-morales": [
        "Miles Morales"
    ],

    "spider-gwen": [
        "Gwen Stacy",
        "Spider-Gwen"
    ],

    "doctor-octopus": [
        "Otto Octavius",
        "Doctor Octopus"
    ],

    sandman: [
        "William Baker",
        "Sandman"
    ],

    vulture: [
        "Adrian Toomes",
        "Vulture"
    ],

    kraven: [
        "Sergei Kravinoff",
        "Kraven",
        "Kraven the Hunter"
    ],

    "adam-warlock": [
        "Adam Warlock"
    ],

    ronan: [
        "Ronan",
        "Ronan the Accuser"
    ],

    kang: [
        "Nathaniel Richards",
        "Kang the Conqueror"
    ],

    "agatha-harkness": [
        "Agatha Harkness"
    ],

    dormammu: [
        "Dormammu"
    ],

    sentry: [
        "Robert Reynolds",
        "Bob Reynolds",
        "Sentry"
    ],

    "red-guardian": [
        "Alexei Shostakov",
        "Red Guardian"
    ],

    cable: [
        "Nathan Summers",
        "Cable"
    ],

    bishop: [
        "Lucas Bishop",
        "Bishop"
    ],

    havok: [
        "Alex Summers",
        "Havok"
    ],

    "spiderman-2099": [
        "Miguel O'Hara",
        "Spider-Man 2099"
    ],

    "spiderman-noir": [
        "Spider-Man Noir"
    ],

    prowler: [
        "Aaron Davis",
        "Prowler"
    ],

    electro: [
        "Max Dillon",
        "Electro"
    ],

    lizard: [
        "Curt Connors",
        "Lizard"
    ],

    knull: [
        "Knull"
    ],

    "red-skull": [
        "Johann Schmidt",
        "Red Skull"
    ],

    hela: [
        "Hela"
    ],

    killmonger: [
        "Erik Killmonger",
        "Killmonger"
    ],

    taskmaster: [
        "Tony Masters",
        "Taskmaster"
    ],

    "baron-zemo": [
        "Helmut Zemo",
        "Baron Zemo"
    ],

    mephisto: [
        "Mephisto"
    ],

    bullseye: [
        "Benjamin Poindexter",
        "Bullseye"
    ],

    crossbones: [
        "Brock Rumlow",
        "Crossbones"
    ],

    jigsaw: [
        "Billy Russo",
        "Jigsaw"
    ],

    "mister-negative": [
        "Martin Li",
        "Mister Negative"
    ],

    mobius: [
        "Mobius M. Mobius"
    ],

    tombstone: [
        "Lonnie Lincoln",
        "Tombstone"
    ],

    heimdall: [
        "Heimdall"
    ],

    "yelena-belova": [
        "Yelena Belova"
    ]

};


// ========================================
// LOAD DATABASES
// ========================================

Promise.all([
    fetch("data/characters.json").then(res => res.json()),
    fetch("data/movies.json").then(res => res.json()),
    fetch("data/teams.json").then(res => res.json()),
    fetch("data/locations.json").then(res => res.json()),
    fetch("data/events.json").then(res => res.json()),
    fetch("data/universes.json").then(res => res.json())
])
.then(([
    characterData,
    movieData,
    teamData,
    locationData,
    eventData,
    universeData
]) => {

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

    universes = Array.isArray(universeData)
        ? universeData
        : universeData.universes || [];


    displayCharacters(characters);


    const urlParams =
        new URLSearchParams(window.location.search);

    const characterId =
        urlParams.get("id");


    if (characterId) {

        const character =
            characters.find(
                character =>
                    character.id === characterId
            );

        if (character) {
            openProfile(character);
        }

    }

})
.catch(error => {

    console.error(
        "Error loading database:",
        error
    );

});


// ========================================
// DISPLAY CHARACTERS
// ========================================

function displayCharacters(characterslist) {

    const grid = document.getElementById("character-grid");

    if (!grid) return;

    grid.innerHTML = "";

    characterslist.forEach(character => {

        const card = document.createElement("div");
        card.className = "character-card";

        card.innerHTML = `
            <div class="character-image">
                <img
                    src="${character.image || ""}"
                    alt="${character.name || "Marvel character"}"
                >
            </div>

            <div class="character-info">

                <p class="character-type">
                    ${formatText(character.type || "")}
                </p>

                <h2>
                    ${character.name || "Unknown Character"}
                </h2>

                <p class="character-description">
                    ${character.description || ""}
                </p>

                <button
                    type="button"
                    class="profile-button"
                    aria-label="View ${character.name || "character"} profile">
                    VIEW PROFILE
                </button>

            </div>
        `;

        const button = card.querySelector(".profile-button");

        if (button) {

            button.addEventListener("click", function(event) {

                event.preventDefault();
                event.stopPropagation();

                openProfile(character);

            });

        }

        card.addEventListener("click", function(event) {

            if (event.target.closest(".profile-button")) {
                return;
            }

            openProfile(character);

        });

        grid.appendChild(card);

    });

}


// ========================================
// OPEN CHARACTER PROFILE
// ========================================

function openProfile(character) {

    const modal =
        document.getElementById(
            "profile-modal"
        );


    const profileBox =
        document.querySelector(
            "#profile-modal .profile-box"
        );


    if (profileBox) {
        profileBox.scrollTop = 0;
    }


    function capitalizeWords(text) {

        if (!text) return "";

        return String(text)
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join(" ");

    }


    document.getElementById(
        "profile-name"
    ).textContent =
        character.name || "";


    document.getElementById(
        "profile-real-name"
    ).textContent =
        character.realName || "";


    document.getElementById(
        "profile-type"
    ).textContent =
        String(
            character.type || ""
        ).toUpperCase();


    document.getElementById(
        "profile-status"
    ).textContent =
        capitalizeWords(
            character.status
        );


    document.getElementById(
        "profile-species"
    ).textContent =
        capitalizeWords(
            character.species
        );


    document.getElementById(
        "profile-alignment"
    ).textContent =
        capitalizeWords(
            character.alignment
        );


    document.getElementById(
        "profile-description"
    ).textContent =
        character.description || "";


    document.getElementById(
        "profile-abilities"
    ).textContent =
        character.abilities || "";


    document.getElementById(
        "profile-affiliations"
    ).textContent =
        Array.isArray(character.affiliations)
            ? character.affiliations.join(", ")
            : character.affiliations || "";


    document.getElementById(
        "profile-first-appearance"
    ).textContent =
        character.firstAppearance || "";


    // ========================================
    // EXISTING CONNECTIONS
    // ========================================

    displayCharacterMovies(character);

    displayRelatedCharacters(character);


    // ========================================
    // NEW DATABASE CONNECTIONS
    // ========================================

    displayCharacterTeams(character);

    displayCharacterLocations(character);

    displayCharacterEvents(character);

    displayCharacterUniverse(character);

    

    // ========================================
    // UPDATE URL
    // ========================================

    const newUrl =
        `characters.html?id=${encodeURIComponent(character.id)}`;

    history.replaceState(
        null,
        "",
        newUrl
    );


    // ========================================
    // SHOW PROFILE
    // ========================================

    if (modal) {
        modal.classList.add("active");
    }

}


// ========================================
// FIND MOVIES FOR CHARACTER
// ========================================

function getCharacterMovies(character) {

    const aliases =
        characterAliases[
            character.id
        ] || [];


    const possibleNames = [

        character.realName,

        character.name,

        ...aliases

    ]
        .filter(Boolean)
        .map(name =>
            String(name)
                .toLowerCase()
                .trim()
        );


    return movies.filter(movie => {

        if (
            !Array.isArray(
                movie.mainCharacters
            )
        ) {
            return false;
        }


        return movie.mainCharacters.some(
            movieCharacter => {

                const movieName =
                    String(movieCharacter)
                        .toLowerCase()
                        .trim();


                return possibleNames.includes(
                    movieName
                );

            }
        );

    });

}


// ========================================
// DISPLAY MOVIES & SHOWS
// ========================================

function displayCharacterMovies(character) {

    const container =
        document.getElementById(
            "profile-movies"
        );


    if (!container) return;


    container.innerHTML = "";


    const characterMovies =
        getCharacterMovies(character);


    if (characterMovies.length === 0) {

        container.innerHTML = `
            <p>No movies or shows currently linked.</p>
        `;

        return;

    }


    characterMovies.forEach(movie => {

        const card =
            document.createElement("div");


        card.className =
            "movie-card";


        card.innerHTML = `

            <div class="movie-image">

                <img
                    src="${movie.image || ""}"
                    alt="${movie.title || "Marvel movie"}"
                >

            </div>


            <div class="movie-info">

                <p class="movie-type">
                    ${movie.type || "MOVIE"}
                </p>

                <h2>
                    ${movie.title || "Unknown"}
                </h2>

                <p>
                    ${movie.year || ""}
                </p>

            </div>

        `;


        card.addEventListener(
            "click",
            function() {

                window.location.href =
                    `movies.html?id=${encodeURIComponent(movie.id)}`;

            }
        );


        container.appendChild(card);

    });

}


// ========================================
// GENERIC CONNECTION HELPERS
// ========================================

function normalizeValue(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

}


function getCharacterNames(character) {

    return [

        character.id,

        character.name,

        character.realName,

        ...(characterAliases[
            character.id
        ] || [])

    ]
        .filter(Boolean)
        .map(normalizeValue);

}


function valueContainsCharacter(value, characterNames) {

    if (!value) return false;


    if (Array.isArray(value)) {

        return value.some(item =>
            valueContainsCharacter(
                item,
                characterNames
            )
        );

    }


    if (typeof value === "object") {

        return Object.values(value).some(item =>
            valueContainsCharacter(
                item,
                characterNames
            )
        );

    }


    const normalized =
        normalizeValue(value);


    return characterNames.some(name =>
        normalized === name ||
        normalized.includes(name) ||
        name.includes(normalized)
    );

}


function objectContainsCharacter(
    item,
    character,
    possibleFields
) {

    const characterNames =
        getCharacterNames(character);


    for (const field of possibleFields) {

        if (
            Object.prototype.hasOwnProperty.call(
                item,
                field
            )
        ) {

            if (
                valueContainsCharacter(
                    item[field],
                    characterNames
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

function createConnectionSection(
    id,
    title,
    items,
    linkBuilder
) {

    const profileBox =
        document.querySelector(
            "#profile-modal .profile-box"
        );

    if (!profileBox) return;


    let section =
        document.getElementById(id);


    // Create the section if it does not already exist
    if (!section) {

        section =
            document.createElement("div");

        section.id = id;
        section.className = "profile-section";


        const related =
            document.getElementById(
                "related-characters"
            );


        if (related && related.parentElement) {

            // Insert before the section containing
            // Related Characters.
            related.parentElement.parentNode.insertBefore(
                section,
                related.parentElement
            );

        } else {

            // Fallback: put the section at the
            // end of the profile box.
            profileBox.appendChild(section);

        }

    }


    // Clear old contents every time the profile changes
    section.innerHTML = "";


    const heading =
        document.createElement("h3");

    heading.textContent =
        title;

    section.appendChild(heading);


    // No connected items
    if (!items || items.length === 0) {

        const empty =
            document.createElement("p");

        empty.textContent =
            `No ${title.toLowerCase()} currently linked.`;

        section.appendChild(empty);

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


        wrapper.appendChild(button);

    });


    section.appendChild(wrapper);

}


// ========================================
// CHARACTER → TEAMS
// ========================================

function getCharacterTeams(character) {

    return teams.filter(team => {

        const members =
            team.members ||
            team.characters ||
            team.roster ||
            [];


        return valueContainsCharacter(
            members,
            getCharacterNames(character)
        );

    });

}


function displayCharacterTeams(character) {

    const linkedTeams =
        getCharacterTeams(character);


    createConnectionSection(
        "character-teams-section",
        "TEAMS",
        linkedTeams,
        team => {

            window.location.href =
                `teams.html?id=${encodeURIComponent(team.id)}`;

        }
    );

}


// ========================================
// CHARACTER → LOCATIONS
// ========================================

function getCharacterLocations(character) {

    return locations.filter(location => {

        return objectContainsCharacter(
            location,
            character,
            [
                "characters",
                "character",
                "featuredCharacters",
                "heroes",
                "residents",
                "inhabitants",
                "relatedCharacters"
            ]
        );

    });

}


function displayCharacterLocations(character) {

    const linkedLocations =
        getCharacterLocations(character);


    createConnectionSection(
        "character-locations-section",
        "LOCATIONS",
        linkedLocations,
        location => {

            window.location.href =
                `locations.html?id=${encodeURIComponent(location.id)}`;

        }
    );

}


// ========================================
// CHARACTER → EVENTS
// ========================================

function getCharacterEvents(character) {

    return events.filter(event => {

        return objectContainsCharacter(
            event,
            character,
            [
                "characters",
                "character",
                "participants",
                "heroes",
                "villains",
                "relatedCharacters"
            ]
        );

    });

}


function displayCharacterEvents(character) {

    const linkedEvents =
        getCharacterEvents(character);


    createConnectionSection(
        "character-events-section",
        "EVENTS",
        linkedEvents,
        event => {

            window.location.href =
                `events.html?id=${encodeURIComponent(event.id)}`;

        }
    );

}


// ========================================
// CHARACTER → UNIVERSE
// ========================================

function getCharacterUniverse(character) {

    const possibleUniverse =
        character.universe ||
        character.universeId ||
        character.reality ||
        character.designation;


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


function displayCharacterUniverse(character) {

    const universe =
        getCharacterUniverse(character);


    createConnectionSection(
        "character-universe-section",
        "UNIVERSE",
        universe ? [universe] : [],
        selectedUniverse => {

            window.location.href =
                `universes.html?id=${encodeURIComponent(selectedUniverse.id)}`;

        }
    );

}


// ========================================
// DISPLAY RELATED CHARACTERS
// ========================================

function displayRelatedCharacters(character) {

    const container =
        document.getElementById(
            "related-characters"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !Array.isArray(
            character.relatedCharacters
        ) ||
        character.relatedCharacters.length === 0
    ) {

        container.innerHTML = `
            <p>No related characters currently linked.</p>
        `;

        return;

    }


    character.relatedCharacters.forEach(
        relatedID => {

            const relatedCharacter =
                characters.find(
                    item =>
                        item.id === relatedID
                );


            if (!relatedCharacter) {
                return;
            }


            const card =
                document.createElement("div");


            card.className =
                "character-card";


            card.innerHTML = `

                <div class="character-image">

                    <img
                        src="${relatedCharacter.image || ""}"
                        alt="${relatedCharacter.name || "Marvel character"}"
                    >

                </div>


                <div class="character-info">

                    <p class="character-type">
                        ${String(
                            relatedCharacter.type || ""
                        ).toUpperCase()}
                    </p>


                    <h2>
                        ${relatedCharacter.name || ""}
                    </h2>


                    <p>
                        ${relatedCharacter.description || ""}
                    </p>


                    <button
                        type="button"
                        class="profile-button">

                        VIEW PROFILE

                    </button>

                </div>

            `;


            const button =
                card.querySelector(
                    ".profile-button"
                );


            if (button) {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();

                        openProfile(
                            relatedCharacter
                        );

                    }
                );

            }


            card.addEventListener(
                "click",
                function() {

                    openProfile(
                        relatedCharacter
                    );

                }
            );


            container.appendChild(card);

        }
    );

}


// ========================================
// SEARCH
// ========================================

const search =
    document.getElementById(
        "character-search"
    );


if (search) {

    search.addEventListener(
        "input",
        function() {

            displayFilteredCharacters();

        }
    );

}


// ========================================
// FILTER + SEARCH COMBINED
// ========================================

function displayFilteredCharacters() {

    const searchText =
        search
            ? search.value.toLowerCase().trim()
            : "";


    let results =
        characters;


    // FILTER

    if (currentFilter !== "all") {

        results =
            results.filter(
                character =>
                    String(
                        character.type || ""
                    ).toLowerCase() ===
                    currentFilter
            );

    }


    // SEARCH

    if (searchText) {

        results =
            results.filter(
                character => {

                    const name =
                        String(
                            character.name || ""
                        ).toLowerCase();


                    const realName =
                        String(
                            character.realName || ""
                        ).toLowerCase();


                    return (
                        name.includes(searchText) ||
                        realName.includes(searchText)
                    );

                }
            );

    }


    displayCharacters(results);

}


// ========================================
// FILTERS
// ========================================

function filterCharacters(type) {

    currentFilter =
        type;

    displayFilteredCharacters();

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
        modal.classList.remove("active");
    }

}


// ========================================
// CLOSE PROFILE WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "profile-modal"
            );


        if (
            modal &&
            event.target === modal &&
            modal.classList.contains("active")
        ) {

            closeProfile();

        }

    }
);


// ========================================
// ESC KEY CLOSES PROFILE
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeProfile();

        }

    }
);


// ========================================
// MOUSE GLOW
// ========================================

const mouseGlow =
    document.querySelector(
        ".mouse-glow"
    );


if (mouseGlow) {

    document.addEventListener(
        "mousemove",
        function(event) {

            mouseGlow.style.left =
                event.clientX + "px";

            mouseGlow.style.top =
                event.clientY + "px";

            mouseGlow.style.opacity =
                "1";

        }
    );

}


// ========================================
// FORMAT TEXT
// ========================================

function formatText(value) {

    return String(value || "")
        .replace(/-/g, " ")
        .replace(
            /\b\w/g,
            char =>
                char.toUpperCase()
        );

}


// ========================================
// ALWAYS START PAGE AT TOP
// ========================================

if ("scrollRestoration" in history) {

    history.scrollRestoration =
        "manual";

}


window.addEventListener(
    "pageshow",
    function() {

        window.scrollTo(
            0,
            0
        );

    }
);