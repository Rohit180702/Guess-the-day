var score = 0;
var highestScore = 0;
var remainingTime = 30;
var gameInterval;
var gameActive = false;
var correctSound = document.getElementById("correct-sound");
var wrongSound = document.getElementById("wrong-sound");
var gameContainer = document.getElementById("game-container");
var gameOverContainer = document.getElementById("game-over-container");
var gameOverScore = document.getElementById("game-over-score");

function startGame() {
  gameActive = true;
  score = 0;
  remainingTime = 30;
  gameContainer.style.display = "block";
  gameOverContainer.style.display = "none";
  updateScore();
  updateHighestScore();
  updateRemainingTime();
  generateQuestion();
  gameInterval = setInterval(updateGame, 1000);
}

function updateGame() {
  remainingTime--;
  updateRemainingTime();
  if (remainingTime <= 0) {
    endGame();
  }
}

function generateQuestion() {
  var year = Math.floor(Math.random() * (2100 - 1900 + 1)) + 1900;
  var month = Math.floor(Math.random() * 12) + 1;
  var day = Math.floor(Math.random() * (new Date(year, month, 0).getDate() - 1 + 1)) + 1;
  var date = new Date(year, month - 1, day);
  var options = [
  getDayOfWeek(new Date(year, month - 1, day)),
  getDayOfWeek(new Date(year, month - 1, day + 1)),
  getDayOfWeek(new Date(year, month - 1, day - 1)),
  getDayOfWeek(new Date(year, month - 1, day + 2)),
  ];
  shuffle(options);
  document.getElementById("date").textContent = formatDate(date);
  document.querySelectorAll(".option").forEach(function(option, index) {
  option.textContent = options[index];
  });
  }
  
  function checkAnswer(button) {
  if (!gameActive) {
  return;
  }
  var selectedDay = button.textContent;
  var correctDay = getDayOfWeek(new Date(document.getElementById("date").textContent));
  if (selectedDay === correctDay) {
  score++;
  remainingTime += 2;
  updateScore();
  updateRemainingTime();
  correctSound.currentTime = 0;
  correctSound.play();
  generateQuestion();
  } else {
  score--;
  remainingTime -= 5;
  updateScore();
  updateRemainingTime();
  wrongSound.currentTime = 0;
  wrongSound.play();
  }
  }
  
  function endGame() {
  gameActive = false;
  clearInterval(gameInterval);
  gameContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  gameOverScore.textContent = score;
  if (score > highestScore) {
  highestScore = score;
  updateHighestScore();
  localStorage.setItem("highestScore", highestScore);
  }
  }
  
  function restartGame() {
  gameActive = false;
  clearInterval(gameInterval);
  gameContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  startGame();
  }
  
  function updateScore() {
  document.getElementById("score").textContent = score;
  }
  
  function updateHighestScore() {
  document.getElementById("highest-score").textContent = highestScore;
  }
  
  function updateRemainingTime() {
  document.getElementById("remaining-time").textContent = remainingTime;
  }
  
  function getDayOfWeek(date) {
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
  }
  
  function formatDate(date) {
  return date.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"});
  }
  
  function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  }
  return array;
  }
  
  window.onload = function() {
  if (localStorage.getItem("highestScore")) {
  highestScore = localStorage.getItem("highestScore");
  updateHighestScore();
  }
  };
  