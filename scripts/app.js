const lettersContainer = document.getElementById('lettersContainer');
const highScore = document.getElementById('highScore');
const score = document.getElementById('score');
const word = document.getElementById('word');

const wordList = ["app", "pop", "up", "dad", "mum", "sue", "cue", "eye", "wow"];

let currentWord = "";
let revealedWord = "";
let strikes = 0;
const maxStrikes = 10;
let scoreValue = 0;
let highScoreValue = 0;

const alphabet = "abcdefghijklmnopqrstuvwxyz";
for (letterIndex in alphabet) {
  const newLetterButton = document.createElement('button');
  const newLetter = document.createElement('letter');
  newLetterButton.classList.add('letter-button');
  newLetterButton.setAttribute('data-letter', alphabet[letterIndex]);
  newLetter.classList.add('letter');
  newLetter.innerText = alphabet[letterIndex].toUpperCase();
  newLetterButton.append(newLetter);
  lettersContainer.append(newLetterButton);
}

function initializeNewWord() {
  const randomNum = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomNum];
  revealedWord = "";
  for (let i = 0; i < currentWord.length; ++i) {
    revealedWord += "_";
  }

  word.innerText = revealedWord;
  strikes = 0;
  console.log(currentWord);
}


function guessLetter(guess) {
  let letterFound = false;

  for (let i = 0; i < currentWord.length; ++i) {

    if (currentWord[i] === guess) {
      letterFound = true;
      revealedWord = setCharAt(revealedWord, i, currentWord[i]);
    }
  }

  if (!letterFound) {
    strikes++;
  }
  else {
    if (!revealedWord.includes('_')) {
      wordFound()
    }
  }

  if (strikes >= maxStrikes) {
    wordNotFound();
  }

  word.innerText = revealedWord;
}

function wordFound() {
  scoreValue++;
  if (highScoreValue < scoreValue) {
    highScoreValue = scoreValue;
  }

  updateScoreDisplay();
  console.log('Congratulations! You found the word!');
  initializeNewWord();
}

function wordNotFound() {
  if (highScoreValue < scoreValue) {
    highScoreValue = scoreValue;
  }

  scoreValue = 0;

  updateScoreDisplay();
  console.log('You didn\'t guess in time!');
  initializeNewWord();
}

function updateScoreDisplay() {
  score.innerText = `Score: ${scoreValue}`;
  highScore.innerText = `High Score: ${highScoreValue}`;
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

initializeNewWord()

const letterButtons = document.getElementsByClassName('letter-button');

for (let i = 0; i < letterButtons.length; ++i) {
  letterButtons[i].addEventListener('click', (event) => {
    guessLetter(event.target.dataset.letter);
  });
}
