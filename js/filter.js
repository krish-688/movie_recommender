function filterByMood(movieList, selectedMood) {
  if (selectedMood === "all") {
    return movieList;
  }

  return movieList.filter(movie =>
    movie.moods.includes(selectedMood)
  );
}
