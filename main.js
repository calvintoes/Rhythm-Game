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
let mistakes = 8;
let score = 0;
let notes = [];
let streak = 0;
let streakLabel;
let redCircle, greenCircle, blueCircle;
let noteColors = ["red", "green", "blue"];

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

	//keyboard events
	let letterF = keyboard(70),
			letterG = keyboard(71),
			letterH = keyboard(72);

	letterF.press = () =>{
		//console.log("FFFFFFF");
		redCircle.beginFill(0xFF9C9C);
		redCircle.endFill();
		gameScene.addChild(redCircle);
		gameScene.removeChild(redCircle);
	};

	letterF.release = () =>{
		//console.log("releasedF");
		redCircle.beginFill(0xB20808);
		redCircle.endFill
		gameScene.addChild(redCircle);
	};

	letterG.press = () =>{
		//console.log("GGGGGG");
		greenCircle.beginFill(0x9CFF9C);
		greenCircle.endFill();
		gameScene.addChild(greenCircle);
		gameScene.removeChild(greenCircle);
	};

	letterG.release = () =>{
		//console.log("releasedG");
		greenCircle.beginFill(0x08B208);
		greenCircle.endFill();
		gameScene.addChild(greenCircle);
	};

	letterH.press = () =>{
		//console.log("HHHHHH");
		blueCircle.beginFill(0x9C9CFF);
		blueCircle.endFill();
		gameScene.addChild(blueCircle);
		gameScene.removeChild(blueCircle);
	};

	letterH.release = () =>{
		//console.log("releasedH");
		blueCircle.beginFill(0x0808B2);
		blueCircle.endFill();
		gameScene.addChild(blueCircle);
	};


    //Start update gameLoop------------------------------------------------------------>>
    app.ticker.add(gameLoop);
      function gameLoop(){

        //calculate "delta time" for song
          let dt = 1/app.ticker.FPS;
          if(dt > 1/12) dt = 1/12;

        //move notes
          for (let n of notes){
            n.move(dt)
          }
					let rand = Math.floor(Math.random() * Math.floor(3));

					if(dt % 3 == 0){
						makeNotes(noteColors[rand]);
					}

					if(hitRightNote){
						streak++;
						score += 100;
					}
					else{
						streak = 0;
						if (mistakes != 0){
							mistakes -= 1;
						}
						else{
							end();
							startScene.visible = false;
							gameScene.visible = false;
							gameOverScene.visible = true;
							return;
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

		let gameOverText = new PIXI.Text("Game over! \n		find a new band to join");
		textStyle = new PIXI.TextStyle({
			fill: 0x000000,
			fontSize: 64,
			fontFamily: "Arial"
		});
		gameOverText.style = textStyle;
		gameOverText.x = 250;
		gameOverText.y = sceneHeight/2 - 200;
		gameOverScene.addChild(gameOverText);

		let gameOverScoreLabel = new PIXI.Text();
    textStyle = new PIXI.TextStyle({
        fill:0xFFFFFF,
        fontSize:36,
        fontFamily: "Futura",
        stroke: 0xFF0000,
        strokeThickness: 6
    });
    gameOverScoreLabel.style = textStyle;
    gameOverScoreLabel.x = 200;
    gameOverScoreLabel.y = sceneHeight/2 + 50;
    gameOverScene.addChild(gameOverScoreLabel);

		// 		-----------------------------------------------		>>

}

function increaseScoreBy(value){
	score += value;
	//change score text
	scoreLabel.text = `Score: ${score}`;
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

let redNote = new Note(40, 0x980000, 250, -40);
let greenNote = new Note(40, 0x009800, 400, -40);
let blueNote = new Note(40, 0x000098, 550, -40);

function makeNotes(color){
	if(color == "red"){
		notes.push(redNote);
		gameScene.addChild(redNote);
	}
	else if(color == "green"){
		notes.push(greenNote);
		gameScene.addChild(greenNote);
	}
	else{
		notes.push(blueNote);
		gameScene.addChild(blueNote);
	}

}

function hitRightNote(){
	/*let redBounds = redCircle.getBounds();
	let greenBounds = greenCircle.getBounds();
	let blueBounds = blueCircle.getBounds();
	*/

	while (notes.length != 0){
		if (notes[0] == redNote){
			redNote.isAlive = false;
			gameScene.removeChild(redNote);
			return (redCircle.contains(redNote.getX(),redNote.getY()))
		}

		if (notes[0] == greenNote){
			greenNote.isAlive = false;
			gameScene.removeChild(greenNote);
			return (greenCircle.contains(greenNote.getX(),greenNote.getY()))
		}

		if (notes[0] == blueNote){
			blueNote.isAlive = false;
			gameScene.removeChild(blueNote);
			return (blueCircle.contains(blueNote.getX(),blueNote.getY()))
		}
	}
}


function end(){
	notes.foreach(n => gameScene.removeChild(n));
	notes = [];

	gameOverScoreLabel.text = `Your final score: ${score}`;

}
