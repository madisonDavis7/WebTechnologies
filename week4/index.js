
//button stuff

const startBtn = document.getElementById('start-btn');
const startPage = document.getElementById('start-page');
const secondPage = document.getElementById('second-page');
const castlePage = document.getElementById('castle-page');
const horsePage = document.getElementById('horse-page');
const forestPage = document.getElementById('forest-page');
const lighthousePage = document.getElementById('lighthouse-page');

const leftButton = document.getElementById('left-btn');
const rightButton = document.getElementById('right-btn');
const castleLeftButton = document.getElementById('castle-left-btn');
const horseLeftButton = document.getElementById('horse-left-btn');

let currentPage = 'second-page';

//ask user for name
let userName = prompt('What is your name, adventurer?');
console.log('Welcome, ' + userName + ', to your adventure!');

startBtn.addEventListener('click', function() {
    startPage.style.display = 'none';
    secondPage.style.display = 'block' //show stuffs
    console.log('Where would you like your adventure to begin, ' + userName + '?');
});

leftButton.addEventListener('click', function() {
    const currentButtonText = this.textContent;
    if (currentButtonText === 'Castle') {
        console.log('You chose the ' + currentButtonText);
        console.log('The castle looks pretty far, you will need a faster way to get there.');
        secondPage.style.display = 'none';
        castlePage.style.display = 'block';
        currentPage = 'castle-page';
    }
});

castleLeftButton.addEventListener('click', function() {
    console.log("You chose the white stallion, a noble steed sure to carry you far.")
    console.log("You come across a fork, you can either brave the forest or cross the river. Both lead to the castle eventually...")
    castlePage.style.display = 'none';
    horsePage.style.display = 'block';
    currentPage = 'horse-page';
});

horseLeftButton.addEventListener('click', function() {
    horsePage.style.display = 'none';
    console.log("You chose the forest path, the trees are thick but you feel safe under their cover. It starts to snow as you gaze upon your new home.")
    forestPage.style.display = 'block';
    currentPage = 'forest-page';
});

rightButton.addEventListener('click', function() {
    const currentButtonText = this.textContent;
    if (currentButtonText === 'Lighthouse') {
        console.log('You chose the ' + currentButtonText);
        console.log('It does not look too far away...but sure will be a lonely journey');
        secondPage.style.display = 'none';
        lighthousePage.style.display = 'block';
        currentPage = 'lighthouse-page';
    }
});


