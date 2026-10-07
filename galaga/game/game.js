console.log("hello from game.js");
let player = document.querySelector("#player");
let playground = document.querySelector("#playground");
let backgroundPosition = 0;
let enemy = document.querySelector("#enemy");
let score = 0;
let scoreDisplay = document.querySelector("#score");
let backgroundsound = document.querySelector("#backgroundsound");
let gameoversound = document.querySelector("#gameoversound");
let gameOver = false;

document.addEventListener("keydown", (event) => {
  //wiederholtes spawnen verhindern, nur ein Schuss pro mal
  if (event.repeat) {
    return;
  }

  if (event.code === "Space") {
    spawnBullet();
  }
});

setPosition(player, 475, 10);
showHighscore();

// Schuss spawnen mit Sound
function spawnBullet() {
  let lasersound = new Audio("../assets/sounds/Laser_Schuss.wav");
  lasersound.volume = 0.5; // 50%
  lasersound.play();

  // Neues Element erstellen und Klasse zuweisen
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  document.querySelector("#playground").appendChild(bullet);

  // Schuss an der aktuellen Spielerposition starten (zentriert)
  setPosition(bullet, getX(player) + 25, getY(player) + 50);
}

//wenn Gameover stoppt der gameLoop
function gameLoop() {
  if (gameOver) {
    return;
  }

  backgroundsound.play();
  backgroundsound.volume = 0.5; // 50%

  // Bewegung Player
  if (isKeyPressed("ArrowLeft")) {
    let x = getX(player);
    if (x > 10) {
      moveElement(player, -10, 0);
    }
  }
  if (isKeyPressed("ArrowRight")) {
    let x = getX(player);
    if (x < 940) {
      moveElement(player, 10, 0);
    }
  }

  // Hintergrund scrollen
  backgroundPosition += 3;
  playground.style.backgroundPosition = "0px " + backgroundPosition + "px ";

  let enemies = document.querySelectorAll(".enemy");

  enemies.forEach(function (enemy) {
    moveElement(enemy, 0, -1);

    // Game Over wenn Gegner den Spielfeldrand berührt
    if (getY(enemy) < 50) {
      gameOver = true;
      saveHighscore(score);
      saveScore(score);
      backgroundsound.pause();
      gameoversound.play();

      // 1 Sekunden warten, dann Gameover-Seite öffnen (damit der Gameover Sound abgespielt wird)
      setTimeout(() => {
        window.location.href = "../gameover/gameover.html";
      }, 1000);
    }
  });

  // Alle Schüsse nach oben bewegen
  document.querySelectorAll(".bullet").forEach(function (bullet) {
    moveElement(bullet, 0, 10);
    document.querySelectorAll(".enemy").forEach(function (enemy) {
      if (isColliding(bullet, enemy)) {
        score += 1;
        console.log("Score: " + score);
        scoreDisplay.textContent = "Score: " + score;
        enemy.remove();
        bullet.remove();
      }
    });

    // Schuss entfernen, wenn er oben raus ist
    if (getY(bullet) > 490) {
      bullet.remove();
    }
  });

  window.requestAnimationFrame(gameLoop);
}

// Gameloop ausführen
gameLoop();

function spawnEnemy() {
  // Neues img-Element erstellen
  let enemy = document.createElement("img");
  enemy.src = "../assets/images/Enemy.gif";

  // Diese Klasse können wir im CSS dann so anpassen, wie wir wollen
  enemy.classList.add("enemy");

  // Dem Spielfeld hinzufügen
  let playground = document.querySelector("#playground");
  playground.appendChild(enemy);

  // An eine Startposition setzen (rechts, zufällige Höhe)
  setPosition(enemy, Math.random() * 950, 450);
}

// Alle 2000 Millisekunden einen neuen Gegner spawnen
setInterval(spawnEnemy, 2000);

// Highscore speichern – nur wenn der neue Score besser ist
function saveHighscore(score) {
  let currentHighscore = localStorage.getItem("highscore") || 0;

  if (score > currentHighscore) {
    localStorage.setItem("highscore", score);
  }
}

//Score speichern
function saveScore(score) {
  localStorage.setItem("yourScore", score);
}

// Highscore anzeigen
function showHighscore() {
  let highscore = localStorage.getItem("highscore") || 0;
  document.querySelector("#highscore").textContent = "Highscore: " + highscore;
}
