console.log("DOM loaded");
let openCards = [];
let moves = 0;
let time = 0;
let clockStart = false;
const clock = document.querySelector(".clock");
let gameClock;
let totalStars = 3;
const stars = document.querySelector(".stars");
let star1 = stars.firstElementChild;
let star2 = stars.lastElementChild;
const deck = document.querySelector(".deck");
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
	time = 0;
	totalStars = 3;
	star1.style.display = "";
	star2.style.display = "";
	moveCounter.innerText = moves;
	showTime();
	deck.innerHTML = cardHTML.join("");
	dealCards();
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

// not sure why the game only works if this var is NOT listed at the top
const allCards = document.querySelectorAll(".card");

function dealCards() {
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
				checkScore();
			}
		}}
	});
});
}

// increase time after game has started
deck.addEventListener("click", event => {
	const clicked = event.target;
		if (!clockStart) {
			timer();
			clockStart = true;
		}
})

function timer() {
	time = 0;
	gameClock = setInterval(() => {
		time++;
		showTime();
	}, 1000)
}

// show current time
function showTime() {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}

function stopTime() {
	clockStart = false;
	clearInterval(gameClock);
}

// remove stars if score exceeds certain number of moves
function checkScore() {
	let numMoves = parseInt(moveCounter.innerText);
	console.log(numMoves)
	if (numMoves > 14 && numMoves < 25) {
		totalStars = 2;
		star1.style.display = "none";
	} else if (numMoves > 25) {
		totalStars = 1;
		star1.style.display = "none";
		star2.style.display = "none";
	} else {
		totalStars = 3;
		star1.style.display = "";
		star2.style.display = "";
	}
}

//restart button restarts game
restart.addEventListener("click", () => {
	stopTime();
	startGame();
})