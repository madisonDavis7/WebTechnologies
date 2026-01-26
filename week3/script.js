// week3/script.js

//gets users input for their name
let userName = prompt("Please enter your name:");

//greet user
console.log("Hi " + userName + " enjoy my site :)");

//prints fav artists to console
console.log("Three of my favorite artists are Halsey, Ashniko, and the Weeknd. Halsey is one of the few artists I have been listening to since middle school, I've gotten to watch her put out some of the biggest hits in music. Ashniko is someone who puts out strange music but doesn't let anyone tell her what is too weird. I think the Weeknd just makes music most people can enjoy.");

//gets the button by their id and prints out to console when clicked 
document.getElementById("fav-website").onclick = function() {
    console.log("My favorite websites are Pinterest, TokiDoki, and the NASA website.");
};
document.getElementById("games").onclick = function() { 
    console.log("Three of my favorite games are Stardew Valley, Overwatch, and Catan.");
};
