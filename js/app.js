// console.log("DOM loaded");
let openCards = [];
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
const closeBtn = document.getElementsByClassName("close-banner")[0];
const restartBtn = document.getElementsByClassName("restart")[1];
let card_array = [
	"fa-diamond",
	"fa-heart",
	"fa-paw",
	"fa-bolt",
	"fa-bug",
	"fa-cloud",
	"fa-star-o",
	"fa-tree"
];
card_array = [...card_array] 
const cards = card_array.concat(card_array)
let matchedPairs = 0;

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
	removeBanner();
	const deck = document.querySelector(".deck");
	let cardHTML = shuffle(cards).map(function(card) {
		return makeCard(card);
	});
	let moves = 0;
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

function dealCards() {
	const allCards = document.querySelectorAll(".card");
	moves = 0;
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
						matchedPairs += 1;
						console.log("checking for winner")
						winner();
					} else {
						// if cards don't match, flip cards back over
						setTimeout(function() {
							openCards.forEach(function(card) {
								card.classList.remove("open", "show");
							});
							openCards = [];
						}, 100);
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
	if (numMoves > 14 && numMoves < 25) {
		totalStars = 2;
		star1.style.display = "none";
	} else if (numMoves >= 25) {
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
	removeBanner();
})

function winner() {
	if (matchedPairs == 8) {
		finalBanner();
		stopTime();
		matchedPairs = 0;
	}
}

function finalBanner() {
	console.log("winner!")
	stopTime();
	const finalTime = document.getElementsByClassName("final-time")[0];
	const finalMoves = document.getElementsByClassName("final-moves")[0];
	const finalStars = document.getElementsByClassName("final-stars")[0];
	finalTime.innerHTML = `Your Time: ${clock.innerHTML}`
	finalMoves.innerHTML = `Total Moves: ${moves + 1}`
	finalStars.innerHTML = `Star Score: ${totalStars}`
	addBanner();
}

// closes the winner's banner
function removeBanner() {
	console.log("remove banner")
	const banner = document.getElementsByClassName("winner-flag")[0];
	banner.classList.add("close");
}

function addBanner() {
	console.log("remove banner")
	const banner = document.getElementsByClassName("winner-flag")[0];
	banner.classList.remove("close");
}


closeBtn.addEventListener("click", () => {
	removeBanner();
})



//restart button on banner restarts game
restartBtn.addEventListener("click", () => {
	stopTime();
	startGame();
	removeBanner();
})

