let welcomeScreen = document.getElementById("welcomeScreen").style;
let gameArea = document.getElementById("gameArea").style;
let newGameButton = document.getElementById("newGameButton").style;
let inputBox = document.getElementById("inputBox");
let guesses = document.getElementById("guesses");
let attempts = document.getElementById("attempts");
let textOutput = document.getElementById("textOutput");
let random_number = Math.floor(Math.random() * 100 + 1);
let total_attempts;
let previous_attempts = 0;
let current_guess;
let previous_guesses = [];
const max_value = 101;
let low_value = 0;
let high_value = max_value;

gameArea.display = "none";
function gameMode() {
    welcomeScreen.display = "none";
    gameArea.display = "contents";
    newGameButton.display = "none";
}
function easy() {
    gameMode();
    total_attempts = 10;
}
function hard() {
    gameMode();
    total_attempts = 5;
}
function incorrectGuess() {
    previous_guesses.push(" " + current_guess);
    guesses.innerText = previous_guesses;
    attempts.innerText = previous_attempts;
}
function gameEnded() {
    inputBox.setAttribute("readonly", "readonly");
    newGameButton.display = "inline";
}
function rangeBar() {
    const rangeOutput = document.getElementById("rangeOutput");
    const low = document.getElementById("low").style;
    const space = document.getElementById("space").style;
    const high = document.getElementById("high").style;
    low.flex = low_value + "%";
    high.flex = (max_value-high_value) + "%";
    space.flex = (high_value-(low_value+1)) + "%";
    rangeOutput.innerText = `${low_value+1} - ${high_value-1}`;
    rangeOutput.style.marginLeft = low_value + "%";
    rangeOutput.style.marginRight = (max_value-high_value) + "%";
}
function compare() {
    current_guess = Number(inputBox.value);
    inputBox.value = "";
    if(current_guess > low_value && current_guess < high_value) {
        previous_attempts++;
        if(previous_attempts < total_attempts) {
            if(current_guess<random_number) {
                textOutput.innerText = "Your guess is too low";
                incorrectGuess();
                low_value = current_guess;
                rangeBar();
            }
            else if(current_guess>random_number) {
                textOutput.innerText = "Your guess is too high";
                incorrectGuess();
                high_value = current_guess;
                rangeBar();
            }
            else {
                textOutput.innerText = `Correct! You got it in attempt ${previous_attempts}`;
                gameEnded();
            }
        }
        else {
            if(current_guess==random_number) {
                textOutput.innerText = `Correct! You got it in attempt ${previous_attempts}`;
            }
            else {
                textOutput.innerText = `Game Over! The number was ${random_number}`;
                incorrectGuess();
            }
            gameEnded();
        }
    }
}
function newGame() {
    window.location.reload();
}