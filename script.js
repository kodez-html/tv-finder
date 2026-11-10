
const showSelect = document.getElementById("show-select");
const showDetails = document.getElementById("show-details");
const message = document.getElementById("message");

// Updated showMessage if it fails, it gave only text before.
function showMessage(text) {
  message.textContent = text;

  if (text.startsWith("Loading")) {
    message.className = "loading";
  } else if (text !== "") {
    message.className = "error";
  } else {
    message.className = "";
  }
}

// Request options shared by both API requests
const requestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};

function displayDetails(show) {
  showDetails.innerHTML = "";

  // Show title
  const title = document.createElement("h2");
  title.textContent = show.name;
  showDetails.appendChild(title);

  // Show poster
  if (show.poster_path) {
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
    poster.alt = `${show.name} poster`;
    showDetails.appendChild(poster);
  } else {
    const noPoster = document.createElement("p");
    noPoster.textContent = "No poster available";
    showDetails.appendChild(noPoster);
  }

  // Show overview
  const overview = document.createElement("p");
  overview.textContent = show.overview;
  showDetails.appendChild(overview);

  // Show genres
  const genres = document.createElement("p");
  genres.textContent = "Genres: " + show.genres.map(genre => genre.name).join(", ");
  showDetails.appendChild(genres);

  // Number of seasons
  const seasons = document.createElement("p");
  seasons.textContent = "Seasons: " + show.number_of_seasons;
  showDetails.appendChild(seasons);

  // Number of episodes
  const episodes = document.createElement("p");
  episodes.textContent = "Episodes: " + show.number_of_episodes;
  showDetails.appendChild(episodes);

  // Show status
  const status = document.createElement("p");
  status.textContent = "Status: " + show.status;
  showDetails.appendChild(status);
}


// Step 5: Fill the dropdown
function fillDropdown(shows) {
  showSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a show";
  showSelect.appendChild(placeholder);

  shows.forEach(show => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });
}

// Load popular TV shows

async function loadPopularShows() {
  const url = "https://api.themoviedb.org/3/tv/popular";

  showMessage("Loading popular shows...");

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Your TMDB token was rejected. Check your token.");
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();

    fillDropdown(data.results);
    showMessage("");

  } catch (error) {
    showMessage(error.message);
    console.error(error);
  }
}


// Load details for the selected show

async function loadShowDetails(id) {
  const url = `https://api.themoviedb.org/3/tv/${id}`;

  showMessage("Loading show details...");

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Your TMDB token was rejected. Check your token.");
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    const show = await res.json();

    displayDetails(show);
    showMessage("");

  } catch (error) {
    showMessage(error.message);
    console.error(error);
  }
}


// Listen for dropdown changes
showSelect.addEventListener("change", function () {
  const id = showSelect.value;

  if (id === "") {
    return;
  }

  loadShowDetails(id);
});

// Start the app
loadPopularShows();
