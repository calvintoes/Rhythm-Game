"use strict";
const app = new PIXI.Application(800,600);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

let stage;

//game variables
let startScene, menuScene, gameScene, gameOverScene;
let scoreLabel;
let gameOverScoreLabel;
let difficulty;
let song;
let errorSound;
let gameOverSound;
let mistakes = 5;
let score = 0;

let redNotes = [];
let greenNotes = [];
let blueNotes = [];

let streak = 0;
let streakLabel;
let redCircle, greenCircle, blueCircle;
let successRed, successBlue, successGreen;

let letterF = keyboard(70),
		letterG = keyboard(71),
		letterH = keyboard(72);
let timer = 0;
let paused = true;
setup();

function setup() {
	stage = app.stage;
	// #1 - Create the `start` scene
    startScene = new PIXI.Container();
    stage.addChild(startScene);

	// #2 - Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

	// #3 - Create the `gameOver` scene and make it invisible
		gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

	// #4 - Create labels for all 3 scenes
    createVisualsForScene();

  // Load sounds
    /*hardSong = new Howl({
      src: ['']
    });

    mediumSong = new Howl({
      src;['']
    });

    easySong = new Howl({
      src:['']
    });

		*/
		song = new Howl({
			src: ['WhatIveDone.mp3']
		});
		errorSound = new Howl({
			src:['error_note.wav']
		});
		errorSound.volume(0.2);
		gameOverSound = new Howl({
			src:['game_over.wav']
		});
		gameOverSound.volume(0.7);

		//sucess markers
		successRed = new PIXI.Graphics();
		successRed.beginFill(0xFFFF33);
		successRed.drawCircle(250,555,40)
		successRed.endFill();
		successGreen = new PIXI.Graphics();
		successGreen.beginFill(0xFFFF33);
		successGreen.drawCircle(400,555,40);
		successGreen.endFill();
		successBlue	= new PIXI.Graphics();
		successBlue.beginFill(0xFFFF33);
		successBlue.drawCircle(550,555,40);
		successBlue.endFill();


    //Start update gameLoop------------------------------------------------------------>>
		app.ticker.add(() => {
			if (paused) return;

			timer += 1/60;

			if(Math.floor(timer) % 3 == 0){
				let rand = Math.floor(Math.random() * Math.floor(3));
				let rand2 = Math.floor(Math.random() * Math.floor(3));
				makeNotes(rand);
				makeNotes(rand2);
				timer += 1;

			}
		});
    app.ticker.add(gameLoop);
      function gameLoop(){
				if (paused) return;
				//keyboard events
				letterF.press = () =>{
					redCircle.beginFill(0xFF9C9C);
					redCircle.endFill();
					gameScene.addChild(redCircle);
					gameScene.removeChild(redCircle);

					if(hitRightNote("F")){
						gameScene.addChild(successRed);
						increaseScoreBy(100);
						increaseStreakBy(1);
					}
					else{
						resetStreak();
						checkMistakes();
					}
				};

				letterF.release = () =>{
					redCircle.beginFill(0xB20808);
					redCircle.endFill
					gameScene.addChild(redCircle);
					gameScene.removeChild(successRed);
				};

				letterG.press = () =>{
					greenCircle.beginFill(0x9CFF9C);
					greenCircle.endFill();
					gameScene.addChild(greenCircle);
					gameScene.removeChild(greenCircle);

					if(hitRightNote("G")){
						gameScene.addChild(successGreen);
						increaseScoreBy(100);
						increaseStreakBy(1);
					}
					else{
						resetStreak();
						checkMistakes();
					}
				};

				letterG.release = () =>{
					greenCircle.beginFill(0x08B208);
					greenCircle.endFill();
					gameScene.addChild(greenCircle);
					gameScene.removeChild(successGreen);
				};

				letterH.press = () =>{
					blueCircle.beginFill(0x9C9CFF);
					blueCircle.endFill();
					gameScene.addChild(blueCircle);
					gameScene.removeChild(blueCircle);

					if(hitRightNote("H")){
						gameScene.addChild(successBlue);
						increaseScoreBy(100);
						increaseStreakBy(1);
					}
					else{
						resetStreak();
						checkMistakes();
					}
				};

				letterH.release = () =>{
					blueCircle.beginFill(0x0808B2);
					blueCircle.endFill();
					gameScene.addChild(blueCircle);
					gameScene.removeChild(successBlue);
				};

        //move notes
          for (let r of redNotes){
						redNotes = redNotes.filter(r=>r.isAlive);
            r.move()
						if ((r.getY() > 580) && !(hitRightNote("F"))){
							resetStreak();
							checkMistakes();
						}
						if ((r.getY() > 580)){
							resetStreak();
							checkMistakes();
						}
          }
					for (let g of greenNotes ){
						greenNotes = greenNotes.filter(g=>g.isAlive);
            g.move()
						if ((g.getY() > 580) && !(hitRightNote("G"))){
							resetStreak();
							checkMistakes();
						}
						if ((g.getY() > 580) ){
							resetStreak();
							checkMistakes();
						}
          }
					for (let b of blueNotes){
						blueNotes = blueNotes.filter(b=>b.isAlive);
						b.move()
						if ((b.getY() > 580) && !(hitRightNote("H"))){
							resetStreak();
							checkMistakes();
						}
						if ((b.getY() > 580)){
							resetStreak();
							checkMistakes();
						}
          }

			//------------------------------------END GAME LOOP------------------------------->>
		}
}
function createVisualsForScene(){
	  let buttonStyle = new PIXI.TextStyle({
	    fill: 0xFFFFFF,
	    fontSize: 48,
	    fontFamily: "Arial"
	  });

	/*        -----------START SCENE-------------     */

		let banner = new PIXI.Graphics();
		banner.beginFill(0xC4FAFF);
		banner.drawRect(0,50,800,30);
		banner.endFill();
		startScene.addChild(banner);

	  let startLabel1 = new PIXI.Text("TEAR THE STAGE!");
	  startLabel1.style = new PIXI.TextStyle({
	    fill: 0xFFFFFF,
	    fontSize: 80,
	    fontFamily: "Arial"
	  });
	  startLabel1.x = 50;
	  startLabel1.y = 120;
	  startScene.addChild(startLabel1);


		let startLabel2 = new PIXI.Text("Join the band");
		startLabel2.style = new PIXI.TextStyle({
			fill: 0xFFFFFF,
			fontSize: 32,
			fontStyle: "italic",
			fontFamily: "Arial"
		});
		startLabel2.x = 300;
		startLabel2.y = 260;
		startScene.addChild(startLabel2);

		let startButton = new PIXI.Text("Play");
		startButton.style = buttonStyle;
		startButton.x = 350;
		startButton.y = sceneHeight - 150;
		startButton.interactive = true;
		startButton.buttonMode = true;
		startButton.on("pointerup", startGame);
		startButton.on("pointerover", e=>e.target.alpha = 0.7);
		startButton.on("pointerout", e=>e.currentTarget.alpha = 1.0);
		startScene.addChild(startButton);

		let instructionText = new PIXI.Text("Use 'F', 'G', 'H' to play");
		instructionText.style = new PIXI.TextStyle({
			fill:0xEFEFEF,
			fontSize: 30,
			fontFamily: "Arial"
		});
		instructionText.x = 250;
		instructionText.y = 350;
		startScene.addChild(instructionText);


		/*     ------------Game Scene-------------- 	*/
		let textStyle = new PIXI.TextStyle({
			fill: 0xFFFFFF,
			fontSize: 24,
			fontFamily: "Arial"
		});

		let numberStyle = new PIXI.TextStyle({
			fill: 0xFFFFFF,
			fontSize: 28,
			fontFamily: "Arial"
		});

		scoreLabel = new PIXI.Text();
		scoreLabel.style = numberStyle;
		scoreLabel.x = 30;
		scoreLabel.y = 200;
		gameScene.addChild(scoreLabel);
		increaseScoreBy(0);

		streakLabel = new PIXI.Text();
		streakLabel.style = numberStyle;
		streakLabel.x = 30;
		streakLabel.y = 300;
		gameScene.addChild(streakLabel);
		increaseStreakBy(0);

		let redLine = new PIXI.Graphics();
		redLine.beginFill(0xFF0000);
		redLine.drawRect(200,0,100,600);
		redLine.endFill();
		gameScene.addChild(redLine);

		redCircle = new PIXI.Graphics();
		redCircle.beginFill(0xB20808);
		redCircle.drawCircle(250,555,40);
		redCircle.endFill();
		gameScene.addChild(redCircle);


		let greenLine = new PIXI.Graphics();
		redLine.beginFill(0x00FF00);
		redLine.drawRect(350,0,100,600);
		redLine.endFill();
		gameScene.addChild(greenLine);

		greenCircle = new PIXI.Graphics();
		greenCircle.beginFill(0x08B208);
		greenCircle.drawCircle(400,555,40);
		redCircle.endFill();
		gameScene.addChild(greenCircle);

		let blueLine = new PIXI.Graphics();
		redLine.beginFill(0x0000FF);
		redLine.drawRect(500,0,100,600);
		redLine.endFill();
		gameScene.addChild(blueLine);

		blueCircle = new PIXI.Graphics();
		blueCircle.beginFill(0x0808B2);
		blueCircle.drawCircle(550,555,40);
		redCircle.endFill();
		gameScene.addChild(blueCircle);

		let lineBorder = new PIXI.Graphics();
		lineBorder.beginFill(0x727272);
		lineBorder.drawRect(180,500,440,10);
		lineBorder.endFill();
		gameScene.addChild(lineBorder);

		//-------------------------------------------------------


		// 			----------GAME OVER SCENE---------------  	>>

		let gameOverText = new PIXI.Text("Game over!");
		textStyle = new PIXI.TextStyle({
			fill: 0xFF0000,
			fontSize: 82,
			fontFamily: "Arial"
		});
		gameOverText.style = textStyle;
		gameOverText.x = 200;
		gameOverText.y = sceneHeight/2 - 100;
		gameOverScene.addChild(gameOverText);

		gameOverScoreLabel = new PIXI.Text();
    textStyle = new PIXI.TextStyle({
        fill:0xFFFFFF,
        fontSize: 28,
        fontFamily: "Futura",
        stroke: 0xFF0000,
        strokeThickness: 2
    });
    gameOverScoreLabel.style = textStyle;
    gameOverScoreLabel.x = 30;
    gameOverScoreLabel.y = 500;
    gameOverScene.addChild(gameOverScoreLabel);

		let playAgainButton = new PIXI.Text("Try Again?");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 500;
    playAgainButton.y = 490;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup",startGame); // startGame is a function reference
    playAgainButton.on('pointerover',e=>e.target.alpha = 0.5); // concise arrow function with no brackets
    playAgainButton.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    gameOverScene.addChild(playAgainButton);

		// 		-----------------------------------------------		>>

}

function increaseScoreBy(value){
	score += value;
	//change score text
	scoreLabel.text = `Score: ${score}`;
}

function resetStreak(){
	streak = 0;
	streakLabel.text = `Streak: ${streak}`;
}

function increaseStreakBy(value){
	streak += value;
	//change score text
	streakLabel.text = `Streak: ${streak}`;
}

function startGame(){
	startScene.visible = false;
  gameOverScene.visible = false;
  gameScene.visible = true;
	song.seek(2.8,song.play());
	score = 0;
	mistakes = 8;
	timer = 0;
	resetStreak();
	increaseScoreBy(0);
	paused = false;


}

function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function makeNotes(colorIdx){
	let red = new Note(40, 0x980000, 250, -40);
	let green = new Note(40, 0x009800, 400, -40);
	let blue = new Note(40, 0x000098, 550, -40);
	let noteColors = [red, green, blue];

	if (colorIdx == 0){
		redNotes.push(red);
	}
	if (colorIdx == 1){
		greenNotes.push(green);
	}
	if (colorIdx == 2) {
		blueNotes.push(blue);
	}

	gameScene.addChild(noteColors[colorIdx]);
	}



function hitRightNote(keypress){
	/*let redBounds = redCircle.getBounds();
	let greenBounds = greenCircle.getBounds();
	let blueBounds = blueCircle.getBounds();
	*/
	let redCircleCopy = new PIXI.Circle(250,555,40);
	let greenCircleCopy = new PIXI.Circle(400,555,40);
	let blueCircleCopy = new PIXI.Circle(550,555,40);

	if (keypress == "F"){
		if (redNotes != 0){
			let red = redNotes[0];
			if(redCircleCopy.contains(red.x, red.y)){
				red.isAlive = false;
				gameScene.removeChild(red);
				return true;
			}
			return false;
		}

	}

	if (keypress == "G"){
		if (greenNotes != 0){
			let green = greenNotes[0];
			if (greenCircleCopy.contains(green.x, green.y)){
				green.isAlive = false;
				gameScene.removeChild(green);
				return true;
			}
			return false;
		}

	}

	if (keypress == "H"){
		if (blueNotes != 0){
			let blue = blueNotes[0];
			if (blueCircleCopy.contains(blue.x, blue.y)){
				blue.isAlive = false;
				gameScene.removeChild(blue);
				return true;
			}
			return false;
		}
	}
}


function end(){
	paused = true;
	redNotes.forEach(r => gameScene.removeChild(r));
	redNotes = [];
	blueNotes.forEach(b => gameScene.removeChild(b));
	blueNotes = [];
	greenNotes.forEach(g => gameScene.removeChild(g));
	greenNotes = [];

	song.stop();
	gameOverSound.play();
	gameOverScoreLabel.text = `Your final score: ${score}`;

}

function checkMistakes(){
	if (mistakes != 0){
		errorSound.play();
		mistakes -= 1;
	}
	else{
		end();
		startScene.visible = false;
		gameScene.visible = false;
		gameOverScene.visible = true;

	}
}
