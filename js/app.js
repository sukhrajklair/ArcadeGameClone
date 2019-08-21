// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    //start off screen by setting horizontal position to negative.
    this.x= -100;
    //pick a random row for initial position
    this.y = Math.floor(Math.random()*3)*83 + 65 ;
    //pick a random horizontal speed
    this.hSpeed =Math.random()*70 + 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //update the horizontal position based on the speed
    this.x=this.x+this.hSpeed*dt;
    if (this.x>505){
      this.x=-101;
      this.y = Math.floor(Math.random()*3)*83 + 65;
    }

    //determine the center point of player's figure
    const playerPos=[(player.x+50),(player.y+53)];
    const enemyPos= [(this.x+50),(this.y+60)];
    //calcualte the distance between the centres based on their
    //coordinates
    const playerEnemyDist=Math.sqrt(Math.pow((playerPos[0]-enemyPos[0]),2)+Math.pow((playerPos[1]-enemyPos[1]),2));
    //check for collision
    if (playerEnemyDist<80){
      if (!player.dead){
        player.die();
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//the player class
var Player = function() {
    // Variables applied to each of our instances go here,
    //pick a random initial horizontal position
    this.x=(Math.floor(Math.random()*5))*101;
    //pick a random row for initial position
    this.y =(Math.floor(Math.random()*2) + 3)*83 + 72;
    //speed
    this.vSpeed=0;
    //dead
    this.dead=false;
    // The image/sprite for our player, this uses
    // a helper
    this.sprite = 'images/char-boy.png';
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    //update the vertical position based on the speed
    this.y=this.y+this.vSpeed;
    //when the player reaches water, the player wins and game restarts
    if (this.dead){
      this.vSpeed+=2;
      //once the player has gone beyond the canvas, initiate a new player
      if (this.y>606){
        player= new Player();
      }
    }

};

Player.prototype.handleInput= function(key){
  if (key==='left' && this.x>0 ) {
    this.x-=101;
  }
  else if (key==='right' && this.x<404) {
    this.x+=101;
  }
  else if (key==='up' && this.y>-11) {
    this.y-=83;
  }
  else if (key==='down' && this.y<404) {
    this.y+=83;
  }
  //when player reaches water
  if (this.y<72){

    window.setTimeout(()=>{
      this.vSpeed=-50;
    },500);
    window.setTimeout(()=>{
      player = new Player();
    },1000);
    score++;
  }
};

Player.prototype.die=function(){
  this.dead=true;
  this.vSpeed=-25;
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player, score, allEnemies;

function newGame(){
  player= new Player();
  score=0;
  allEnemies=[];
  for (let x=0; x<3; x++){
    newEnemy = new Enemy();
    allEnemies.push(newEnemy);
  }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//start new game
newGame();
