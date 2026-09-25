window.scrollTo(0, 0);
let universes = [];

// Load Universe Database
fetch("data/universes.json")
    .then(response => response.json())
    .then(data => {
        universes = data;
        displayUniverses(universes);
    })
    .catch(error => console.error("Error loading universes:", error));

// Display Universes
function displayUniverses(universeList) {
    const grid = document.getElementById("universe-grid");
    if (!grid) return;

    grid.innerHTML = universeList.map(u => `
        <div class="universe-card">
            <div class="universe-info">
                <span class="universe-designation">${u.designation}</span>
                <h2>${u.name}</h2>
                <p><strong>Type:</strong> ${u.type}</p>
                <p>${u.description}</p>
                <button class="universe-button" onclick="openUniverse('${u.id}')">Explore Reality</button>
            </div>
        </div>
    `).join("");
}

// Open Universe Profile Modal
function openUniverse(id) {
    const universe = universes.find(u => u.id === id);
    if (!universe) return;

    const modal = document.getElementById("universe-modal");
    if (!modal) return;

    document.getElementById("profile-name").textContent = universe.name;
    document.getElementById("profile-real-name").textContent = universe.designation;

    const statsContainer = document.querySelector(".profile-stats");
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div><strong>TYPE</strong><span>${universe.type}</span></div>
            <div><strong>THREAT LEVEL</strong><span>${universe.threatLevel}</span></div>
            <div><strong>STATUS</strong><span>${universe.status}</span></div>
        `;
    }

    const modalBody = document.getElementById("modal-body-content");
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="profile-section">
                <h3>Overview</h3>
                <p>${universe.description}</p>
            </div>
            <div class="profile-section">
                <h3>Key Inhabitants</h3>
                <p>${universe.characters.join(", ")}</p>
            </div>
            <div class="profile-section">
                <h3>Key Events</h3>
                <p>${universe.events.join(", ")}</p>
            </div>
        `;
    }

    modal.classList.add("active");
}

// Close Universe Profile Modal
function closeUniverse() {
    const modal = document.getElementById("universe-modal");
    if (modal) modal.classList.remove("active");
}

// Search Universes
const universeSearch = document.getElementById("universe-search");
if (universeSearch) {
    universeSearch.addEventListener("input", function(e) {
        const query = e.target.value.toLowerCase();
        const filtered = universes.filter(u =>
            u.name.toLowerCase().includes(query) ||
            u.designation.toLowerCase().includes(query) ||
            u.description.toLowerCase().includes(query) ||
            u.characters.some(c => c.toLowerCase().includes(query))
        );
        displayUniverses(filtered);
    });
}