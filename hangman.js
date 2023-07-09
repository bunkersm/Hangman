const words = ["hangman", "javascript", "programming", "openai", "web"];
let selectedWord;
let guessesLeft;
let guessedLetters;

function init() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessesLeft = 6;
  guessedLetters = [];

  displayWord();
  updateGuessesLeft();
  clearInput();
  hideMessage();
}

function displayWord() {
  const wordDisplay = document.getElementById("word-display");
  let word = "";

  for (let i = 0; i < selectedWord.length; i++) {
    if (guessedLetters.includes(selectedWord[i])) {
      word += selectedWord[i];
    } else {
      word += "_";
    }
    word += " ";
  }

  wordDisplay.textContent = word;
}

function updateGuessesLeft() {
  const guessesLeftDisplay = document.getElementById("guesses-left");
  guessesLeftDisplay.textContent = `Guesses Left: ${guessesLeft}`;
}

function showMessage(message, isSuccess = false) {
  const messageDisplay = document.getElementById("message");
  messageDisplay.textContent = message;
  messageDisplay.style.color = isSuccess ? "green" : "red";
}

function hideMessage() {
  const messageDisplay = document.getElementById("message");
  messageDisplay.textContent = "";
}

function clearInput() {
  const guessInput = document.getElementById("guess-input");
  guessInput.value = "";
  guessInput.focus();
}

function guessLetter() {
  const guessInput = document.getElementById("guess-input");
  const letter = guessInput.value.toLowerCase();

  if (letter.length !== 1 || !letter.match(/[a-z]/i)) {
    showMessage("Please enter a single letter.");
    clearInput();
    return;
  }

  if (guessedLetters.includes(letter)) {
    showMessage("You already guessed that letter.");
    clearInput();
    return;
  }

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    displayWord();

    if (!document.getElementById("word-display").textContent.includes("_")) {
      showMessage("Congratulations! You won!", true);
      document.getElementById("guess-input").disabled = true;
    } else {
      showMessage("Good guess!", true);
    }
  } else {
    guessesLeft--;

    if (guessesLeft === 0) {
      showMessage(`Sorry, you lost. The word was "${selectedWord}".`);
      document.getElementById("guess-input").disabled = true;
    } else {
      showMessage("Wrong guess! Try again.");
    }

    document.getElementById("hangman-image").src = `hangman${6 - guessesLeft}.png`;
  }

  updateGuessesLeft();
  clearInput();
}

window.onload = init;
