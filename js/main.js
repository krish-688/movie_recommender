document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // Normalize dataset
  // ===============================
  const normalizedMovies = normalizeMovies(movies);

  // Global state
  let currentMovies = normalizedMovies;
  window.currentMovies = currentMovies;

  // ===============================
  // Detect AI mode (from quiz)
  // ===============================
  const aiProfileRaw = localStorage.getItem("aiProfile");

  if (aiProfileRaw) {
    const aiProfile = JSON.parse(aiProfileRaw);

    // Enable AI mode
    window.isAIMode = true;

    // Get AI-ranked movies
    currentMovies = recommendBestMovies(normalizedMovies, aiProfile);

    // Clear profile so refresh doesn't re-apply AI filter
    localStorage.removeItem("aiProfile");
  } else {
    // Manual browsing mode
    window.isAIMode = false;
    currentMovies = normalizedMovies;
  }

  window.currentMovies = currentMovies;
  renderMovies(currentMovies);

  // ===============================
  // Mood bar filtering (manual only)
  // ===============================
  const moodButtons = document.querySelectorAll("#moods button");

  if (moodButtons.length > 0) {
    moodButtons.forEach(button => {
      button.addEventListener("click", () => {

        moodButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedMood = button.dataset.mood;

        // Favorites
        if (selectedMood === "favorites") {
          const favoriteTitles = getFavorites();
          currentMovies = normalizedMovies.filter(movie =>
            favoriteTitles.includes(movie.title)
          );
        }

        // All movies
        else if (selectedMood === "all") {
          currentMovies = normalizedMovies;
        }

        // Mood-based filtering
        else {
          currentMovies = recommendMovies(normalizedMovies, selectedMood);
        }

        window.currentMovies = currentMovies;
        renderMovies(currentMovies);
      });
    });
  }

  // ===============================
  // Search functionality
  // ===============================
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();
      renderMovies(searchMovies(window.currentMovies, query));
    });
  }

});
