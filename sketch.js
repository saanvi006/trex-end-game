var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver, restart, gameOver_image, restart_image


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOver_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
  
  
}

function setup() {
  createCanvas(displayWidth - 10, displayHeight - 10);
  
  trex = createSprite(50,50,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,displayHeight - 200,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,displayHeight - 199,displayWidth,10);
  invisibleGround.visible = false;
  invisibleGround.velocityX = -2
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(300,100)
  gameOver.addImage("gameOver", gameOver_image)
  gameOver.scale = 0.5
  gameOver.visible = false
  
  restart = createSprite(300,150)
  restart.addImage("restart", restart_image)
  restart.scale = 0.5
  restart.visible = false
}

function draw() {
  background(180);
  
  
 
  if(gameState=== PLAY){
    if(keyDown("space")) {
    
    trex.velocityY = -10;
    
  }
  trex.velocityX = 2
  score = score + Math.round(getFrameRate()/60);
  
  trex.velocityY = trex.velocityY + 0.8
   if(obstaclesGroup.isTouching(trex)){
     gameState = END}
  if (ground.x < 0){
    ground.x = ground.width/2;
    
  }
  if(invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2
  }
  }

  
  else if (gameState=== END){
     gameOver.visible = true;
    restart.visible = true;
    text("Score: "+ score, trex.x,50);
    
    gameOver.x = trex.x
    restart.x = trex.x
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityX = 0;
    trex.velocityY = 0;
    invisibleGround.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();

  camera.position.x = trex.x
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  count = 0;
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,displayHeight - 250));
    cloud.addImage(cloudImage);
    cloud.scale = 1.2;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(displayWidth ,displayHeight - 220,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 350;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}