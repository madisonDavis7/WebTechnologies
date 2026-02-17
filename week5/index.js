const scenes = {
	start: document.getElementById("start-page"),
	scene1: document.getElementById("scene-1"),
	castle: document.getElementById("scene-castle"),
	castleInside: document.getElementById("scene-castle-inside"),
	castleLibrary: document.getElementById("scene-castle-library"),	
	castleKitchen: document.getElementById("scene-castle-kitchen"),
	lighthouse: document.getElementById("scene-lighthouse"),
	endBook: document.getElementById("scene-end-book"),
	endChair: document.getElementById("scene-end-chair"),
	endSoup: document.getElementById("scene-end-soup"),
	endLetters: document.getElementById("scene-end-letters"),
};

const startBtn = document.getElementById("start-btn");
const scene1Input = document.getElementById("scene1-input");
const scene1Btn = document.getElementById("scene1-btn");
const scene1Error = document.getElementById("scene1-error");

const castleInput = document.getElementById("castle-input");
const castleBtn = document.getElementById("castle-btn");
const castleError = document.getElementById("castle-error");

const castleInsideInput = document.getElementById("castleInside-input");
const castleInsideBtn = document.getElementById("castleInside-btn");
const castleInsideError = document.getElementById("castleInside-error");

const castleLibraryInput = document.getElementById("castleLibrary-input");
const castleLibraryBtn = document.getElementById("castleLibrary-btn");
const castleLibraryError = document.getElementById("castleLibrary-error");
	
const castleKitchenInput = document.getElementById("castleKitchen-input");
const castleKitchenBtn = document.getElementById("castleKitchen-btn");
const castleKitchenError = document.getElementById("castleKitchen-error");

const lighthouseInput = document.getElementById("lighthouse-input");
const lighthouseBtn = document.getElementById("lighthouse-btn");
const lighthouseError = document.getElementById("lighthouse-error");

const endTitleBook = document.getElementById("end-title-book");
const endTextBook = document.getElementById("end-text-book");
const endTitleChair = document.getElementById("end-title-chair");
const endTextChair = document.getElementById("end-text-chair");
const endTitleSoup = document.getElementById("end-title-soup");
const endTextSoup = document.getElementById("end-text-soup");
const endTitleLetters = document.getElementById("end-title-letters");
const endTextLetters = document.getElementById("end-text-letters");
const restartBtnBook = document.getElementById("restart-btn-book");
const restartBtnChair = document.getElementById("restart-btn-chair");
const restartBtnSoup = document.getElementById("restart-btn-soup");
const restartBtnLetters = document.getElementById("restart-btn-letters");

const normalize = (value) => value.trim().toLowerCase();

const showScene = (sceneKey) => {
	Object.values(scenes).forEach((scene) => scene.classList.add("hidden"));
	scenes[sceneKey].classList.remove("hidden");
};

//ending scenes
const showEndingBook = (title, text) => {
	endTitleBook.textContent = title;
	endTextBook.textContent = text;
	showScene("endBook");
};

const showEndingChair = (title, text) => {
	endTitleChair.textContent = title;
	endTextChair.textContent = text;
	showScene("endChair");
};

const showEndingSoup = (title, text) => {
	endTitleSoup.textContent = title;
	endTextSoup.textContent = text;
	showScene("endSoup");
};

const showEndingLetters = (title, text) => {
	endTitleLetters.textContent = title;
	endTextLetters.textContent = text;
	showScene("endLetters");
};


//scene handlers with logic
const handleScene1 = () => {
	const choice = normalize(scene1Input.value);
	scene1Error.textContent = "";

	switch (choice) {
		case "castle":
			showScene("castle");
			castleInput.focus();
			break;
		case "lighthouse":
			showScene("lighthouse");
			lighthouseInput.focus();
			break;
		default:
			scene1Error.textContent = "Please type castle or lighthouse.";
	}
};

const handleCastle = () => {
	const choice = normalize(castleInput.value);
	castleError.textContent = "";

	if (choice === "enter") {
		showScene("castleInside");
		castleInsideInput.focus();
	} else if (choice === "leave") {
		showEndingBook(
			"The Safe Retreat",
			"You turn back and get lost in the forest..."
		);
	} else {
		castleError.textContent = "Please type enter or leave.";
	}
};

const handleCastleLibrary = () => {
	const choice = normalize(castleLibraryInput.value);
	castleLibraryError.textContent = "";

	switch (choice) {
		case "book":
			showEndingBook(
				"The Ancient Tome",
				"You find an ancient tome in the library and read about the castle's secrets."
			);
			break;
		case "chair":
			showEndingChair(
				"The Comfy Chair",
				"You sit in the chair and read a book about the castle's history."
			);
			break;
		default:
			castleLibraryError.textContent = "Please type book or chair.";
			return "Invalid input";
	}
};

const handleCastleInside = () => {
	const choice = normalize(castleInsideInput.value);
	castleInsideError.textContent = "";

	if (choice === "library") {
		showScene("castleLibrary");
		castleLibraryInput.focus();
		return;
	}

	if (choice === "kitchen") {
		showScene("castleKitchen");
		castleKitchenInput.focus();
		return;
	}

	castleInsideError.textContent = "Please type library or kitchen.";
};

const handleCastleKitchen = () => {
	const choice = normalize(castleKitchenInput.value);
	castleKitchenError.textContent = "";

	if (choice === "stove") {
		showEndingSoup(
			"The Warm Stove",
			"You find a warm stove in the kitchen and make a bowl of soup."
		);
		return;
	}

	if (choice === "table") {
		showEndingLetters(
			"The Hidden Letters",
			"You find a pile of old letters in the kitchen and read about the castle's history."
		);
		return;
	}

	castleKitchenError.textContent = "Please type stove or table.";
};

/*
const handleLighthouse = () => {
	const choice = normalize(lighthouseInput.value);
	lighthouseError.textContent = "";

	if (choice === "climb") {
		showEnding(
			"The Beacon",
			"At the top you light the beacon and signal a distant ship that becomes your ride home."
		);
	} else if (choice === "inspect") {
		showEnding(
			"The Hidden Key",
			"You discover a rusted key under a loose stone, hinting at mysteries below the cliff."
		);
	} else {
		lighthouseError.textContent = "Please type climb or inspect.";
	}
};

*/

startBtn.addEventListener("click", () => {
	showScene("scene1");
	scene1Input.focus();
});

scene1Btn.addEventListener("click", handleScene1);
scene1Input.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleScene1();
	}
});

castleBtn.addEventListener("click", handleCastle);
castleInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleCastle();
	}
});

castleInsideBtn.addEventListener("click", handleCastleInside);
castleInsideInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleCastleInside();
	}
});

castleLibraryBtn.addEventListener("click", handleCastleLibrary);
castleLibraryInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleCastleLibrary();
	}
});

castleKitchenBtn.addEventListener("click", handleCastleKitchen);
castleKitchenInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleCastleKitchen();
	}
});
/*
lighthouseBtn.addEventListener("click", handleLighthouse);
lighthouseInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleLighthouse();
	}
});
*/
const resetGame = () => {
	scene1Input.value = "";
	castleInput.value = "";
	castleInsideInput.value = "";
	castleLibraryInput.value = "";
	castleKitchenInput.value = "";
	lighthouseInput.value = "";
	scene1Error.textContent = "";
	castleError.textContent = "";
	castleInsideError.textContent = "";
	castleLibraryError.textContent = "";
	castleKitchenError.textContent = "";
	lighthouseError.textContent = "";
	showScene("start");
};

restartBtnBook.addEventListener("click", resetGame);
restartBtnChair.addEventListener("click", resetGame);
restartBtnSoup.addEventListener("click", resetGame);
restartBtnLetters.addEventListener("click", resetGame);
