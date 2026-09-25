// ========================================
// LOAD DATABASE COUNTS
// ========================================

window.scrollTo(0, 0);
fetch("data/characters.json")
    .then(response => response.json())
    .then(data => {

        document.getElementById(
            "character-count"
        ).textContent = data.length;

    })
    .catch(error => {

        console.error(
            "CHARACTER DATABASE ERROR:",
            error
        );

    });



fetch("data/movies.json")
    .then(response => response.json())
    .then(data => {

        document.getElementById(
            "movie-count"
        ).textContent = data.length;

    })
    .catch(error => {

        console.error(
            "MOVIE DATABASE ERROR:",
            error
        );

    });



fetch("data/universes.json")
    .then(response => response.json())
    .then(data => {

        document.getElementById(
            "universe-count"
        ).textContent = data.length;

    })
    .catch(error => {

        console.error(
            "UNIVERSE DATABASE ERROR:",
            error
        );

    });