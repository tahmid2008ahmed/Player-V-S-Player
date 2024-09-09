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

//player random turm
function randomizeStartPlayer() {
  const players = ["p1Turn", "p2Turn"];
  const index = Math.floor(Math.random() * players.length);
  const player = players[index];
  return player;
}
// Function to disable buttons
function disableButtons() {
  p1BtnElm.setAttribute("disabled", "disabled");
  p2BtnElm.setAttribute("disabled", "disabled");
}

// Player 1 button event listener
p1BtnElm.addEventListener("click", () => {
  if (!gameOver) {
    p1Score++;
    p1ScoreElm.textContent = p1Score;
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.removeAttribute("disabled");
    identifyWinningState();
  }
});

// Player 2 button event listener
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

function resetBtn() {
  p1Score = 0;
  p2Score = 0;
  gameOver = false;
  winningScore = 5;
  p1ScoreElm.textContent = p1Score;
  p2ScoreElm.textContent = p2Score;
  winPlayerElm.textContent = "";
  // calling function for randam player turn
  const startingPlayer = randomizeStartPlayer();
  if (startingPlayer === "p1Turn") {
    p1BtnElm.removeAttribute("disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
  } else {
    p2BtnElm.removeAttribute("disabled");
    p1BtnElm.setAttribute("disabled", "disabled");
  }
}

resetBtnElm.addEventListener("click", resetBtn);

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

// set winning
formElm.addEventListener("submit", (e) => {
  //stop refreashing
  e.preventDefault();

  resetBtn();
  if (!validateInput(inputElm.value)) return;

  const val = Number(inputElm.value);
  winningScore = val;
  winScoreElm.textContent = val;
  inputElm.value = "";
});

/*
;(function () {
  const formElm = document.querySelector('form')
  const inputElm = document.querySelector('#luck-input')
  const winScoreElm = document.querySelector('.lucky-number span')
  const winPlayerElm = document.querySelector('.winner')
  const p1BtnElm = document.querySelector('.p1Btn')
  const p2BtnElm = document.querySelector('.p2Btn')
  const p1ScoreElm = document.querySelector('.p1')
  const p2ScoreElm = document.querySelector('.p2')
  const resetBtnElm = document.querySelector('#resetBtn')

  //data store
  let p1Score = 0
  let p2Score = 0
  let winningScore = 5
  let gameOver = false
  let winner = null
  let p1Turn = true
  let p2Turn = false

  function setInitialPlayerTurnValue() {
    const player = randomizeStartPlayer()
    if (player === 'p1') {
      p1Turn = true
      p2BtnElm.setAttribute('disabled', 'disabled')
      p1BtnElm.removeAttribute('disabled')
    } else {
      p2Turn = true
      p1BtnElm.setAttribute('disabled', 'disabled')
      p2BtnElm.removeAttribute('disabled')
    }
  }

  setInitialPlayerTurnValue()

  function randomizeStartPlayer() {
    const players = ['p1', 'p2']
    const index = Math.floor(Math.random() * players.length) //0 -1
    const player = players[index]
    return player
  }

  function identifyWinningState() {
    if (p1Score === winningScore || p2Score === winningScore) {
      gameOver = true
    }
  }

  function identifyWinner() {
    if (p1Score === winningScore) {
      winner = 'p1'
      winPlayerElm.textContent = 'Player-1 is Winner'
    }

    if (p2Score === winningScore) {
      winner = 'p2'
      winPlayerElm.textContent = 'Player-2 is Winner'
    }
  }

  function disableBtnInput() {
    p1BtnElm.setAttribute('disabled', 'disabled')
    p2BtnElm.setAttribute('disabled', 'disabled')
  }

  function resetInput() {
    p1Score = 0
    p2Score = 0
    winningScore = 5
    gameOver = false
    winner = null

    p1ScoreElm.textContent = p1Score
    p2ScoreElm.textContent = p2Score
    winScoreElm.textContent = winningScore
    winPlayerElm.textContent = ''

    p1BtnElm.removeAttribute('disabled')
    p2BtnElm.removeAttribute('disabled')
  }

  function validateInput(elmVal) {
    if (
      elmVal.trim() == '' ||
      Number(elmVal) !== Number(elmVal) ||
      Number(elmVal) <= 0
    ) {
      alert('please input a valid number')
      return false
    } else {
      return true
    }
  }
  //setting winning score into DOM
  winScoreElm.textContent = winningScore

  p1BtnElm.addEventListener('click', (evt) => {
    if (p1Turn) {
      p1Score++
      p1ScoreElm.textContent = p1Score
      identifyWinningState()

      identifyWinner()
      p1Turn = false
      p2Turn = true
      p1BtnElm.setAttribute('disabled', 'disabled')
      p2BtnElm.removeAttribute('disabled')
    }

    if (gameOver) {
      disableBtnInput()
    }
  })

  p2BtnElm.addEventListener('click', (evt) => {
    if (p2Turn) {
      p2Score++
      p2ScoreElm.textContent = p2Score
      identifyWinningState()

      identifyWinner()
      p2Turn = false
      p1Turn = true

      p2BtnElm.setAttribute('disabled', 'disabled')
      p1BtnElm.removeAttribute('disabled')
    }
    if (gameOver) {
      disableBtnInput()
    }
  })

  resetBtnElm.addEventListener('click', (evt) => {
    resetInput()
  })

  formElm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    //get input data
    resetInput()
    if (!validateInput(inputElm.value)) return

    const val = Number(inputElm.value)
    console.log(val)
    winningScore = val
    winScoreElm.textContent = val
    inputElm.value = ''
    setInitialPlayerTurnValue()
  })
})()

*/
