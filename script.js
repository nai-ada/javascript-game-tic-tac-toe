"use strict";

// declare our references to all the html elements!

const boxes = Array.from(document.getElementsByClassName("box"));
const gameboard = document.getElementById("gameboard");
const restartButton = document.getElementById("restart-button");

let playerSymbol = "X";
let cpuSymbol = "O";

let isCpuTurn = false;
let isGameOver = false;

const MAX_CLASSLIST_SIZE = 1;

// an array of arrays that contain all the possible win conditions (indexes on the board)
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

// for every combination in winCombinations array, check if each index matches our condition (if it contains the current players symbol)
function checkPlayerWin() {
  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return boxes[index].classList.contains(playerSymbol.toLowerCase());
    });
  });
}

// for every combination in winCombinations array, check if each index matches our condition (if it contains the current players symbol)
function checkCpuWin() {
  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return boxes[index].classList.contains(cpuSymbol.toLowerCase());
    });
  });
}

function resetGame() {
  console.log("resetting game");
  // clear the game board
  boxes.forEach((box) => {
    box.classList.remove(playerSymbol.toLowerCase());
    box.classList.remove(cpuSymbol.toLowerCase());
    box.innerHTML = "";
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
    isGameOver = true;
    alert("CPU won!");
    return;
  }

  isCpuTurn = false;
}

// this function is for when a user clicks a box in the grid, their respective choice of either X or O gets shown
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
    isGameOver = true;
    alert("You won!");
    return;
  }

  // check if all boxes are occupied
  if (boxes.every((box) => box.classList.length > MAX_CLASSLIST_SIZE)) {
    console.log("All boxes are occupied!");
    isGameOver = true;
    alert("Draw! Nobody wins.");
    return;
  }

  isCpuTurn = true;

  // after our turn is complete, let the CPU do its turn (but wait 600ms first)
  setTimeout(executeCpuTurn, 600);
}

gameboard.addEventListener("click", onBoxClick);
restartButton.addEventListener("click", resetGame);
