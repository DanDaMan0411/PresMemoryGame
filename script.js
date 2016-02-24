var presidntialCandidates = ["Bush",
							"Bush",
							"Carson",
							"Carson",
							"Trump",
							"Trump",
							"Cruz",
							"Cruz",
							"Rubio",
							"Rubio",
							"Kasich",
							"Kasich",
							"Clinton",
							"Clinton",
							"Sanders",
							"Sanders",
							]

boxList = ["r1c1", "r1c2", "r1c3", "r1c4",
		   "r2c1", "r2c2", "r2c3", "r2c4",
		   "r3c1", "r3c2", "r3c3", "r3c4",
		   "r4c1", "r4c2", "r4c3", "r4c4",
			]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function boxAssigner(){
	var presidentBoxes = {}
	for (i = 0; i < boxList.length; i++){
		var index = getRandomInt(0, presidntialCandidates.length - 1);
		presidentBoxes[boxList[i]] = presidntialCandidates[index];
		presidntialCandidates.splice(index, 1);
	}
	return presidentBoxes
}

boxes = boxAssigner();
turnNumber = 0;
matchesFound = 0;
candidatesTurned = [null, null];
boxesTurned = [null, null];

function resetBoxes(){
	firstImg = document.getElementById(boxesTurned[0]);
	secondImg = document.getElementById(boxesTurned[1]);	
	firstImg.src = "question.png";
	secondImg.src = "question.png";
	turnNumber = 0;
	candidatesTurned = [null, null];
	boxesTurned = [null, null];
}

fontSize = 50
direction = 1

function textAnimation(){
	var winText = document.getElementById("winText");
	winText.setAttribute("style", "font-size: " + String(fontSize) + "px;");
	fontSize += direction
	if (fontSize <= 50){
		direction *= -1
	}else if (fontSize >= 150){
		direction *= -1
	}
}

function startTimer(){
	time = document.getElementById("timerBox")
	var timeText = time.textContent.trim()
	var seconds = timeText.split(" ")
	seconds[1] = String(Number(seconds[1]) + 1)
	timeText = seconds[0] + " " + seconds[1]
	time.innerHTML = timeText
}

function resetGame(){
	//Stops the you won text from bouncing
	clearInterval(winText);
	
	//Timer goes back down to 0
	time.innerHTML = "Time: 0";
	timerOn = false;
	
	//Resets the number of matches
	matchesFound = 0;
	
	//Puts back the presidential candidates options that were deleted initially
	presidntialCandidates = ["Bush",
							"Bush",
							"Carson",
							"Carson",
							"Trump",
							"Trump",
							"Cruz",
							"Cruz",
							"Rubio",
							"Rubio",
							"Kasich",
							"Kasich",
							"Clinton",
							"Clinton",
							"Sanders",
							"Sanders",
							]
	//Scrambles the boxes
	boxes = boxAssigner();
	
	var winScreen = document.getElementById("winScreen")
	winScreen.setAttribute("style", "visibility: hidden;")
	
	var game = document.getElementById("gameContainer")
	game.setAttribute("style", "visibility: visible; height: 80%;")
	
	//Resets the boxes back to the question mark
	for (i = 0; i < boxList.length; i++){
		var boxImg = document.getElementById(boxList[i]);
		boxImg.setAttribute("style", "visibility: visible;")
		boxImg.setAttribute("src", "question.png")
		
	}
	
}

function gameWon(){
	var game = document.getElementById("gameContainer")
	//game.parentNode.removeChild(game);
	game.setAttribute("style", "visibility: hidden;height: 1px;")
	var winScreen = document.getElementById("winScreen")
	winScreen.setAttribute("style", "visibility: visible;")
	winText = setInterval(textAnimation, 10);
}

timerOn = false

function boxClick(clickedId){
	if (timerOn === false){
		timer = setInterval(startTimer, 1000);
		timerOn = true
	}
	var candidate = boxes[clickedId];
	candidatesTurned[turnNumber] = candidate;
	boxesTurned[turnNumber] = clickedId;
	turnNumber += 1;
	
	if (boxesTurned[0] !== boxesTurned[1]){	
		if (turnNumber < 3){
			//Switches the question mark for the presidential candidate
			var boxImg = document.getElementById(clickedId);
			boxImg.src = candidate + ".jpeg";
			if (turnNumber === 2){	
			
				//Checks to see if the two cards are the same
				if(candidatesTurned[0] === candidatesTurned[1]){
					
					//Removes the matched candidates
					var firstBox = document.getElementById(boxesTurned[0]);
					var secondBox = document.getElementById(boxesTurned[1]);
					
					firstBox.setAttribute("style", "visibility: hidden;")
					secondBox.setAttribute("style", "visibility: hidden;")
					
					
					turnNumber = 0;
					matchesFound += 1;
					if (matchesFound === 8){
						clearInterval(timer)
						gameWon();
					}
				//Puts the cards back to question marks if they aren't the same
				}else{
					setTimeout(function(){
						resetBoxes();
					}, 1000);
				}	
			}
		}
	}else if (turnNumber >= 3){
		resetBoxes();
	}
}

