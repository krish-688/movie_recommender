// ===================================
// AI Recommendation Engine
// ===================================

function recommendBestMovies(movies, profile, limit = 12) {
  const scored = movies.map(movie => {
    let score = 0;
    const reasons = [];

    // Mood match
    if (profile.mood && movie.moods.includes(profile.mood)) {
      score += 30;
      reasons.push(`Matches your mood (${profile.mood})`);
    }

    // Genre match
    if (profile.genres && profile.genres.length > 0) {
      const matches = movie.genres.filter(g =>
        profile.genres.includes(g)
      );
      if (matches.length > 0) {
        score += matches.length * 15;
        reasons.push(`Genre match: ${matches.join(", ")}`);
      }
    }

    // Pace
    if (profile.pace) {
      const runtime = parseInt(movie.runtime);
      if (profile.pace === "slow" && runtime < 100) {
        score += 10;
        reasons.push("Slow-paced movie");
      }
      if (profile.pace === "medium" && runtime >= 100 && runtime <= 140) {
        score += 10;
        reasons.push("Medium-paced movie");
      }
      if (profile.pace === "fast" && runtime > 140) {
        score += 10;
        reasons.push("Fast-paced movie");
      }
    }

    // Realism
    if (profile.realism === true) {
      const realisticGenres = ["drama", "crime", "biography", "history", "war", "sport"];
      if (movie.genres.some(g => realisticGenres.includes(g))) {
        score += 10;
        reasons.push("Realistic themes");
      }
    }

    // Rating weight
    score += movie.rating * 2;

    return { ...movie, score, reasons };
  });

  // Sort by score
  scored.sort((a, b) => b.score - a.score);

  // Compute match %
  const maxScore = scored[0]?.score || 1;
  const withMatchPercent = scored.map(movie => ({
    ...movie,
    matchPercent: Math.min(100, Math.round((movie.score / maxScore) * 100))
  }));

  return diversifyMovies(withMatchPercent, limit);
}


// ===================================
// Diversity Logic
// ===================================
function diversifyMovies(sortedMovies, limit) {
  const buckets = {};
  const result = [];

  sortedMovies.forEach(movie => {
    const g = movie.genres[0] || "other";
    if (!buckets[g]) buckets[g] = [];
    buckets[g].push(movie);
  });

  while (result.length < limit) {
    let added = false;

    for (const g in buckets) {
      if (buckets[g].length > 0) {
        result.push(buckets[g].shift());
        added = true;
        if (result.length === limit) break;
      }
    }

    if (!added) break;
  }

  return result;
}

// ===============================
// MANUAL MODE RECOMMENDATION
// ===============================
function recommendMovies(movieList, mood) {
  if (!mood || mood === "all") return movieList;

  return movieList.filter(movie =>
    movie.moods.includes(mood)
  );
}
