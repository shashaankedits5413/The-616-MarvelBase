window.scrollTo(0, 0);
let movies = [];
let characters = [];


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

        })

])

.then(([movieData, characterData]) => {

    /*
        Supports the normal format:

        [
            movie,
            movie,
            show,
            show
        ]

        It also safely supports:

        {
            "movies": [],
            "shows": []
        }
    */

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


    characters = Array.isArray(characterData)
        ? characterData
        : characterData.characters || [];


    displayDatabase(movies);


    // ========================================
    // OPEN MOVIE FROM URL
    // Example:
    // movies.html?id=iron-man-2008
    // ========================================

   const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
    const movie = movies.find(item => item.id === movieId);

    if (movie) {
        openProfile(movie);
    }
}


})

.catch(error => {

    console.error(error);


    const movieGrid =
        document.getElementById("movie-grid");

    const showGrid =
        document.getElementById("show-grid");


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
        document.getElementById("movie-grid");

    const showGrid =
        document.getElementById("show-grid");


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
        database.filter(item => !isShow(item));


    const showList =
        database.filter(item => isShow(item));



    // ========================================
    // UPDATE COUNTS
    // ========================================

    const movieCount =
        document.getElementById("movie-count");

    const showCount =
        document.getElementById("show-count");


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
        card.querySelector(".view-profile");


    if (button) {

        button.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                openProfile(item);

            }
        );

    }



    // ========================================
    // CLICKING CARD ALSO OPENS PROFILE
    // ========================================

    card.addEventListener(
        "click",
        function() {

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
                        Array.isArray(item.mainCharacters)
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
            formatText(item.type || "");

    }


    if (profileName) {

        profileName.textContent =
            item.title || "Untitled";

    }


    if (profileYear) {

        profileYear.textContent =
            item.year || "";

    }


    if (profileYearStat) {

        profileYearStat.textContent =
            item.year || "";

    }


    if (profileDirector) {

        profileDirector.textContent =
            item.director || "Unknown";

    }


    if (profilePhase) {

        profilePhase.textContent =
            item.phase || "Unknown";

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
// DISPLAY MAIN CHARACTERS
// ========================================

function displayMainCharacters(characterNames) {

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
            findCharacterByMovieName(name);


        // ========================================
        // CHARACTER FOUND
        // ========================================

        if (character) {

            const button =
                document.createElement("button");


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
                        `characters.html?id=${encodeURIComponent(character.id)}`;

                }
            );


            container.appendChild(button);

        }


        // ========================================
        // CHARACTER NOT FOUND
        // ========================================

        else {

            const text =
                document.createElement("span");


            text.textContent =
                name;


            container.appendChild(text);

        }


        // ========================================
        // SPACE BETWEEN ITEMS
        // ========================================

        const spacer =
            document.createTextNode(" ");


        container.appendChild(spacer);

    });

}



// ========================================
// FIND CHARACTER FROM MOVIE NAME
// ========================================

function findCharacterByMovieName(name) {

    if (!name) {

        return null;

    }


    const normalized =
        name
            .toLowerCase()
            .trim();


    return characters.find(character => {

        if (!character) {

            return false;

        }


        const names = [

            character.name,

            character.realName

        ]
            .filter(Boolean)
            .map(value =>
                value
                    .toLowerCase()
                    .trim()
            );


        return names.includes(normalized);

    }) || null;

}



// ========================================
// DISPLAY RELATED MOVIES
// ========================================

function displayRelatedMovies(relatedMovies) {

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


    relatedMovies.forEach(relatedMovieValue => {

        const target =
            String(relatedMovieValue || "")
                .trim()
                .toLowerCase();


        const relatedMovie =
            movies.find(movie => {

                const movieID =
                    String(movie.id || "")
                        .trim()
                        .toLowerCase();


                const movieTitle =
                    String(movie.title || "")
                        .trim()
                        .toLowerCase();


                return (
                    movieID === target ||
                    movieTitle === target
                );

            });


        if (!relatedMovie) {

            return;

        }


        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            "profile-button";


        button.textContent =
            relatedMovie.title;


        button.addEventListener(
            "click",
            function() {

                openProfile(relatedMovie);

            }
        );


        container.appendChild(button);


        const spacer =
            document.createTextNode(" ");


        container.appendChild(spacer);

    });


    if (container.children.length === 0) {

        container.textContent =
            "No related movies found.";

    }

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


    // ========================================
    // REMOVE MOVIE ID FROM URL
    // ========================================

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


    return text
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