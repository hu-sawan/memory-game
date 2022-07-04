document.querySelector(`.splash span`).onclick = () => {
	let userName = prompt("Please enter your name");
	
	if (userName == null || userName == "") {
		document.querySelector(`.name span`).innerHTML = "Unknown";
	} else {
		document.querySelector(`.name span`).innerHTML = userName;
	}
	
	document.querySelector(`.splash`).remove();
}

let duration = 1000;

let blocksContainer = document.querySelector(`.game-blocks`);

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];


shuffle(orderRange);


// add order in css
blocks.forEach((b, i) => {
	b.style.order = orderRange[i];
	
	// Add click event
	b.addEventListener("click", function () {
		flipBlock(b);
	});
});


// flip function 
function flipBlock(selectedBox) {
	// Add flipped class
	selectedBox.classList.add("is-flipped");
	
	// filtering flipped cards
	let flippedCards = blocks.filter(card => card.classList.contains("is-flipped"));
	
	// if there is two selected cards
	if (flippedCards.length === 2) {
		// stop clicking
		noClick();
		
		// check matching cards
		checkMatch(flippedCards[0], flippedCards[1]);
	}
}

// stop clicking
function noClick() {
	blocksContainer.classList.add("no-click");
	
	setTimeout(() => {
		// Allow Clicking
		blocksContainer.classList.remove("no-click");
	}, duration)
}

// checking cards function 
function checkMatch(firstCard, secondCard) {

	let triesElement = document.querySelector(`.tries span`);
	
	if (firstCard.dataset.animal === secondCard.dataset.animal) {
		firstCard.classList.remove("is-flipped");
		secondCard.classList.remove("is-flipped");
		
		firstCard.classList.add("has-match");
		secondCard.classList.add("has-match");
		
		document.getElementById(`success`).play();
	} else {
		triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
		
		setTimeout(() => {
			// Allow Clicking
			firstCard.classList.remove("is-flipped");
			secondCard.classList.remove("is-flipped");
		}, duration)
		
		document.getElementById(`fail`).play();
	}
}

// shuffle function 
function shuffle(array) {
	// Settings Vars
	let current = array.length,
	temp,
	random;
	
	while (current > 0) {
		// getting random num
		random = Math.floor(Math.random() * current);
		
		// decrement length
		current--;
		
		// [1] Save current element in stash
		temp = array[current];
		
		// [2] current element = random element 
		array[current] = array[random]
		
		// [3] random element = get element from stash
		array[random] = temp;
	}
	
	return array;
}