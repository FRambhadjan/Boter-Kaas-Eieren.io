const cells = document.querySelectorAll(".cell"); //maakt de html class .cell een variabele in javascript (allemaal).
const statusText = document.querySelector("#statusText"); //maakt de html class #statusText een variabele in javascript.
const restartButton = document.querySelector("#restartButton"); //maakt de html class #restartButton een variabele in javascript.
const winConditions =
	[ //als je één van deze condities voldoet heb je gewonnen.
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
let options = ["", "", "", "", "", "", "", "", ""]; //dit zijn de lege vakjes en als er X of O in wordt geschreven dan wordt er een vakje gevuld.
let currentPlayer = "X"; //het spel begint met X
let running = false; //de game is niet begonnen
startGame(); //vanaf hier begint de game
function startGame() {	//hier worden die vakjes clickbaar gemaakt en worden andere functies uitgevoerd als er wordt geklikt op een vakje of de herstart knop.
	cells.forEach(cell => cell.addEventListener("click", cellClicked)); //elke cell wordt klikbaar.
	restartButton.addEventListener("click", restartGame); //button voor restart game
	statusText.textContent = `${currentPlayer} is playing`; //laat weten welke speler aan de beurt is.
	running = true; //de game luistert nu naar de clicks.
}
function cellClicked() {	//hier worden acties uitgevoerd als je een vakje aanclicked.
	const cellIndex = this.getAttribute("cellIndex"); //get attribute pakt de 9 vakjes en laat zien dat het een index is in de
	if (options[cellIndex] != "" || !running) { //als er een nieuwe lege cell gelkikt wordt dan gaat hij 2 functies uitvoeren en running
		return;
	}
	updateCell(this, cellIndex);
	checkWinner();
}
function updateCell(cell, index) {
	options[index] = currentPlayer; //dit zorgt ervoor dat de keuze tussen x en o juist worden gebruikt. Het ligt eraan welke speler aan de beurt is en dan gaat de script kijken of het x of o is.
	cell.textContent = currentPlayer;  //zet x of o in de aangeklikte vakjes.
}
function changePlayer() {
	currentPlayer = (currentPlayer == "X") ? "O" : "X"; //dit zorgt ervoor dat de spelers beurten hebben en na elke geklikte vakje gaat x naa o en o naar x. tussen haakjes vertelt het wat de condition is. Na de vraagteken in de condition true en na de : is het false. ALs de conition hier true is wordt X = O maar als de condition niet true is dus na de : dan blijft het hetzelfde.
	statusText.textContent = `${currentPlayer} is playing`; //update wie aan de beurt is in de html text.
}
function checkWinner() {
	let roundWon = false; //laat weten dat er nog niet is gewonnen
	for (let i = 0; i < winConditions.length; i++) { //dit gaat 8 keer loopen.
		const condition = winConditions[i];
		const cellA = options[condition[0]] //dit zijn de index vakjes: 0, 1, 2, 3 en 6.
		const cellB = options[condition[1]] //dit zijn de index vakjes: 1, 3, 4, 5 en 7.
		const cellC = options[condition[2]] //dit zijn de index vakjes: 2, 5, 6, 7 en 8.

		if (cellA == "" || cellB == "" || cellC == "") {
			continue; //de game stopt niet als deze if statement waar is.
		}
		if (cellA == cellB && cellB == cellC) {
			roundWon = true;
			break; //je hebt gewonnen als deze if statement waar is.
		}
	}
	if (roundWon == true) {
		statusText.textContent = `${currentPlayer} wins!` //als de game ziet dat je hebt gewonnen dan gaat de computer de text veranderen naar "currentPlayer wins!"
		running = false; //vakjes clicken doet niks meer
	}
	else if (!options.includes("")) //als er geen klikbare vakjes meer zijn maar checkWinner function heeft nog niemand een winner gemaakt dan maakt de computer het een draw of gelijkspel. Includes vraagt zich af of de gegeven conditie true of false is.
	{
		statusText.textContent = `Draw` //verandert de text naar draw (gelijkspel)
	}
	else {
		changePlayer(); //als er niks overeenkomt met de bovenstaande if's dan wordt deze else statement uitgevoerd en is de volgende speler aan de beurt.
	}
}

function restartGame() {	//geeft de beurt aan X en maakt alle vakjes leeg en update de html text wie aan de beurt is.
	currentPlayer = "X"
	options = ["", "", "", "", "", "", "", "", ""]; //maakt elke vakje leeg.
	statusText.textContent = `${currentPlayer} is playing`; //zorgt ervoor dat de text reset.
	cells.forEach(cell => cell.textContent = ""); // maakt elke cell leeg en weer klikbaar.
	running = true; //als de game was beëindigd wordt de game weer speelbaar gemaakt door running true te zetten.
}
