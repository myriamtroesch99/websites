let player = document.querySelector("#player");
let playground = document.querySelector("#playground");
let backgroundPosition = 0;
let sound = document.querySelector("#sound");

setPosition(player, 475, 10);
showHighscore();
function startgame() {
  // Neue Seite öffnen
  window.location.href = "../game/game.html";
}

function indexLoop() {
  sound.loop = true;
  sound.play();
  sound.volume = 0.5; // 50%
  backgroundPosition += 3;
  playground.style.backgroundPosition = "0px " + backgroundPosition + "px ";
  window.requestAnimationFrame(indexLoop);
  if (isKeyPressed(" ")) {
    startgame();
  }
}
indexLoop();

function showHighscore() {
  let highscore = localStorage.getItem("highscore") || 0;
  document.querySelector("#highscore").textContent = "Highscore: " + highscore;
}
