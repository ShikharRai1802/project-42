var monkey , monkey_running;
  var Banana ,BananaImage;
  var obstacle, obstacleImage;
  var FoodGroup, obstacleGroup,Food;
  var lifeTime;
  var ground;
  var jungle, jungleImage;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  BananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle[1].jpg");
}

function setup() {
  createCanvas(600,400); 
  
  jungle = createSprite(510,200,20,20);
  jungle.addImage(jungleImage);
  jungle.scale = 1;
  jungle.velocityX = -4;
  
  monkey = createSprite(100,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
  
  monkey.setCollider("circle",0,0,150);
  
}

function draw() {
  background("white");
  
  console.log(monkey.y);
    
  if(ground.x<0) {
  ground.x = ground.width/2;
}
    
  if(jungle.x<120) {
  jungle.x = jungle.width/2;
}
  
  if(keyDown("space") && monkey.y >=314.3) {
  monkey.velocityY = -17;
}    
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);   
  
  spawnFood();
  spawnObstacle();

  if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  monkey.scale = 0.2;
  score = score + 1;
  }
  
  if(obstacleGroup.isTouching(monkey)){
  ground.velocityX = -4;
  monkey.velocityY = -10;
  monkey.scale = 0.1; 
  score = score - 1;
}
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);  
}

function spawnFood(){
  if(frameCount%80 === 0){
   Food= createSprite(600,200,40,10);
   Food.y = Math.round(random(120,200));
   Food.addImage( BananaImage );
   Food.scale = 0.07;
   Food.lifetime = 100;
   Food.velocityX = -6;
   FoodGroup.add(Food);
  }
}
  
function spawnObstacle(){
  if(frameCount%200 === 0){
  obstacle = createSprite(600,325,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale= 0.2;
  obstacle.lifetime = 75;  
  obstacle.velocityX = -8;
  obstacleGroup.add(obstacle);  

  }
}

