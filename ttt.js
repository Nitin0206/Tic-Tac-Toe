const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const board = document.getElementById("board");
const roundsDropdown = document.getElementById("rounds");
const xWinsText = document.getElementById("x-wins");
const oWinsText = document.getElementById("o-wins");
const roundCountText = document.getElementById("round-count");
const totalRoundsText = document.getElementById("total-rounds");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let roundCount = 0;
let totalRounds = 1;
let xWins = 0;
let oWins = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.innerText = `Player ${gameBoard[a]} Wins This Round!`;
            gameActive = false;
            board.classList.add("disabled");
            updateScore(gameBoard[a]);
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        board.classList.add("disabled");
    }
}

function updateScore(winner) {
    if (winner === "X") {
        xWins++;
        xWinsText.innerText = xWins;
    } else if (winner === "O") {
        oWins++;
        oWinsText.innerText = oWins;
    }

    roundCount++;
    roundCountText.innerText = roundCount;

    if (roundCount >= totalRounds) {
        declareFinalWinner();
    }
}

function declareFinalWinner() {
    gameActive = false;
    board.classList.add("disabled");

    if (xWins > oWins) {
        statusText.innerText = "Player X Wins the Series!";
    } else if (oWins > xWins) {
        statusText.innerText = "Player O Wins the Series!";
    } else {
        statusText.innerText = "It's a Tie Series!";
    }

    startButton.disabled = false;
    resetButton.disabled = true;
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function startGame() {
    totalRounds = parseInt(roundsDropdown.value);
    totalRoundsText.innerText = totalRounds;
    roundCount = 0;
    xWins = 0;
    oWins = 0;
    xWinsText.innerText = xWins;
    oWinsText.innerText = oWins;
    roundCountText.innerText = roundCount;
    
    startNewRound();
}

function startNewRound() {
    gameActive = true;
    gameBoard.fill("");
    cells.forEach(cell => cell.innerText = "");
    statusText.innerText = "Player X's Turn";
    currentPlayer = "X";
    board.classList.remove("disabled");
    resetButton.disabled = false;
}

function resetGame() {
    if (roundCount < totalRounds) {
        startNewRound();
    }
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
