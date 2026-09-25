window.scrollTo(0, 0);


let events = [];

let characters = [];


// ========================================
// LOAD DATABASE
// ========================================

Promise.all([

    fetch("data/events.json")
        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Could not load events.json"
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


.then(([eventData, characterData]) => {


    // ========================================
    // EVENTS DATABASE
    // ========================================

    events =
        Array.isArray(eventData)

            ? eventData

            : eventData.events || [];



    // ========================================
    // CHARACTERS DATABASE
    // ========================================

    characters =
        Array.isArray(characterData)

            ? characterData

            : characterData.characters || [];



    // ========================================
    // DISPLAY EVENTS
    // ========================================

    displayEvents(events);



    // ========================================
    // OPEN EVENT FROM URL
    //
    // Example:
    // events.html?id=house-of-m
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

                String(item.id)
                    .toLowerCase()
                    .trim() ===

                eventId
                    .toLowerCase()
                    .trim()

            );


        if (event) {

            openProfile(event);

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
    // DISPLAY EVENT CARDS
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
            function(eventClick) {

                eventClick.stopPropagation();

                openProfile(event);

            }
        );

    }



    // ========================================
    // CLICKING CARD
    // ========================================

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
                        event.name

                            ? event.name
                                .toLowerCase()

                            : "";



                    const type =
                        event.type

                            ? event.type
                                .toLowerCase()

                            : "";



                    const universe =
                        event.universe

                            ? event.universe
                                .toLowerCase()

                            : "";



                    const location =
                        event.location

                            ? event.location
                                .toLowerCase()

                            : "";



                    const description =
                        event.description

                            ? event.description
                                .toLowerCase()

                            : "";



                    const year =
                        event.year

                            ? String(event.year)
                                .toLowerCase()

                            : "";



                    const participants =
                        Array.isArray(
                            event.participants
                        )

                            ? event.participants
                                .join(" ")
                                .toLowerCase()

                            : "";



                    const comics =
                        Array.isArray(
                            event.comics
                        )

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

function openProfile(event) {


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
    // PARTICIPANTS
    // ========================================

    displayParticipants(
        event.participants
    );



    // ========================================
    // COMICS
    // ========================================

    displayComics(
        event.comics
    );



    // ========================================
    // RELATED EVENTS
    // ========================================

    displayRelatedEvents(
        event.relatedEvents
    );



    // ========================================
    // RESET PROFILE SCROLL
    //
    // Important when jumping from:
    // Event A → Event B
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

    if (event.id) {

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
        !Array.isArray(
            participantValues
        ) ||

        participantValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }



    participantValues.forEach(
        participantValue => {


            const target =
                String(
                    participantValue || ""
                )
                    .trim()
                    .toLowerCase();



            const character =
                characters.find(character => {


                    if (!character) {

                        return false;

                    }



                    const characterID =
                        String(
                            character.id || ""
                        )
                            .trim()
                            .toLowerCase();



                    const characterName =
                        String(
                            character.name || ""
                        )
                            .trim()
                            .toLowerCase();



                    const realName =
                        String(
                            character.realName || ""
                        )
                            .trim()
                            .toLowerCase();



                    return (

                        characterID === target ||

                        characterName === target ||

                        realName === target

                    );

                });



            // ========================================
            // CHARACTER FOUND
            // ========================================

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



            // ========================================
            // CHARACTER NOT FOUND
            // ========================================

            else {


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



            // ========================================
            // SPACE
            // ========================================

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
        !Array.isArray(
            comicValues
        ) ||

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
        !Array.isArray(
            relatedEventValues
        ) ||

        relatedEventValues.length === 0
    ) {

        container.textContent =
            "None listed.";

        return;

    }



    relatedEventValues.forEach(
        relatedEventValue => {


            const target =
                String(
                    relatedEventValue || ""
                )
                    .trim()
                    .toLowerCase();



            const relatedEvent =
                events.find(event => {


                    if (!event) {

                        return false;

                    }



                    const eventID =
                        String(
                            event.id || ""
                        )
                            .trim()
                            .toLowerCase();



                    const eventName =
                        String(
                            event.name || ""
                        )
                            .trim()
                            .toLowerCase();



                    return (

                        eventID === target ||

                        eventName === target

                    );

                });



            // ========================================
            // EVENT FOUND
            // ========================================

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

            }



            // ========================================
            // EVENT NOT FOUND
            // ========================================

            else {


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



            // ========================================
            // SPACE
            // ========================================

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



    // ========================================
    // REMOVE EVENT ID FROM URL
    // ========================================

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