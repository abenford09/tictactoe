const boxes = document.querySelectorAll(".box");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const boardState = Array(boxes.length);
boardState.fill(null);
console.log(boardState);

//Elements
const line = document.getElementById("line");
const gameOverArea = document.getElementById("gameover");
const gameOverText = document.getElementById("gameovertext");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

//Sounds
// const gameOverSound = new Audio("sounds/game_over.wav");
// const clickSound = new Audio("sounds/click.wav");

boxes.forEach((box) => box.addEventListener("click", boxClick));

function setHoverText() {
  //remove all hover text
  boxes.forEach((box) => {
    box.classList.remove("x-hover");
    box.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  boxes.forEach((box) => {
    if (box.innerText == "") {
      box.classList.add(hoverClass);
    }
  });
}

setHoverText();

function boxClick(event) {
  if (gameOverArea.classList.contains("show")) {
    return;
  }

  const box = event.target;
  const boxNumber = box.dataset.index;
  if (box.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    box.innerText = PLAYER_X;
    boardState[boxNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    box.innerText = PLAYER_O;
    boardState[boxNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

//   clickSound.play();
  setHoverText();
  checkWinner();
}

function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, lineClass } = winningCombination;
    const boxValue1 = boardState[combo[0] - 1];
    const boxValue2 = boardState[combo[1] - 1];
    const boxValue3 = boardState[combo[2] - 1];

    if (
      boxValue1 != null &&
      boxValue1 === boxValue2 &&
      boxValue1 === boxValue3
    ) {
      line.classList.add(lineClass);
      gameOverScreen(boxValue1);
      return;
    }
  }

  //Check for a draw
  const allboxFilledIn = boardState.every((box) => box !== null);
  if (allboxFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Game Over! Winner is ${winnerText}!`;
  }
  gameOverArea.className = "show";
  gameOverText.innerText = text;
//   gameOverSound.play();
}

function startNewGame() {
  line.className = "line";
  gameOverArea.className = "hide";
  boardState.fill(null);
  boxes.forEach((box) => (box.innerText = ""));
  turn = PLAYER_X;
  setHoverText();
}


const winningCombinations = [
  //rows
  { combo: [1, 2, 3], lineClass: "line-row-top" },
  { combo: [4, 5, 6], lineClass: "line-row-middle" },
  { combo: [7, 8, 9], lineClass: "line-row-bottom" },
  //columns
  { combo: [1, 4, 7], lineClass: "line-column-1" },
  { combo: [2, 5, 8], lineClass: "line-column-2" },
  { combo: [3, 6, 9], lineClass: "line-column-3" },
  //diagonals
  { combo: [1, 5, 9], lineClass: "line-diagonal-LR" },
  { combo: [3, 5, 7], lineClass: "line-diagonal-RL" },
];
