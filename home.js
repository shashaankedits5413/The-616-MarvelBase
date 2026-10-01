// ========================================
// THE 616 MARVELBASE
// HOMEPAGE DATABASE SYSTEM
// ========================================

window.scrollTo(0, 0);


// ========================================
// DATABASE ELEMENTS
// ========================================

const counters = {
    characters: document.getElementById("character-count"),
    movies: document.getElementById("movie-count"),
    shows: document.getElementById("show-count"),
    teams: document.getElementById("team-count"),
    locations: document.getElementById("location-count"),
    events: document.getElementById("event-count"),
    universes: document.getElementById("universe-count")
};


// ========================================
// SHOW DETECTION
// ========================================

function isShow(item) {

    if (!item || !item.type) {
        return false;
    }

    const type = String(item.type)
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
// ANIMATED COUNTER
// ========================================

function animateCounter(element, target) {

    if (!element) {
        return;
    }

    const duration = 800;
    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const eased =
            1 - Math.pow(1 - progress, 3);

        const currentValue =
            Math.floor(target * eased);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}


// ========================================
// SET COUNTER
// ========================================

function setCounter(element, value) {

    if (!element) {
        return;
    }

    animateCounter(element, value);
}


// ========================================
// LOAD DATABASES
// ========================================

Promise.all([
    fetch("data/characters.json").then(response => response.json()),
    fetch("data/movies.json").then(response => response.json()),
    fetch("data/teams.json").then(response => response.json()),
    fetch("data/locations.json").then(response => response.json()),
    fetch("data/events.json").then(response => response.json()),
    fetch("data/universes.json").then(response => response.json())
])

.then(([
    charactersData,
    moviesData,
    teamsData,
    locationsData,
    eventsData,
    universesData
]) => {

    // ========================================
    // NORMALIZE DATA
    // ========================================

    const characters =
        Array.isArray(charactersData)
            ? charactersData
            : charactersData.characters || [];

    const media =
        Array.isArray(moviesData)
            ? moviesData
            : [
                ...(moviesData.movies || []),
                ...(moviesData.shows || [])
            ];

    const teams =
        Array.isArray(teamsData)
            ? teamsData
            : teamsData.teams || [];

    const locations =
        Array.isArray(locationsData)
            ? locationsData
            : locationsData.locations || [];

    const events =
        Array.isArray(eventsData)
            ? eventsData
            : eventsData.events || [];

    const universes =
        Array.isArray(universesData)
            ? universesData
            : universesData.universes || [];


    // ========================================
    // SEPARATE MOVIES AND SHOWS
    // ========================================

    const movies =
        media.filter(item => !isShow(item));

    const shows =
        media.filter(item => isShow(item));


    // ========================================
    // UPDATE HOMEPAGE COUNTERS
    // ========================================

    setCounter(
        counters.characters,
        characters.length
    );

    setCounter(
        counters.movies,
        movies.length
    );

    setCounter(
        counters.shows,
        shows.length
    );

    setCounter(
        counters.teams,
        teams.length
    );

    setCounter(
        counters.locations,
        locations.length
    );

    setCounter(
        counters.events,
        events.length
    );

    setCounter(
        counters.universes,
        universes.length
    );


    // ========================================
    // DATABASE READY
    // ========================================

    console.log(
        "616 MARVELBASE DATABASE COUNTS:",
        {
            characters: characters.length,
            movies: movies.length,
            shows: shows.length,
            teams: teams.length,
            locations: locations.length,
            events: events.length,
            universes: universes.length
        }
    );

})

.catch(error => {

    console.error(
        "616 MARVELBASE DATABASE ERROR:",
        error
    );

});