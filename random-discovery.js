/* =========================================
   THE 616 MARVELBASE
   RANDOM MARVEL DISCOVERY
   ========================================= */

(() => {
    "use strict";

    const typeElement =
        document.getElementById("discovery-type");

    const nameElement =
        document.getElementById("discovery-name");

    const descriptionElement =
        document.getElementById("discovery-description");

    const discoverButton =
        document.getElementById("discover-button");

    const openButton =
        document.getElementById("open-discovery-button");

    if (
        !typeElement ||
        !nameElement ||
        !descriptionElement ||
        !discoverButton ||
        !openButton
    ) {
        return;
    }

    let discoveryItems = [];
    let selectedItem = null;

    /* =====================================
       LOAD DATABASE
       ===================================== */

    Promise.all([
        fetch("data/characters.json").then(res => {
            if (!res.ok) {
                throw new Error("Failed to load characters.json");
            }
            return res.json();
        }),

        fetch("data/movies.json").then(res => {
            if (!res.ok) {
                throw new Error("Failed to load movies.json");
            }
            return res.json();
        }),

        fetch("data/teams.json").then(res => {
            if (!res.ok) {
                throw new Error("Failed to load teams.json");
            }
            return res.json();
        }),

        fetch("data/locations.json").then(res => {
            if (!res.ok) {
                throw new Error("Failed to load locations.json");
            }
            return res.json();
        }),

        fetch("data/events.json").then(res => {
            if (!res.ok) {
                throw new Error("Failed to load events.json");
            }
            return res.json();
        }),

        fetch("data/universes.json").then(res => {
            if (!res.ok) {
                throw new Error("Failed to load universes.json");
            }
            return res.json();
        })
    ])

        .then(
            ([
                charactersData,
                moviesData,
                teamsData,
                locationsData,
                eventsData,
                universesData
            ]) => {

                /* =====================================
                   NORMALIZE DATA
                   ===================================== */

                const characters =
                    Array.isArray(charactersData)
                        ? charactersData
                        : Array.isArray(charactersData.characters)
                            ? charactersData.characters
                            : [];

                const movies =
                    Array.isArray(moviesData)
                        ? moviesData
                        : [
                            ...(Array.isArray(moviesData.movies)
                                ? moviesData.movies
                                : []),

                            ...(Array.isArray(moviesData.shows)
                                ? moviesData.shows
                                : [])
                        ];

                const teams =
                    Array.isArray(teamsData)
                        ? teamsData
                        : Array.isArray(teamsData.teams)
                            ? teamsData.teams
                            : [];

                const locations =
                    Array.isArray(locationsData)
                        ? locationsData
                        : Array.isArray(locationsData.locations)
                            ? locationsData.locations
                            : [];

                const events =
                    Array.isArray(eventsData)
                        ? eventsData
                        : Array.isArray(eventsData.events)
                            ? eventsData.events
                            : [];

                const universes =
                    Array.isArray(universesData)
                        ? universesData
                        : Array.isArray(universesData.universes)
                            ? universesData.universes
                            : [];


                /* =====================================
                   BUILD DISCOVERY DATABASE
                   ===================================== */

                discoveryItems = [

                    /* Characters */
                    ...characters
                        .filter(item => item && item.id && item.name)
                        .map(item => ({
                            type: "CHARACTER",
                            name: item.name,
                            description:
                                item.description ||
                                "Explore this character in the 616 database.",
                            url:
                                `characters.html?id=${encodeURIComponent(item.id)}`
                        })),

                    /* Movies + Shows */
                    ...movies
                        .filter(item => item && item.id && item.title)
                        .map(item => ({
                            type:
                                item.type ||
                                "MOVIE / SHOW",

                            name: item.title,

                            description:
                                item.description ||
                                item.plot ||
                                "Explore this movie or show in the 616 database.",

                            url:
                                `movies.html?id=${encodeURIComponent(item.id)}`
                        })),

                    /* Teams */
                    ...teams
                        .filter(item => item && item.id && item.name)
                        .map(item => ({
                            type: "TEAM",

                            name: item.name,

                            description:
                                item.description ||
                                "Explore this team in the 616 database.",

                            url:
                                `teams.html?id=${encodeURIComponent(item.id)}`
                        })),

                    /* Locations */
                    ...locations
                        .filter(item => item && item.id && item.name)
                        .map(item => ({
                            type: "LOCATION",

                            name: item.name,

                            description:
                                item.description ||
                                "Explore this location in the 616 database.",

                            url:
                                `locations.html?id=${encodeURIComponent(item.id)}`
                        })),

                    /* Events */
                    ...events
                        .filter(item => item && item.id && item.name)
                        .map(item => ({
                            type: "EVENT",

                            name: item.name,

                            description:
                                item.description ||
                                "Explore this event in the 616 database.",

                            url:
                                `events.html?id=${encodeURIComponent(item.id)}`
                        })),

                    /* Universes */
                    ...universes
                        .filter(item => item && item.id && item.name)
                        .map(item => ({
                            type: "UNIVERSE",

                            name: item.name,

                            description:
                                item.description ||
                                "Explore this universe in the 616 database.",

                            url:
                                `universes.html?id=${encodeURIComponent(item.id)}`
                        }))
                ];


                /* =====================================
                   READY STATE
                   ===================================== */

                typeElement.textContent =
                    "DATABASE READY";

                nameElement.textContent =
                    "Ready for discovery";

                descriptionElement.textContent =
                    `${discoveryItems.length} database entries available.`;

                discoverButton.textContent =
                    "DISCOVER";

                openButton.disabled = true;
            }
        )

        .catch(error => {

            console.error(
                "Random Discovery failed:",
                error
            );

            typeElement.textContent =
                "DATABASE ERROR";

            nameElement.textContent =
                "Discovery unavailable";

            descriptionElement.textContent =
                "The database could not be loaded.";

            discoverButton.textContent =
                "RETRY";

            openButton.disabled = true;
        });


    /* =====================================
       RANDOM DISCOVERY
       ===================================== */

    function showRandomDiscovery() {

        if (!discoveryItems.length) {
            return;
        }

        let randomItem;

        /* Avoid immediately showing the same item twice. */
        do {
            randomItem =
                discoveryItems[
                    Math.floor(
                        Math.random() *
                        discoveryItems.length
                    )
                ];
        } while (
            discoveryItems.length > 1 &&
            selectedItem &&
            randomItem.url === selectedItem.url
        );

        selectedItem = randomItem;

        typeElement.textContent =
            randomItem.type.toUpperCase();

        nameElement.textContent =
            randomItem.name;

        descriptionElement.textContent =
            randomItem.description;

        /* Keep the discover button visible */
        discoverButton.textContent =
            "DISCOVER AGAIN";

        /* Enable profile button */
        openButton.disabled = false;
    }


    /* =====================================
       DISCOVER AGAIN
       ===================================== */

    discoverButton.addEventListener(
        "click",
        () => {
            showRandomDiscovery();
        }
    );


    /* =====================================
       OPEN PROFILE
       ===================================== */

    openButton.addEventListener(
        "click",
        () => {

            if (!selectedItem) {
                return;
            }

            window.location.href =
                selectedItem.url;
        }
    );

})();