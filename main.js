// Initial setup
const formElm = document.querySelector("form");
const inputElm = document.querySelector("#luck-input");
const winScoreElm = document.querySelector(".lucky-number span");
const winPlayerElm = document.querySelector(".winner");
const p1BtnElm = document.querySelector(".p1Btn");
const p2BtnElm = document.querySelector(".p2Btn");
const p1ScoreElm = document.querySelector(".p1");
const p2ScoreElm = document.querySelector(".p2");
const resetBtnElm = document.querySelector("#resetBtn");

// Data store
let p1Score = 0;
let p2Score = 0;
let winningScore = 5;
let gameOver = false;
let winner = null;

// Player random turn
function randomizeStartPlayer() {
  const players = ["p1Turn", "p2Turn"];
  const index = Math.floor(Math.random() * players.length);
  const player = players[index];
  if (player === "p1Turn") {
    p1BtnElm.removeAttribute("disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
  } else {
    p2BtnElm.removeAttribute("disabled");
    p1BtnElm.setAttribute("disabled", "disabled");
  }
}

// Function to disable buttons
function disableButtons() {
  p1BtnElm.setAttribute("disabled", "disabled");
  p2BtnElm.setAttribute("disabled", "disabled");
}

// Player 1 button
p1BtnElm.addEventListener("click", () => {
  if (!gameOver) {
    p1Score++;
    p1ScoreElm.textContent = p1Score;
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.removeAttribute("disabled");
    identifyWinningState();
  }
});

// Player 2 button
p2BtnElm.addEventListener("click", () => {
  if (!gameOver) {
    p2Score++;
    p2ScoreElm.textContent = p2Score;
    p2BtnElm.setAttribute("disabled", "disabled");
    p1BtnElm.removeAttribute("disabled");
    identifyWinningState();
  }
});

// Display winning score
winScoreElm.textContent = winningScore;

// Identify the winning state
function identifyWinningState() {
  if (winningScore === p1Score) {
    winPlayerElm.textContent = "Player-1 is Winner";
    gameOver = true;
    // Disable buttons when the game is over
    disableButtons();
  } else if (winningScore === p2Score) {
    winPlayerElm.textContent = "Player-2 is Winner";
    gameOver = true;
    // Disable buttons when the game is over
    disableButtons();
  }
}

// Reset button functionality
function resetBtn() {
  p1Score = 0;
  p2Score = 0;
  gameOver = false;
  winningScore = 5;
  p1ScoreElm.textContent = p1Score;
  p2ScoreElm.textContent = p2Score;
  winPlayerElm.textContent = "";
  // Calling function for random player turn
  randomizeStartPlayer();
}

resetBtnElm.addEventListener("click", resetBtn);

// Validate input for winning score
function validateInput(elmVal) {
  if (
    elmVal.trim() == "" ||
    Number(elmVal) !== Number(elmVal) ||
    Number(elmVal) <= 0
  ) {
    alert("please input a valid number");
    return false;
  } else {
    return true;
  }
}

// Set winning score
formElm.addEventListener("submit", (e) => {
  // Stop refreshing
  e.preventDefault();

  resetBtn();
  if (!validateInput(inputElm.value)) return;

  const val = Number(inputElm.value);
  winningScore = val;
  winScoreElm.textContent = val;
  inputElm.value = "";
});

// Call randomizeStartPlayer on initial load
randomizeStartPlayer();
