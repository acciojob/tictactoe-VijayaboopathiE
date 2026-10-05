//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");

const submitButton = document.getElementById("submit");

const playerSection = document.getElementById("player-section");
const gameSection = document.getElementById("game-section");

const message = document.querySelector(".message");

const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";

let currentPlayer = 1;

let gameOver = false;


// Winning combinations
const winningCombinations = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],

    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],

    ["1", "5", "9"],
    ["3", "5", "7"]
];


// Submit player names
submitButton.addEventListener("click", function () {

    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    playerSection.style.display = "none";
    gameSection.style.display = "block";

    currentPlayer = 1;
    gameOver = false;

    message.textContent = player1 + ", you're up";

});


// Handle cell clicks
cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        // Don't allow moves after game ends
        if (gameOver) {
            return;
        }

        // Don't allow overwriting an existing cell
        if (cell.textContent !== "") {
            return;
        }


        // Player 1 = X
        if (currentPlayer === 1) {

            cell.textContent = "x";

        }

        // Player 2 = O
        else {

            cell.textContent = "o";

        }


        // Check winner
        if (checkWinner()) {
            return;
        }


        // Switch player
        if (currentPlayer === 1) {

            currentPlayer = 2;

            message.textContent = player2 + ", you're up";

        } else {

            currentPlayer = 1;

            message.textContent = player1 + ", you're up";

        }

    });

});


// Check whether somebody won
function checkWinner() {

    for (let combination of winningCombinations) {

        const cell1 = document.getElementById(combination[0]).textContent;
        const cell2 = document.getElementById(combination[1]).textContent;
        const cell3 = document.getElementById(combination[2]).textContent;


        if (
            cell1 !== "" &&
            cell1 === cell2 &&
            cell2 === cell3
        ) {

            gameOver = true;

            const winner =
                cell1 === "x" ? player1 : player2;

            message.textContent =
                winner + " congratulations you won!";

            return true;
        }

    }

    return false;
}