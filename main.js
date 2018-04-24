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
let buttons = [];
let streak = 0;
let streakLabel;

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

    //Start update gameLoop
    app.ticker.add(gameLoop);
      function gameLoop(){

        //calculate "delta time" for song
          let dt = 1/app.ticker.FPS;
          if(dt > 1/12) dt = 1/12;

        //move buttons
          for (let b of buttons){
            b.move(dt)
          }
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
			fontSize: 18,
			fontFamily: "Arial"
		});

		scoreLabel = new PIXI.Text();
		scoreLabel.style = textStyle;
		scoreLabel.x = 30;
		scoreLabel.y = 200;
		gameScene.addChild(scoreLabel);
		increaseScoreBy(0);

		streakLabel = new PIXI.Text();
		streakLabel.style = textStyle;
		streakLabel.x = 30;
		streakLabel.y = 300;
		gameScene.addChild(streakLabel);
		increaseStreakBy(0);

		let redLine = new PIXI.Graphics();
		redLine.beginFill(0xFF0000);
		redLine.drawRect(200,0,100,600);
		redLine.endFill();
		gameScene.addChild(redLine);

		let redCircle = new PIXI.Graphics();
		redCircle.beginFill(0xB20808);
		redCircle.drawCircle(250,555,40);
		redCircle.endFill();
		gameScene.addChild(redCircle);

		let greenLine = new PIXI.Graphics();
		redLine.beginFill(0x00FF00);
		redLine.drawRect(350,0,100,600);
		redLine.endFill();
		gameScene.addChild(greenLine);

		let greenCircle = new PIXI.Graphics();
		greenCircle.beginFill(0x08B208);
		greenCircle.drawCircle(400,555,40);
		redCircle.endFill();
		gameScene.addChild(greenCircle);

		let blueLine = new PIXI.Graphics();
		redLine.beginFill(0x0000FF);
		redLine.drawRect(500,0,100,600);
		redLine.endFill();
		gameScene.addChild(blueLine);

		let blueCircle = new PIXI.Graphics();
		blueCircle.beginFill(0x0808B2);
		blueCircle.drawCircle(550,555,40);
		redCircle.endFill();
		gameScene.addChild(blueCircle);

		let lineBorder = new PIXI.Graphics();
		lineBorder.beginFill(0x727272);
		lineBorder.drawRect(180,500,440,10);
		lineBorder.endFill();
		gameScene.addChild(lineBorder);

		//add notes to the lines

	}

	function increaseScoreBy(value){
		score += value;
		//change score text
		scoreLabel.text = `Score ${score}`;
	}

	function increaseStreakBy(value){
		streak += value;
		//change score text
		streakLabel.text = `Streak ${streak}`;
	}

	function startGame(){
		startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;

		score = 0;
		mistakes = 8;


	}
