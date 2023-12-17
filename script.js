"use strict";

// TO DO:
// ADD SOUNDS TO BOX CLICKS, AND ALERTS
// CHECK TO SEE WHY MUSIC DOESNT LOAD IN HOME PAGE
// CLEAN UP CODE

// variables
const boxes = Array.from(document.getElementsByClassName("box"));
const gameboard = document.getElementById("gameboard");
const restartButton = document.getElementById("restart-button");
let playerScoreNum = document.getElementById("player-score-num");
let cpuScoreNum = document.getElementById("cpu-score-num");
let playerScore = 0;
let cpuScore = 0;
let playerSymbol = "X";
let cpuSymbol = "O";
let isCpuTurn = false;
let isGameOver = false;
const MAX_CLASSLIST_SIZE = 1;
// setting an array of arrays that contain all the possible win conditions on the gameboard
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// set home page and gameplay page music volume to 3%
const gameMusic = document.getElementById("audio");
gameMusic.volume = 0.03;

// click audio - setting click audio to 30%
let clickPlay = document.getElementById("click-audio");
clickPlay.volume = 0.3;
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    clickPlay.play();
  });

// let clickNew = document.getElementById("click-audio");
// clickNew.volume = 0.3;
// document
//   .getElementById("new-game-sound")
//   .addEventListener("click", function () {
//     clickNew.play();
//   });

// const clickBox = document.getElementById("click-audio");
// clickBox.volume = 0.3;
// document.getElementsByClassName("box").addEventListener("click", function () {
//   clickBox.play();
// });

// for every combination in winCombinations array, check if each index matches our condition (if it contains the current players symbol)
function checkPlayerWin() {
  return winCombinations.some((combination) => {
    if (
      combination.every((index) => {
        let box = boxes[index];
        return box.classList.contains(playerSymbol.toLowerCase());
      })
    ) {
      // If a win combination is found, add the winning class to the boxes
      combination.forEach((index) => {
        boxes[index].classList.add("won");
      });
      return true;
    }
    return false;
  });
}

// for every combination in winCombinations array, check if each index matches our condition (if it contains the current players symbol)
function checkCpuWin() {
  return winCombinations.some((combination) => {
    if (
      combination.every((index) => {
        let box = boxes[index];
        return box.classList.contains(cpuSymbol.toLowerCase());
      })
    ) {
      // If a win combination is found, add the winning class to the boxes
      combination.forEach((index) => {
        boxes[index].classList.add("won");
      });
      return true;
    }
    return false;
  });
}

function resetGame() {
  console.log("resetting game");
  // clear the game board
  boxes.forEach((box) => {
    box.classList.remove(playerSymbol.toLowerCase());
    box.classList.remove(cpuSymbol.toLowerCase());
    box.innerHTML = "";
    box.classList.remove("won");
  });

  // reset the game state
  isCpuTurn = false;
  isGameOver = false;
}

function saveChoice(symbol) {
  if (symbol === "X") {
    playerSymbol = "X";
    cpuSymbol = "O";
  } else {
    playerSymbol = "O";
    cpuSymbol = "X";
  }

  console.log("Player symbol: ", playerSymbol);
  console.log("CPU symbol: ", cpuSymbol);
}

function executeCpuTurn() {
  console.log("executing CPU turn!");

  // returns a random number from 0-8
  function getRandomBox() {
    return Math.floor(Math.random() * 9);
  }

  let box = null;

  // get a box that isnt occupied with an X or O
  do {
    box = boxes[getRandomBox()];
  } while (box.classList.length > MAX_CLASSLIST_SIZE);

  console.log(`(CPU) Found unoccupied box: ${box}`);

  box.classList.add(cpuSymbol.toLowerCase());
  box.innerHTML =
    cpuSymbol === "X"
      ? '<i class="fas fa-times"></i>'
      : '<i class="far fa-circle"></i>';

  if (checkCpuWin()) {
    cpuScore += 10;
    cpuScoreNum.innerText = cpuScore;
    isGameOver = true;
    setTimeout(function () {
      alert("You lost! Click the Play Again button to start another round.");
    }, 400);
    return;
  }

  isCpuTurn = false;
}

// this function is for when a user clicks a box in the grid, X get shown
function onBoxClick(event) {
  if (isCpuTurn || isGameOver) return;

  // checking to see if the box already has something in it
  const box = event.target;

  if (box.classList.length > MAX_CLASSLIST_SIZE) {
    console.log("This box is occupied");
    return;
  }

  console.log("Player symbol: ", playerSymbol);
  console.log("CPU symbol: ", cpuSymbol);

  // adding the second attribute

  box.classList.add(playerSymbol.toLowerCase());
  box.innerHTML =
    playerSymbol === "X"
      ? '<i class="fas fa-times"></i>'
      : '<i class="far fa-circle"></i>';

  if (checkPlayerWin()) {
    playerScore += 10;
    playerScoreNum.innerText = playerScore;
    isGameOver = true;
    setTimeout(function () {
      alert("You won! Click the Play Again button to start another round.");
    }, 400);
    return;
  }

  // check if all boxes are occupied
  if (boxes.every((box) => box.classList.length > MAX_CLASSLIST_SIZE)) {
    console.log("All boxes are occupied!");
    isGameOver = true;
    setTimeout(function () {
      alert(
        "Draw! Nobody wins. Click the Play Again button to start another round."
      );
    }, 400);
    return;
  }

  isCpuTurn = true;

  // after our turn is complete, let the CPU do its turn (but wait 800ms first)
  setTimeout(executeCpuTurn, 800);
}

gameboard.addEventListener("click", onBoxClick);
restartButton.addEventListener("click", resetGame);
