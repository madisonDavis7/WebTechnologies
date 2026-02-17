const scenes = {
	start: document.getElementById("start-page"),
	scene1: document.getElementById("scene-1"),
	castle: document.getElementById("scene-castle"),
	castleInside: document.getElementById("scene-inside"), 
	castleLibrary: document.getElementById("scene-library"),
	castleKitchen: document.getElementById("scene-kitchen"),
	lighthouse: document.getElementById("scene-lighthouse"),
	beach: document.getElementById("scene-beach"),
	endBook: document.getElementById("scene-end-book"),
	endChair: document.getElementById("scene-end-chair"),
	endStove: document.getElementById("scene-end-stove"),  
	endTable: document.getElementById("scene-end-table"),
	endLeave: document.getElementById("scene-end-leave"),
	endRocks: document.getElementById("scene-end-rocks"),
	endBeach: document.getElementById("scene-end-beach"),
	endLighthouse: document.getElementById("scene-end-lighthouse"),
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
const castleInsideError = document.getElementById("castleInside-error")

const castleLibraryInput = document.getElementById("castleLibrary-input");
const castleLibraryBtn = document.getElementById("castleLibrary-btn");
const castleLibraryError = document.getElementById("castleLibrary-error")

const castleKitchenInput = document.getElementById("castleKitchen-input");
const castleKitchenBtn = document.getElementById("castleKitchen-btn");
const castleKitchenError = document.getElementById("castleKitchen-error")

const lighthouseInput = document.getElementById("lighthouse-input");
const lighthouseBtn = document.getElementById("lighthouse-btn");
const lighthouseError = document.getElementById("lighthouse-error");

const lighthouseBeachInput = document.getElementById("lighthouse-input-beach");
const lighthouseBeachBtn = document.getElementById("lighthouse-btn-beach");
const lighthouseBeachError = document.getElementById("lighthouse-error-beach");

const endTextBook = document.getElementById("end-text-book");
const endTextChair = document.getElementById("end-text-chair");
const endTextStove = document.getElementById("end-text-stove");
const endTextTable = document.getElementById("end-text-table");
const endTextLeave = document.getElementById("end-text-leave");
const endTextRocks = document.getElementById("end-text-rocks");
const endTextBeach = document.getElementById("end-text-beach");
const endTextLighthouse = document.getElementById("end-text-lighthouse");
	
const restartBtnBook = document.getElementById("restart-btn-book");
const restartBtnChair = document.getElementById("restart-btn-chair");
const restartBtnStove = document.getElementById("restart-btn-stove");
const restartBtnTable = document.getElementById("restart-btn-table");
const restartBtnLeave = document.getElementById("restart-btn-leave");
const restartBtnRocks = document.getElementById("restart-btn-rocks");
const restartBtnBeach = document.getElementById("restart-btn-beach");
const restartBtnLighthouse = document.getElementById("restart-btn-lighthouse");


const normalize = (value) => value.trim().toLowerCase();

const showScene = (sceneKey) => {
	Object.values(scenes).forEach((scene) => scene.classList.add("hidden"));
	scenes[sceneKey].classList.remove("hidden");
};

const showEndingBook = (text) => {
	endTextBook.textContent = text;
	showScene("endBook");
};

const showEndingChair = (text) => {
	endTextChair.textContent = text;
	showScene("endChair");
};

const showEndingStove = (text) => {
	endTextStove.textContent = text;
	showScene("endStove");
};

const showEndingTable = (text) => {
	endTextTable.textContent = text;
	showScene("endTable");
};

const showEndingLeave = (text) => {
	endTextLeave.textContent = text;
	showScene("endLeave");
};

const showEndingRocks = (text) => {
	endTextRocks.textContent = text;
	showScene("endRocks");
};

const showEndingBeach = (text) => {
	endTextBeach.textContent = text;
	showScene("endBeach");
};

const showEndingLighthouse = (text) => {
	endTextLighthouse.textContent = text;
	showScene("endLighthouse");
};

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
			return "Invalid Text";
	}
};

const handleCastle = () => {
	const choice = normalize(castleInput.value);
	castleError.textContent = "";

	switch (choice) {
		case "enter":
			showScene("castleInside");  
			castleInsideInput.focus();  
			break;
		case "leave":
			showEndingLeave(
				"You decide to turn back and get lost in the forest..."
			);
			break;
		default:
			castleError.textContent = "Please type enter or leave.";
			return "Invalid Text";
	}
};

const handleCastleInside = () => {
	const choice = normalize(castleInsideInput.value);
	castleInsideError.textContent = "";

	switch (choice) {
		case "library":
			showScene("castleLibrary");  
			castleLibraryInput.focus();  
			break;
		case "kitchen":
			showScene("castleKitchen");
			castleKitchenInput.focus();
			break;
		default:
			castleInsideError.textContent = "Please type library or kitchen.";
			return "Invalid Text";
	}
};

const handleCastleLibrary = () => {
	const choice = normalize(castleLibraryInput.value);
	castleLibraryError.textContent = "";

	if (choice === "book") {
		showEndingBook(
			"You open the book and begin reading, losing track of time..."
		);
	} else if (choice === "chair") {
		showEndingChair(
			"You sit down for a break, slowly you drift off into sleep..."
		);
	} else {
		castleLibraryError.textContent = "Please type book or chair.";
		return "Invalid Text";
	}
};

const handleCastleKitchen = () => {
	const choice = normalize(castleKitchenInput.value);
	castleKitchenError.textContent = "";

	if (choice === "stove") {
		showEndingStove(
			"You decide to get a taste of the soup for yourself."
		);
	} else if (choice === "table") {
		showEndingTable(
			"You decide to go take a look"
		);
	} else {
		castleKitchenError.textContent = "Please type stove or table.";
		return "Invalid Text";
	}
};

const handleLighthouse = () => {
	const choice = normalize(lighthouseInput.value);
	lighthouseError.textContent = "";

	switch (choice) {
		case "rocks":
			showEndingRocks(
				"You decide to go explore the rocks and get swept away to sea..."
			);
			break;
		case "sand":
				showScene("beach");
				lighthouseBeachInput.focus();
			break;
		default:
			lighthouseError.textContent = "Please type rocks or sand.";
			return "Invalid Text";
	}
};

const handleLighthouseBeach = () => {
	const choice = normalize(lighthouseBeachInput.value);
	lighthouseBeachError.textContent = "";

	if (choice === "beach") {
		showEndingBeach(
			"You relax on the warm sand as the sun dips below the horizon."
		);
	} else if (choice === "lighthouse") {
		showEndingLighthouse(
			"You head to the distant lighthouse and find refuge from the sun."
		);
	} else {
		lighthouseBeachError.textContent = "Please type beach or lighthouse.";
		return "Invalid Text";
	}
};


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


lighthouseBtn.addEventListener("click", handleLighthouse);
lighthouseInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleLighthouse();
	}
});

lighthouseBeachBtn.addEventListener("click", handleLighthouseBeach);
lighthouseBeachInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleLighthouseBeach();
	}
});


const restartGame = () => {
	//clear all text inputs.
	[
		scene1Input,
		castleInput,
		castleInsideInput,
		castleLibraryInput,
		castleKitchenInput,
		lighthouseInput,
		lighthouseBeachInput,
	].forEach((input) => {
		input.value = "";
	});

	//clear inline error messages.
	[
		scene1Error,
		castleError,
		castleInsideError,
		castleLibraryError,
		castleKitchenError,
		lighthouseError,
		lighthouseBeachError,
	].forEach((error) => {
		error.textContent = "";
	});

	//clear ending text for all outcomes.
	[
		endTextBook,
		endTextChair,
		endTextStove,
		endTextTable,
		endTextRocks,
		endTextLeave,
		endTextBeach,
		endTextLighthouse,
	].forEach((endText) => {
		endText.textContent = "";
	});
	showScene("start");
};

restartBtnBook.addEventListener("click", restartGame);
restartBtnChair.addEventListener("click", restartGame);
restartBtnStove.addEventListener("click", restartGame);
restartBtnTable.addEventListener("click", restartGame);
restartBtnLeave.addEventListener("click", restartGame);
restartBtnRocks.addEventListener("click", restartGame);
restartBtnLighthouse.addEventListener("click", restartGame);
restartBtnBeach.addEventListener("click", restartGame);

//👻