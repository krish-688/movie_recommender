const FAVORITES_KEY = "favoriteMovies";

// Get favorites list
function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

// Check if movie is favorite
function isFavorite(title) {
  return getFavorites().includes(title);
}

// Toggle favorite
function toggleFavorite(title) {
  let favorites = getFavorites();

  if (favorites.includes(title)) {
    favorites = favorites.filter(t => t !== title);
  } else {
    favorites.push(title);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
