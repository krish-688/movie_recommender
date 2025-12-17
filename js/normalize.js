function normalizeMovies(movies) {
  return movies.map(movie => {
    // --- Normalize genres ---
    const genres = movie.genre
      ? movie.genre.split(",").map(g => g.trim().toLowerCase())
      : [];

    // --- Auto-generate moods from genres ---
    const moods = [];

    if (genres.includes("comedy") || genres.includes("family") || genres.includes("animation")) {
      moods.push("happy");
    }
    if (genres.includes("romance")) moods.push("romantic");
    if (genres.includes("drama") || genres.includes("biography") || genres.includes("war")) {
      moods.push("emotional");
    }
    if (genres.includes("horror") || genres.includes("thriller")) {
      moods.push("scared");
    }
    if (genres.includes("action") || genres.includes("crime") || genres.includes("sci-fi")) {
      moods.push("excited");
    }

    if (moods.length === 0) moods.push("neutral");

    return {
      title: movie.title,
      year: Number(movie.year),
      rating: Number(movie.rating),
      runtime: movie.runtime,
      genres,
      moods,
      poster: movie.Poster_Link
    };
  });
}


