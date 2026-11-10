
const showSelect = document.getElementById("show-select");
const showDetails = document.getElementById("show-details");

// Request options shared by both API requests
const requestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};

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

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();

    fillDropdown(data.results);

  } catch (error) {
    console.error(error);
  }
}

// Step 6: Load details for the selected show
async function loadShowDetails(id) {
  const url = `https://api.themoviedb.org/3/tv/${id}`;

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const show = await res.json();
    console.log(show);

  } catch (error) {
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
