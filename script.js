let characters = [];
let movies = [];

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
    fetch("data/movies.json").then(res => res.json())
])
.then(([characterData, movieData]) => {

    characters = characterData;
    movies = movieData;

    displayCharacters(characters);

    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get("id");

    if (characterId) {
        const character = characters.find(
            character => character.id === characterId
        );

        if (character) {
            openProfile(character);
        }
    }

})
.catch(error => {
    console.error("Error loading database:", error);
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
                <img src="${character.image || ""}" alt="${character.name || "Marvel character"}">
            </div>

            <div class="character-info">
                <p class="character-type">${formatText(character.type || "")}</p>

                <h2>${character.name || "Unknown Character"}</h2>

                <p class="character-description">
                    ${character.description || ""}
                </p>

                <button type="button" class="profile-button">
                    VIEW PROFILE
                </button>
            </div>
        `;

        const button = card.querySelector(".profile-button");

        if (button) {
            button.addEventListener("click", event => {
                event.stopPropagation();
                openProfile(character);
            });
        }

        card.addEventListener("click", () => {
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
            document.getElementById("profile-modal");

        const profileBox =
            document.querySelector("#profile-modal .profile-box");

        if (profileBox) {
            profileBox.scrollTop = 0;
        }
    function capitalizeWords(text) {

        if (!text) return "";

        return text
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

    }


    document.getElementById(
        "profile-name"
    ).textContent =
        character.name;


    document.getElementById(
        "profile-real-name"
    ).textContent =
        character.realName;


    document.getElementById(
        "profile-type"
    ).textContent =
        character.type.toUpperCase();


    document.getElementById(
        "profile-status"
    ).textContent =
        capitalizeWords(character.status);


    document.getElementById(
        "profile-species"
    ).textContent =
        capitalizeWords(character.species);


    document.getElementById(
        "profile-alignment"
    ).textContent =
        capitalizeWords(character.alignment);


    document.getElementById(
        "profile-description"
    ).textContent =
        character.description;


    document.getElementById(
        "profile-abilities"
    ).textContent =
        character.abilities;


    document.getElementById(
        "profile-affiliations"
    ).textContent =
        Array.isArray(character.affiliations)
            ? character.affiliations.join(", ")
            : character.affiliations || "";


    document.getElementById(
        "profile-first-appearance"
    ).textContent =
        character.firstAppearance;



    // ========================================
    // MOVIES & SHOWS
    // ========================================

    displayCharacterMovies(character);



    // ========================================
    // RELATED CHARACTERS
    // ========================================

    displayRelatedCharacters(character);



    // ========================================
    // SHOW PROFILE
    // ========================================

    document.getElementById(
        "profile-modal"
    ).classList.add("active");

}



// ========================================
// FIND MOVIES FOR CHARACTER
// ========================================

function getCharacterMovies(character) {

    const aliases = characterAliases[character.id] || [];


    const possibleNames = [

        character.realName,

        ...aliases

    ]
        .filter(Boolean)
        .map(name =>
            name.toLowerCase().trim()
        );


    return movies.filter(movie => {

        if (!Array.isArray(movie.mainCharacters)) {
            return false;
        }


        return movie.mainCharacters.some(movieCharacter => {

            const movieName =
                movieCharacter.toLowerCase().trim();


            return possibleNames.includes(movieName);

        });

    });

}



// ========================================
// DISPLAY MOVIES & SHOWS
// ========================================

function displayCharacterMovies(character) {

    const container =
        document.getElementById("profile-movies");


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
                    src="${movie.image}"
                    alt="${movie.title}"
                >

            </div>


            <div class="movie-info">

                <p class="movie-type">
                    ${movie.type || "MOVIE"}
                </p>

                <h2>
                    ${movie.title}
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
// DISPLAY RELATED CHARACTERS
// ========================================

function displayRelatedCharacters(character) {

    const container =
        document.getElementById("related-characters");


    if (!container) return;


    container.innerHTML = "";


    if (!Array.isArray(character.relatedCharacters) ||
        character.relatedCharacters.length === 0) {

        container.innerHTML = `
            <p>No related characters currently linked.</p>
        `;

        return;

    }


    character.relatedCharacters.forEach(relatedID => {

        const relatedCharacter =
            characters.find(
                item => item.id === relatedID
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
                    src="${relatedCharacter.image}"
                    alt="${relatedCharacter.name}"
                >

            </div>


            <div class="character-info">

                <p class="character-type">
                    ${relatedCharacter.type.toUpperCase()}
                </p>


                <h2>
                    ${relatedCharacter.name}
                </h2>


                <p>
                    ${relatedCharacter.description}
                </p>


                <button
                    type="button"
                    class="profile-button">

                    VIEW PROFILE

                </button>

            </div>

        `;


        const button =
            card.querySelector(".profile-button");


        button.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                window.scrollTo(0, 0);

                openProfile(relatedCharacter);

            }
        );


        card.addEventListener(
            "click",
            function() {

                window.scrollTo(0, 0);
                openProfile(relatedCharacter);

            }
        );


        container.appendChild(card);

    });

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
                    character.type.toLowerCase() === currentFilter
            );

    }


    // SEARCH

    if (searchText) {

        results =
            results.filter(character =>

                character.name
                    .toLowerCase()
                    .includes(searchText)

            );

    }


    displayCharacters(results);

}



// ========================================
// FILTERS
// ========================================

function filterCharacters(type) {

    currentFilter = type;

    displayFilteredCharacters();

}



// ========================================
// CLOSE PROFILE
// ========================================

function closeProfile() {

    const modal =
        document.getElementById("profile-modal");


    modal.classList.remove("active");

}



// ========================================
// CLOSE PROFILE WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("profile-modal");


        if (
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
    document.querySelector(".mouse-glow");


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
        .replace(/\b\w/g, char => char.toUpperCase());
}
// ========================================
// ALWAYS START PAGE AT TOP
// ========================================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
});