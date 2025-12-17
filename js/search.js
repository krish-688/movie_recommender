function searchMovies(movieList, query) {
  if (!query) return movieList;

  const q = query.toLowerCase();

  return movieList.filter(movie => {
    const titleText = movie.title.toLowerCase();
    const genreText = movie.genres.join(" ").toLowerCase();
    const moodText = movie.moods.join(" ").toLowerCase();
    const reasonText = movie.reasons
      ? movie.reasons.join(" ").toLowerCase()
      : "";

    return (
      titleText.includes(q) ||
      genreText.includes(q) ||
      moodText.includes(q) ||
      reasonText.includes(q)
    );
  });
}
