
const showSelect = document.getElementById("show-select");

// Step 5: Fill the dropdown with popular shows
function fillDropdown(shows) {
  // Clear the dropdown
  showSelect.innerHTML = "";

  // Create the first placeholder option
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a show";
  showSelect.appendChild(placeholder);

  // Add each show to the dropdown
  shows.forEach(show => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });
}

async function loadPopularShows() {
  const url = "https://api.themoviedb.org/3/tv/popular";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();

    // Fill the dropdown with the results
    fillDropdown(data.results);

  } catch (error) {
    console.error(error);
  }
}

loadPopularShows();
