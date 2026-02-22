//vars

var imgNames = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10", "img11", "img12"];
var imgPaths = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg"];

var blankImg = "images/blank.jpg";
var actualImgs = [];

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

//print out blank array
function printBlankBoard() {
    createRandomArray();

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
    var card = document.getElementById(imgNames[number]);
    animateCardFlip(card, actualImgs[number]);
}