// ===============================
// User profile
// ===============================
const userProfile = {
  mood: null,
  pace: null,
  realism: null,
  genres: []
};

// ===============================
let currentStep = 1;
const TOTAL_STEPS = 4;

function showStep(step) {
  document.querySelectorAll(".quiz-step").forEach(s =>
    s.classList.remove("active")
  );

  document
    .querySelector(`.quiz-step[data-step="${step}"]`)
    .classList.add("active");

  document.getElementById("prevBtn").style.display =
    step === 1 ? "none" : "inline-block";

  document.getElementById("nextBtn").style.display =
    step === TOTAL_STEPS ? "none" : "inline-block";
}

showStep(currentStep);

// ===============================
function nextStep() {
  if (currentStep < TOTAL_STEPS) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// ===============================
// Mood
// ===============================
document.querySelectorAll("[data-mood]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("[data-mood]").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    userProfile.mood = btn.dataset.mood;
    nextStep();
  };
});

// ===============================
// Pace
// ===============================
document.querySelectorAll("[data-pace]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("[data-pace]").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    userProfile.pace = btn.dataset.pace;
    nextStep();
  };
});

// ===============================
// Realism
// ===============================
document.querySelectorAll("[data-realism]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("[data-realism]").forEach(b =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    userProfile.realism = btn.dataset.realism === "true";
    nextStep();
  };
});

// ===============================
// Genres
// ===============================
document.querySelectorAll("input[type='checkbox']").forEach(cb => {
  cb.onchange = () => {
    userProfile.genres = Array.from(
      document.querySelectorAll("input[type='checkbox']:checked")
    ).map(c => c.value);
  };
});

// ===============================
// Nav buttons
// ===============================
document.getElementById("nextBtn").onclick = nextStep;
document.getElementById("prevBtn").onclick = prevStep;

// ===============================
// Final submit
// ===============================
document.getElementById("getMovieBtn").addEventListener("click", () => {
  if (!userProfile.mood || !userProfile.pace) {
    alert("Please answer required questions");
    return;
  }

  // ===============================
  // SMART AI PROFILE
  // ===============================
  const aiProfile = {
    moods: [],
    genres: userProfile.genres,
    realism: userProfile.realism,
    pace: userProfile.pace
  };

  // -------------------------------
  // MOOD EXPANSION
  // -------------------------------
  if (userProfile.mood === "happy") {
    aiProfile.moods.push("happy", "comfort");
  }

  if (userProfile.mood === "sad") {
    aiProfile.moods.push("emotional", "dramatic");
  }

  if (userProfile.mood === "neutral") {
    aiProfile.moods.push("neutral");
  }

  // -------------------------------
  // PACE → MOOD INFLUENCE
  // -------------------------------
  if (userProfile.pace === "fast") {
    aiProfile.moods.push("excited");
  }

  if (userProfile.pace === "slow") {
    aiProfile.moods.push("emotional");
  }

  // Remove duplicates
  aiProfile.moods = [...new Set(aiProfile.moods)];

  console.log("Final AI Profile:", aiProfile);

  // Store profile for main page
  localStorage.setItem("aiProfile", JSON.stringify(aiProfile));

  // Go to results
  window.location.href = "index.html";
});

