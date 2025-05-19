(() => {
    const LIFE_EXPECTANCY_YEARS = 90;
    const WEEKS_IN_YEAR = 52;
    const TOTAL_WEEKS = LIFE_EXPECTANCY_YEARS * WEEKS_IN_YEAR;  // 4 680
    const gridContainer = document.getElementById("grid-container");
    const statsEl       = document.getElementById("stats");
    const matixBtn      = document.getElementById("matix-btn");
    const dobInput      = document.getElementById("dob-input");

    /* ——— 1. Crée la grille une bonne fois pour toutes ——— */
    function buildGrid () {
        const frag = document.createDocumentFragment();
        /*  
            Pour avoir le remplissage “haut-droite ➜ bas-gauche”,
            on crée chaque rangée de 52 cercles dans l’ordre inversé.
        */
        for (let row = 0; row < LIFE_EXPECTANCY_YEARS; row++) {
            for (let col = WEEKS_IN_YEAR - 1; col >= 0; col--) {
                const dot = document.createElement("div");
                dot.className = "dot";
                frag.appendChild(dot);
            }
        }
        gridContainer.appendChild(frag);
    }

    /* ——— 2. Calcule les semaines déjà vécues et colore ——— */
    function matix () {
        const dobValue = dobInput.value;
        if (!dobValue) { alert("Entre ta date de naissance !"); return; }

        const dob = new Date(dobValue);
        const now = new Date();

        if (dob > now) { alert("Tu n’es pas encore né !"); return; }

        /* Semaines vécues (arrondi : on garde la partie entière) */
        const msPerWeek   = 1000 * 60 * 60 * 24 * 7;
        const weeksLived  = Math.floor((now - dob) / msPerWeek);
        const weeksClamped = Math.min(weeksLived, TOTAL_WEEKS);

        /* Coloration progressive (optionnel : léger délai pour l’effet) */
        const dots = gridContainer.children;
        for (let i = 0; i < TOTAL_WEEKS; i++) {
            const dot = dots[i];
            dot.classList.toggle("filled", i < weeksClamped);
        }

        /* Stats textuelles */
        const weeksRemaining = Math.max(TOTAL_WEEKS - weeksClamped, 0);
        const yearsRemaining = weeksRemaining / WEEKS_IN_YEAR;
        statsEl.textContent =
            weeksClamped >= TOTAL_WEEKS
                ? "Félicitations ! Tu as déjà dépassé les 90 ans ! 🎉"
                : `Il te reste ~${weeksRemaining.toLocaleString("fr-FR")} semaines (${yearsRemaining.toFixed(1)} ans).`;
    }

    /* ——— 3. Wiring ——— */
    document.addEventListener("DOMContentLoaded", buildGrid);
    matixBtn.addEventListener("click", matix);
})();
