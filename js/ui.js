// ===============================
// UI Rendering Logic
// ===============================

function renderMovies(movieList) {
  const grid = document.getElementById("movie-grid");

  if (!grid) return;

  grid.innerHTML = "";

  if (!movieList || movieList.length === 0) {
    grid.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movieList.forEach((movie, index) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // ===============================
    // ⭐ Best Match Badge (AI mode only)
    // ===============================
    if (window.isAIMode === true && index === 0) {
      const badge = document.createElement("div");
      badge.className = "best-badge";
      badge.textContent = "⭐ Best Match for You";
      card.appendChild(badge);
    }

    const isFav = isFavorite(movie.title);

    const reasonsText = movie.reasons
      ? movie.reasons.slice(0, 3).join(" • ")
      : "";

    card.innerHTML += `
      <img src="${movie.poster}" alt="${movie.title}">

      <div class="movie-info">
        <h3>${movie.title}</h3>

        <p class="year">${movie.year}</p>
        <p class="genres">${movie.genres.join(" • ")}</p>

        <span class="rating">⭐ ${movie.rating}</span>

        ${
          movie.matchPercent
            ? `<span class="match-badge">${movie.matchPercent}% Match</span>`
            : ""
        }

        ${reasonsText ? `<p class="ai-reason">${reasonsText}</p>` : ""}

        <button class="fav-btn" data-title="${movie.title}">
          ${isFav ? "❤️" : "🤍"}
        </button>
      </div>
    `;

    // ===============================
    // IMDb Redirect (Card Click)
    // ===============================
    card.addEventListener("click", () => {
      window.open(
        `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`,
        "_blank"
      );
    });

    // ===============================
    // Favorite Toggle
    // ===============================
    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(movie.title);
      renderMovies(window.currentMovies || []);
    });

    grid.appendChild(card);
  });
}
