let player1, player2;
let health1, health2, health3, health4;
let tank = []
let turn = 'red';
let gameState = "PREGAME";
let level = 1;
let numLevels = 3;
let p1lives = 5;
let p2lives = 5;
let walls = [];
let levelMaps = [];
let powers = []
let l3walls= []
let scoreDiv, levelDiv, p1livesDiv, p2livesDiv, p1scoreDiv, p2scoreDiv
let p1score = 0
let p2score = 0
let p2fire=82
let audioFile;


forward = false;
  left = false;
  right = false;
backward=false;


let healthBarWidth = 550; // The width of the health bar
let healthBarHeight =10; // The height of the health bar
let healthBarPadding = 15;
var audio = new Audio('assets/jsmusic.mp3');
var hit = new Audio('assets/hit.mp3');



function preload() {
    for (let i = 0; i < numLevels; i++) {
    levelMaps.push(loadStrings("level/" + (i + 1) + ".txt"));
  }
  
}


function setup() {
  audio.play();
  
  // createCanvas(1770, 860);
  // walls = loadLevel(levelMaps[level - 1]);
   var p1controls = window.alert("Player 1's (the red tank's) controls are set to arrow keys for movement and the ? key to fire");
  var p2controls = window.alert("Player 2's (the green tank's) controls are set to wasd keys for movement and the r key to fire")
  var volume=window.alert("make sure your volume is all the way you up to hear the music!")
  // var p2forward=window.prompt("Please choose player 2's key to move forward (this uses ascii so 87 is the w key")
  // var p2backward=window.prompt("Please choose player 2's key to move backward (this uses ascii so 88 is the s key")
  // var p2left=window.prompt("Please choose player 2's key to move left (this uses ascii so 65 is the a key and 81 is the q key")
  // var p2right=window.prompt("Please choose player 2's key to move right (this uses ascii so 68 is the d key and 65 is the a key")
  // var p2fire=window.alert("Player 2's fire key is locked to r")
  // player1 = new Tank(width / 4.5, height / 2, color(255, 0, 0), LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, 0)
  // player2 = new Tank(width * 3 / 4, height / 2, color(0, 255, 0), p2left, p2right, p2forward, p2backward, PI);
  
  


    createCanvas(1770, 860);
 createCanvas(1770, 860);
  walls = loadLevel(levelMaps[level - 1]);
  console.log(walls)
  player1 = new Tank(width / 4.5 - 250, height / 2 -40, color(255, 0, 0), LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, 0)
  player2 = new Tank(width * 3 / 4 + 200, height / 2 - 40, color(0, 255, 0), 65, 68, 87, 83, PI);
  
levelDiv = createDiv("Level: " + level);
  p1livesDiv = createDiv("Player 1 Lives: " + p1lives);
  p2livesDiv = createDiv("Player 2 Lives: " + p2lives);
  p1scoreDiv = createDiv("Player 1 Score: " + p1score);
  p2scoreDiv = createDiv("Player 2 Score: " + p2score);
}






function draw() {
  background(255);

  if(gameState=="PREGAME"){
     stroke(255, 0, 0);
    fill(0, 0, 0);
    textSize(30)
    text("Please read instructions page before playing", width / 2 - 200, height / 2);
    
    text("Hit space bar to play", width / 2 - 30, height / 1.5);
    if (keyIsDown(32)) {
      gameState = "PLAY"

    }
  }

  
  if (gameState == "PAUSE") {
    stroke(255, 0, 0);
    fill(0, 0, 0);
    textSize(30)
    text("Hit space bar to play", width / 2 - 30, height / 2);

   
   

    if (keyIsDown(32)) {
      gameState = "PLAY"

    }
  }

  else if (gameState == "PLAY") {
    play();
  }

  else if (gameState == "OVER") {
    background(255)
    stroke(255, 0, 0);
    fill(0, 0, 0);
    textSize(30)

    if (p1score > p2score) {
      text("GG Player 1 wins", width / 2 - 30, height / 2);
    }

    if (p2score > p1score) {
      text("GG Player 2 wins", width / 2 - 30, height / 2);

    }
  }

  
  fill(255, 0, 0); 
  rect(healthBarPadding, healthBarPadding, healthBarWidth * p1lives / 10, healthBarHeight); 
  
  fill(0, 255, 0);
  rect(width - healthBarWidth - healthBarPadding, healthBarPadding, healthBarWidth * p2lives / 10, healthBarHeight);


}



function play() {

  drawBoard();
  player1.update();
  player1.show();

  player2.update();
  player2.show();





  
  //bullet hits player 2
  for (let b = 0; b < player1.bullets.length; b++) {
    // check for collision with player 2
    if (player1.bullets[b].hasCollision(player2)) {
      player1.bullets.splice(b, 1);
      hit.play();
      p2lives = p2lives - 1;
      console.log("collision");
      p2livesDiv.html("Player 2 Lives:" + p2lives)

    }
  }
  for (let b = 0; b < player1.bullets.length; b++) {
    // check for collision with walls
    for (let w = 0; w < walls.length; w++) {
      if (player1.bullets[b].hasCollision(walls[w])) {
        player1.bullets.splice(b, 1);
        break; // stop checking for wall collisions once a collision is detected
      }
      

    }
  }
//bullet hits player 1
  for (let b = 0; b < player2.bullets.length; b++) {
    // check for collision with player 1
    if (player2.bullets[b].hasCollision(player1)) {
      hit.play();
      player2.bullets.splice(b, 1);
      p1lives = p1lives - 1;
      console.log("collision");
      p1livesDiv.html("Player 1 Lives:" + p1lives)
    }
  }
  for (let b = 0; b < player2.bullets.length; b++) {
    // check for collision with walls
    for (let w = 0; w < walls.length; w++) {
      if (player2.bullets[b].hasCollision(walls[w])) {
        player2.bullets.splice(b, 1);
        break; // stop checking for wall collisions once a collision is detected
      }
    }
  }

  //player-wall collisions
  for (let w = 0; w < walls.length; w++) {
    if (player1.hasCollision(walls[w])) {
      console.log("collisionP1")
      //if tank is on left side of wall...
      if (player1.loc.x + player1.width / 2 < walls[w].loc.x + walls[w].width / 2)
        if (keyIsDown(player1.upKey)) {
          player1.loc.x = player1.loc.x - 1
         }
      
       //if tank is on right side of wall...
       if (player1.loc.x + player1.width / 2 > walls[w].loc.x + walls[w].width / 2)
        if (keyIsDown(player1.upKey)) {
          player1.loc.x = player1.loc.x + 1
        }
//tank above wall
      if(player1.loc.y+player1.height/2<walls[w].loc.y+walls[w].height/2){
        if (keyIsDown(player1.upKey)) {
          player1.loc.y = player1.loc.y - 1
        }
      }
      if(player1.loc.y+player1.height/2>walls[w].loc.y+walls[w].height/2){
        if (keyIsDown(player1.upKey)) {
          player1.loc.y = player1.loc.y + 1
        }
      }
    }
    if (player2.hasCollision(walls[w])) {
      console.log("collisionP2")
       //if tank is on left side of wall...
      if (player2.loc.x + player2.width / 2 < walls[w].loc.x + walls[w].width / 2)
        if (keyIsDown(player2.upKey)) {
          player2.loc.x = player2.loc.x - 1
        }
      
       //if tank is on right side of wall...
       if (player2.loc.x + player2.width / 2 > walls[w].loc.x + walls[w].width / 2){
        if (keyIsDown(player2.upKey)) {
          player2.loc.x = player2.loc.x + 1
        }
       }
 if(player2.loc.y+player2.height/2<walls[w].loc.y+walls[w].height/2){
        if (keyIsDown(player2.upKey)) {
          player2.loc.y = player2.loc.y - 1
        }
      }
      if(player2.loc.y+player2.height/2>walls[w].loc.y+walls[w].height/2){
        if (keyIsDown(player2.upKey)) {
          player2.loc.y = player2.loc.y + 1
        }
      }
    }   
  }
  for(let p=0;p<powers.length;p++){
    if(player2.hasCollision(powers[p])){
      if (level==2){
          p2lives=p2lives+5
      }
    if(level==3){
      p2lives=p2lives+15
    }
       p2livesDiv.html("Player 2 Lives:" + p2lives)
      powers.splice(p,1)
    }
    
    if(player1.hasCollision(powers[p])){
      if (level==2){
          p1lives=p1lives+5
      }
    if(level==3){
      p1lives=p1lives+15
    }
       p1livesDiv.html("Player 1 Lives:" + p1lives)
      powers.splice(p,1)
          }
  
  }
 for (let l = 0; l < l3walls.length; l++) {
    if (player1.hasCollision(l3walls[l])) {
      console.log("collisionP1")
      //if tank is on left side of wall...
      if (player1.loc.x + player1.width / 2 < l3walls[l].loc.x + l3walls[l].width / 2)
        if (keyIsDown(player1.upKey)) {
          player1.loc.x = player1.loc.x - 1
         }
      
       //if tank is on right side of wall...
       if (player1.loc.x + player1.width / 2 > l3walls[l].loc.x + l3walls[l].width / 2)
        if (keyIsDown(player1.upKey)) {
          player1.loc.x = player1.loc.x + 1
        }
//tank above wall
      if(player1.loc.y+player1.height/2<l3walls[l].loc.y+l3walls[l].height/2){
        if (keyIsDown(player1.upKey)) {
          player1.loc.y = player1.loc.y - 1
        }
      }
      if(player1.loc.y+player1.height/2>l3walls[l].loc.y+l3walls[l].height/2){
        if (keyIsDown(player1.upKey)) {
          player1.loc.y = player1.loc.y + 1
        }
      }
    }
    if (player2.hasCollision(l3walls[l])) {
      console.log("collisionP2")
       //if tank is on left side of wall...
      if (player2.loc.x + player2.width / 2 < l3walls[l].loc.x + l3walls[l].width / 2)
        if (keyIsDown(player2.upKey)) {
          player2.loc.x = player2.loc.x - 1
        }
      
       //if tank is on right side of wall...
       if (player2.loc.x + player2.width / 2 > l3walls[l].loc.x + l3walls[l].width / 2){
        if (keyIsDown(player2.upKey)) {
          player2.loc.x = player2.loc.x + 1
        }
       }
 if(player2.loc.y+player2.height/2<l3walls[l].loc.y+l3walls[l].height/2){
        if (keyIsDown(player2.upKey)) {
          player2.loc.y = player2.loc.y - 1
        }
      }
      if(player2.loc.y+player2.height/2>l3walls[l].loc.y+l3walls[l].height/2){
        if (keyIsDown(player2.upKey)) {
          player2.loc.y = player2.loc.y + 1
        }
      }
    }   
  }

for (let b = 0; b < player1.bullets.length; b++) {
    // check for collision with l3walls
    for (let l = 0; l < l3walls.length; l++) {
      if (player1.bullets[b].hasCollision(l3walls[l])) {
        player1.bullets.splice(b, 1);
         l3walls.splice(l,1)
        break; // stop checking for wall collisions once a collision is detected
       
      }

    }
  }

  for (let b = 0; b < player2.bullets.length; b++) {
    // check for collision with l3walls
    for (let l = 0; l < l3walls.length; l++) {
      if (player2.bullets[b].hasCollision(l3walls[l])) {
        player2.bullets.splice(b, 1);
         l3walls.splice(l,1)
        break; // stop checking for wall collisions once a collision is detected
       
      }

    }
  }




  
  if (p1lives == 0) {
    p2score = p2score + 1
    p2scoreDiv.html("Player 2 Score:" + p2score)
  }
  if (p2lives == 0) {
    p1score = p1score + 1
    p1scoreDiv.html("Player 1 Score:" + p1score)
  }

  if (p1lives == 0 || p2lives == 0) {

   
    if (level < numLevels) {
       audio.play();
      p1lives = 5
      p2lives = 5
      p1livesDiv.html("Player 1 Lives:" +p1lives)
      p2livesDiv.html("Player 2 Lives:" +p2lives)
      level = level + 1
      levelDiv.html("Level:" + level)
      gameState = "PAUSE"
     
      if(level==2){
       var health = window.alert("green powerup is a +5 health boost") 
        
       
      }
      if (level==3){
        for(p=0;p<powers.length;p++){ 
           powers.splice(p,1)
        }
        var l3wall=window.alert("grey walls are damaged and break if shot") 
        var health15=window.alert("green powerup is a +15 health boost")
        
      }
      
  //      var p1controls = window.alert("Happy with your controls? If you want to change them, you can. If you want to use the same controls, re-enter your original controls");
  // var p2forward=window.prompt("Please choose player 2's key to move forward (this uses ascii so 87 is the w key")
  // var p2backward=window.prompt("Please choose player 2's key to move backward (this uses ascii so 88 is the s key")
  // var p2left=window.prompt("Please choose player 2's key to move left (this uses ascii so 65 is the a key and 81 is the q key")
  // var p2right=window.prompt("Please choose player 2's key to move right (this uses ascii so 68 is the d key and 65 is the a key")
    player1 = new Tank(width / 4.5, height / 2, color(255, 0, 0), LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, 0)
  player2 = new Tank(width * 3 / 4, height / 2, color(0, 255, 0), 65, 68, 87, 83, PI);
 walls = loadLevel(levelMaps[level - 1])

    } else {
      gameState = "OVER"
    }

  }







}




function keyPressed() {
  if (key === '/') {
    //player1.bullets.push(new Bullet)
    player1.fire();
    
    

  } else if (keyIsDown(p2fire)) {
    //player2.bullets.push(new Bullet)
    player2.fire();
     
    
  
  }
}





function loadLevel(levelArray) {
  let walls = [];
  console.log("levelArray", levelArray)
  for (let i = 0; i < levelArray.length; i++) { //each row
    let row = levelArray[i]
    for (let j = 0; j < row.length; j++) { //each char in row
      if (row[j] == '-') {
        walls.push(new Wall(j * 10, i * 10, 10, 10));
      }
      if (row[j] == 'P') {
        powers.push(new Powerup(j * 10, i * 10, 10, 10))
        // console.log(powers)
      }
       if (row[j] == '3') {
        l3walls.push(new l3Wall(j * 10, i * 10, 10, 10))
        // console.log(powers)
      }
    }
  }
  return walls;
}

function drawBoard() {
  background(100);

  for (let i = 0; i < walls.length; i++) {
    walls[i].show()
  }
  
    for (let i = 0; i < powers.length; i++) {
      powers[i].show()
    }
  for(let i=0; i<l3walls.length;i++){
    l3walls[i].show()
  }
}



























