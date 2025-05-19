// Grab elements
const paceSlider = document.getElementById("pace-slider");
const paceDisplay = document.getElementById("running-pace");
const speedDisplay = document.getElementById("speed-kmh");
const finishDisplay = document.getElementById("finish-time");
const distanceButtons = document.querySelectorAll(".distance-button");
const saveButton = document.getElementById("save-goal");

let selectedDistance = 5; // km – valeur par défaut

/* Helpers */
const pad = (n) => String(n).padStart(2, "0");

function secondsToPace(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.round(sec % 60);
  return `${pad(minutes)}:${pad(seconds)}`;
}

function secondsToTime(sec) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/* Mise à jour principale */
function update() {
  const sliderValue = parseInt(paceSlider.value, 10);
  const paceSeconds = 180 + 3 * sliderValue; // 0‑100 → 3'00 à 8'00

  // Pace (affichage)
  paceDisplay.textContent = `${secondsToPace(paceSeconds)} min/km`;

  // Vitesse (km/h)
  const speed = 3600 / paceSeconds;
  speedDisplay.textContent = `${speed.toFixed(1)} km/h`;

  // Temps final
  const finishSeconds = selectedDistance * paceSeconds;
  finishDisplay.textContent = secondsToTime(finishSeconds);
}

/* Distance buttons */
distanceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    distanceButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDistance = parseFloat(btn.dataset.distance);
    update();
  });
});

/* Slider */
paceSlider.addEventListener("input", update);

/* Sauvegarde simple en localStorage */
saveButton.addEventListener("click", () => {
  const goal = {
    distance: selectedDistance,
    pace: paceDisplay.textContent,
    time: finishDisplay.textContent,
    date: new Date().toISOString(),
  };
  const goals = JSON.parse(localStorage.getItem("runtimeGoals") || "[]");
  goals.push(goal);
  localStorage.setItem("runtimeGoals", JSON.stringify(goals));
  alert("Objectif enregistré !");
});

/* Petite animation orbitale */
const orbitDot = document.getElementById("orbit-dot");
let angle = 0;
function animateOrbit() {
  angle = (angle + 0.5) % 360;
  const rad = (angle * Math.PI) / 180;
  const cx = 150;
  const cy = 75;
  const rx = 120;
  const ry = 30;
  const x = cx + rx * Math.cos(rad);
  const y = cy + ry * Math.sin(rad);
  orbitDot.setAttribute("cx", x);
  orbitDot.setAttribute("cy", y);
  requestAnimationFrame(animateOrbit);
}

// Init
update();
animateOrbit();
