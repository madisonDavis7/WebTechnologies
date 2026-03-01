//vars

var imgNames = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10", "img11", "img12"];
var imgPaths = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg"];

var blankImg = "images/blank.jpg";
var actualImgs = [];
var firstFlippedIndex = null;
var secondFlippedIndex = null;
var matchedCards = [];
var isBoardLocked = false;
var attempts = 0;
var totalMatches = 0;

//create the randomized array of images
function createRandomArray() {
    actualImgs = imgPaths.concat(imgPaths);

    for (var i = actualImgs.length - 1; i > 0; i--) {
        var randomNum = Math.floor(Math.random() * (i + 1));
        var temp = actualImgs[i];
        actualImgs[i] = actualImgs[randomNum];
        actualImgs[randomNum] = temp;
    }
}

function getStoredPlayerInfo() {
    var rawPlayerInfo = localStorage.getItem("playerInfo");

    if (!rawPlayerInfo) {
        return null;
    }

    try {
        return JSON.parse(rawPlayerInfo);
    } catch (error) {
        return null;
    }
}

function savePlayerInfo(playerInfo) {
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
}

function saveAttemptsToPlayerInfo() {
    var playerInfo = getStoredPlayerInfo();

    if (!playerInfo) {
        return;
    }

    playerInfo.attempts = attempts;
    savePlayerInfo(playerInfo);
}

function updateAttemptDisplay() {
    var attemptCountElement = document.getElementById("attemptCount");

    if (attemptCountElement) {
        attemptCountElement.textContent = "Attempts: " + attempts;
    }
}

//print out blank array
function printBlankBoard() {
    createRandomArray();
    firstFlippedIndex = null;
    secondFlippedIndex = null;
    isBoardLocked = false;
    matchedCards = [];
    totalMatches = 0;

    var playerInfo = getStoredPlayerInfo();
    attempts = playerInfo && !isNaN(Number(playerInfo.attempts)) ? Number(playerInfo.attempts) : 0;
    updateAttemptDisplay();

    for (var i = 0; i < imgNames.length; i++) {
        var card = document.getElementById(imgNames[i]);
        card.src = blankImg;
        card.classList.remove("is-flipping");
    }
}

//flip the card
function animateCardFlip(card, newImgPath) {
    card.classList.remove("is-flipping");
    void card.offsetWidth;
    card.classList.add("is-flipping");

    setTimeout(function() {
        card.src = newImgPath;
    }, 175);
}

function flip(number) {
    if (isBoardLocked) {
        return;
    }

    if (matchedCards[number]) {
        return;
    }

    if (firstFlippedIndex === number) {
        return;
    }

    var card = document.getElementById(imgNames[number]);
    animateCardFlip(card, actualImgs[number]);

    if (firstFlippedIndex === null) {
        firstFlippedIndex = number;
        return;
    }

    secondFlippedIndex = number;
    isBoardLocked = true;
    attempts = attempts + 1;
    updateAttemptDisplay();
    saveAttemptsToPlayerInfo();

    if (actualImgs[firstFlippedIndex] === actualImgs[secondFlippedIndex]) {
        matchedCards[firstFlippedIndex] = true;
        matchedCards[secondFlippedIndex] = true;
        totalMatches = totalMatches + 1;
        firstFlippedIndex = null;
        secondFlippedIndex = null;
        isBoardLocked = false;

        if (totalMatches === imgPaths.length) {
            saveAttemptsToPlayerInfo();

            setTimeout(function() {
                window.location.href = "results.html";
            }, 500);
        }

        return;
    }

    var firstCard = document.getElementById(imgNames[firstFlippedIndex]);
    var secondCard = document.getElementById(imgNames[secondFlippedIndex]);

    setTimeout(function() {
        animateCardFlip(firstCard, blankImg);
        animateCardFlip(secondCard, blankImg);
        firstFlippedIndex = null;
        secondFlippedIndex = null;
        isBoardLocked = false;
    }, 3000);
}

function startGame(event) {
    if (event) {
        event.preventDefault();
    }

    var firstNameInput = document.getElementById("firstName");
    var lastNameInput = document.getElementById("lastName");
    var ageInput = document.getElementById("age");
    var errorElement = document.getElementById("setupError");

    if (!firstNameInput || !lastNameInput || !ageInput) {
        return;
    }

    var firstName = firstNameInput.value.trim();
    var lastName = lastNameInput.value.trim();
    var ageValue = ageInput.value.trim();

    if (!firstName || !lastName || !ageValue) {
        if (errorElement) {
            errorElement.textContent = "Please complete all fields.";
        }
        return;
    }

    var age = Number(ageValue);

    if (isNaN(age)) {
        if (errorElement) {
            errorElement.textContent = "Age must be a valid number.";
        }
        return;
    }

    var playerInfo = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        attempts: 0
    };

    savePlayerInfo(playerInfo);
    window.location.href = "index.html";
}

function renderFinalResults() {
    var playerInfo = getStoredPlayerInfo();
    var resultsName = document.getElementById("resultsName");
    var resultsAge = document.getElementById("resultsAge");
    var resultsAttempts = document.getElementById("resultsAttempts");

    if (!resultsName || !resultsAge || !resultsAttempts) {
        return;
    }

    if (!playerInfo) {
        resultsName.textContent = "Player: Unknown";
        resultsAge.textContent = "Age: Unknown";
        resultsAttempts.textContent = "Attempts: 0";
        return;
    }

    resultsName.textContent = "Player: " + playerInfo.firstName + " " + playerInfo.lastName;
    resultsAge.textContent = "Age: " + playerInfo.age;
    resultsAttempts.textContent = "Attempts: " + playerInfo.attempts;
}

document.addEventListener("DOMContentLoaded", function() {
    var playerSetupForm = document.getElementById("playerSetupForm");
    var resultsContainer = document.getElementById("resultsContainer");

    if (playerSetupForm) {
        playerSetupForm.addEventListener("submit", startGame);
    }

    if (resultsContainer) {
        renderFinalResults();
    }
});