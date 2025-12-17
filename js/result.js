const movie = JSON.parse(localStorage.getItem("aiMovie"));

const container = document.getElementById("movieResult");

if (!movie) {
  container.innerHTML = "<p>No recommendation found.</p>";
} else {
  container.innerHTML = `
    <div class="movie-card large">
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <p><strong>Year:</strong> ${movie.year}</p>
        <p><strong>Genres:</strong> ${movie.genres.join(", ")}</p>
        <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>

        <h3>🤖 Why this movie?</h3>
        <p>
          Based on your mood <b>${movie.moods.join(", ")}</b>,
          preferred pace, and selected genres,
          this movie best matches your emotional and entertainment needs.
        </p>

        <a target="_blank"
           href="https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}">
          🔎 View on IMDb
        </a>
      </div>
    </div>
  `;
}
