let player = document.querySelector("#player");
let playground = document.querySelector("#playground");
let backgroundPosition = 0;
let sound = document.querySelector("#sound");
setPosition(player, 475, 10);
showHighscore();
showScore();
function startgame() {
  // Neue Seite öffnen
  window.location.href = "../game/game.html";
}
function gameoverLoop() {
  sound.play();
  sound.volume = 0.5; // 50%
  backgroundPosition += 3;
  playground.style.backgroundPosition = "0px " + backgroundPosition + "px ";
  window.requestAnimationFrame(gameoverLoop);
  if (isKeyPressed(" ")) {
    startgame();
  }
}
gameoverLoop();
function showHighscore() {
  let highscore = localStorage.getItem("highscore") || 0;
  document.querySelector("#highscore").textContent = "Highscore: " + highscore;
}
function showScore() {
  let score = localStorage.getItem("yourScore") || 0;
  document.querySelector("#score").textContent = "Your score: " + score;
}
