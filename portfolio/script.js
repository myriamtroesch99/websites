// ===== Handy-Menü =====
const menueButton = document.querySelector(".menue-button");
if (menueButton) {
  menueButton.addEventListener("click", () => {
    const offen = document.body.classList.toggle("menue-offen");
    menueButton.setAttribute("aria-expanded", offen);
  });
}

// ===== Karussell (Hobbys, Wasi gärn ha, Wasi nid gärn ha) =====
document.querySelectorAll(".karussell").forEach((karussell) => {
  const band = karussell.querySelector(".karussell-band");
  const folien = karussell.querySelectorAll(".folie");
  const punkteBox = karussell.querySelector(".punkte");
  let aktuell = 0;

  // Für jede Folie einen Punkt erstellen
  folien.forEach((_, i) => {
    const punkt = document.createElement("button");
    punkt.setAttribute("aria-label", "Folie " + (i + 1));
    punkt.addEventListener("click", () => zeige(i));
    punkteBox.appendChild(punkt);
  });
  const punkte = punkteBox.querySelectorAll("button");

  function zeige(i) {
    aktuell = (i + folien.length) % folien.length;
    band.style.transform = "translateX(-" + aktuell * 100 + "%)";
    punkte.forEach((p, n) => p.classList.toggle("aktiv", n === aktuell));
  }

  karussell.querySelector(".zurueck").addEventListener("click", () => zeige(aktuell - 1));
  karussell.querySelector(".weiter").addEventListener("click", () => zeige(aktuell + 1));

  // Wischen auf dem Handy
  let startX = 0;
  band.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  band.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) zeige(aktuell + (diff < 0 ? 1 : -1));
  });

  zeige(0);
});

// ===== Lightbox (Bilder gross anzeigen) =====
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const grossBild = lightbox.querySelector("img");
  let bilder = [];
  let aktuell = 0;

  function oeffne(liste, i) {
    bilder = liste;
    aktuell = i;
    zeigeBild();
    lightbox.classList.add("offen");
  }

  function zeigeBild() {
    aktuell = (aktuell + bilder.length) % bilder.length;
    grossBild.src = bilder[aktuell].dataset.gross;
    grossBild.alt = bilder[aktuell].querySelector("img").alt;
  }

  function schliesse() {
    lightbox.classList.remove("offen");
    grossBild.src = "";
  }

  document.querySelectorAll(".galerie").forEach((galerie) => {
    const knoepfe = [...galerie.querySelectorAll("button")];
    knoepfe.forEach((knopf, i) => knopf.addEventListener("click", () => oeffne(knoepfe, i)));
  });

  lightbox.querySelector(".schliessen").addEventListener("click", schliesse);
  lightbox.querySelector(".zurueck").addEventListener("click", () => { aktuell--; zeigeBild(); });
  lightbox.querySelector(".weiter").addEventListener("click", () => { aktuell++; zeigeBild(); });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) schliesse(); });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("offen")) return;
    if (e.key === "Escape") schliesse();
    if (e.key === "ArrowLeft") { aktuell--; zeigeBild(); }
    if (e.key === "ArrowRight") { aktuell++; zeigeBild(); }
  });
}
