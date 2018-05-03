"use strict";
const app = new PIXI.Application(800,600);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

let stage;

//game variables
let startScene, gameScene, gameOverScene;
let scoreLabel;
let gameOverScoreLabel;
let mistakes = 5;
let score = 0;

let redNotes = [];
let greenNotes = [];
let blueNotes = [];

let streak = 0;
let streakLabel;
let redCircle, greenCircle, blueCircle;

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




    //Start update gameLoop------------------------------------------------------------>>
		app.ticker.add(() => {
			if (paused) return;

			timer += 1/60;

			if(Math.floor(timer) % 3 == 0){
				let rand = Math.floor(Math.random() * Math.floor(3));
				makeNotes(rand);
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
				};

				letterG.press = () =>{
					greenCircle.beginFill(0x9CFF9C);
					greenCircle.endFill();
					gameScene.addChild(greenCircle);
					gameScene.removeChild(greenCircle);

					if(hitRightNote("G")){
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
				};

				letterH.press = () =>{
					blueCircle.beginFill(0x9C9CFF);
					blueCircle.endFill();
					gameScene.addChild(blueCircle);
					gameScene.removeChild(blueCircle);

					if(hitRightNote("H")){
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
				};

        //move notes
          for (let r of redNotes){
						redNotes = redNotes.filter(r=>r.isAlive);
            r.move()
						if ((r.getY() > 589) && !(hitRightNote("F"))){
							checkMistakes();
						}
          }
					for (let g of greenNotes ){
						greenNotes = greenNotes.filter(g=>g.isAlive);
            g.move()
						if ((g.getY() > 589) && !(hitRightNote("G"))){
							checkMistakes();
						}
          }
					for (let b of blueNotes){
						blueNotes = blueNotes.filter(b=>b.isAlive);
						b.move()
						if ((b.getY() > 589) && !(hitRightNote("H"))){
							checkMistakes();
						}
          }

			//------------------------------------END GAME LOOP------------------------------->>
		}
}
function createVisualsForScene(){
	  let buttonStyle = new PIXI.TextStyle({
	    fill: 0x0000FF,
	    fontSize: 48,
	    fontFamily: "Arial"
	  });

	/*        -----------START SCENE-------------     */
	  let startLabel1 = new PIXI.Text("Tear The Stage!");
	  startLabel1.style = new PIXI.TextStyle({
	    fill: 0xFFFFFF,
	    fontSize: 96,
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
		startLabel2.y = 300;
		startScene.addChild(startLabel2);

		let startButton = new PIXI.Text("Play");
		startButton.style = buttonStyle;
		startButton.x = 350;
		startButton.y = sceneHeight - 150;
		startButton.interactive = true;
		startButton.buttonMode = true;
		startButton.on("pointerup", startGame); //startGame is a function ref
		startButton.on("pointerover", e=>e.target.alpha = 0.7);
		startButton.on("pointerout", e=>e.currentTarget.alpha = 1.0);
		startScene.addChild(startButton);


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

		//--------------------------------------------


		// 			----------GAME OVER SCENE---------------  	>>

		let gameOverText = new PIXI.Text("Game over!");
		textStyle = new PIXI.TextStyle({
			fill: 0xFF0000,
			fontSize: 58,
			fontFamily: "Arial"
		});
		gameOverText.style = textStyle;
		gameOverText.x = 280;
		gameOverText.y = sceneHeight/2 - 100;
		gameOverScene.addChild(gameOverText);

		gameOverScoreLabel = new PIXI.Text();
    textStyle = new PIXI.TextStyle({
        fill:0xFFFFFF,
        fontSize:36,
        fontFamily: "Futura",
        stroke: 0xFF0000,
        strokeThickness: 2
    });
    gameOverScoreLabel.style = textStyle;
    gameOverScoreLabel.x = 200;
    gameOverScoreLabel.y = sceneHeight/2 + 50;
    gameOverScene.addChild(gameOverScoreLabel);

		let playAgainButton = new PIXI.Text("Play Again?");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 280;
    playAgainButton.y = sceneHeight - 150;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup",startGame); // startGame is a function reference
    playAgainButton.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
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


	gameOverScoreLabel.text = `Your final score: ${score}`;

}

function checkMistakes(){
	if (mistakes != 0){
		mistakes -= 1;
	}
	else{
		end();
		startScene.visible = false;
		gameScene.visible = false;
		gameOverScene.visible = true;

	}
}
