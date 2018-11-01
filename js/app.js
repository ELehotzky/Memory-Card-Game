console.log("DOM loaded");
let openCards = [];
let moves = 0;
const moveCounter = document.querySelector(".moves");
const restart = document.getElementsByClassName("fa-repeat")[0];
const cards = [
	"fa-diamond", "fa-diamond",
	"fa-paper-plane-o", "fa-paper-plane-o",
	"fa-anchor", "fa-anchor",
	"fa-bolt", "fa-bolt",
	"fa-cube", "fa-cube",
	"fa-leaf", "fa-leaf",
	"fa-bomb", "fa-bomb",
	"fa-bicycle", "fa-bicycle"
];

function makeCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() {
	const deck = document.querySelector(".deck");
	let cardHTML = shuffle(cards).map(function(card) {
		return makeCard(card);
	});
	moves = 0;
	moveCounter.innerText = moves;

	deck.innerHTML = cardHTML.join("");
}

startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const allCards = document.querySelectorAll(".card");

allCards.forEach(function(card) {
	card.addEventListener("click", () => {
		// only allows two cards to be opened at a time
		if (openCards.length < 2) {
			if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")) {
			openCards.push(card);
			card.classList.add("open", "show");
			if (openCards.length == 2) {
				// check for match, if matches leave shown
				if (openCards[0].dataset.card == openCards[1].dataset.card) {
					openCards[0].classList.add("open", "show", "match");
					openCards[1].classList.add("open", "show", "match");
					openCards = [];
				} else {
					// if cards don't match, flip cards back over
					setTimeout(function() {
						openCards.forEach(function(card) {
							card.classList.remove("open", "show");
						});
						openCards = [];
					}, 1000);
				}
				moves += 1;
				moveCounter.innerText = moves;
			}
		}}
	});
});

//restart button restarts game
restart.addEventListener("click", () => {
	startGame();
})