
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime=0;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
 createCanvas(400,400); 
ground=createSprite(190,350,1000,10);
ground.velocityX=-4;
  ground.x=ground.width/2;
  
monkey=createSprite(60,330,10,10); 
monkey.addAnimation("moving",monkey_running);
 monkey.scale=0.1;
  
 score=0;
 //monkey.debug=true;
  monkey.setCollider("circle",0,100,150);

  foodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background("skyBlue");


  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE:"+score,300,100);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("SURVIVAL TIME:"+survivalTime,100,50);
  
  
  monkey.collide(ground); 
  
    if (gameState===PLAY){
     survivalTime = Math.ceil(frameCount/frameRate());
      
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
      
  if(keyDown("space")&& monkey.y>=310){
     monkey.velocityY=-12; 
     
     }

   
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
     score=score+1; 
     }
      
      
  monkey.velocityY=monkey.velocityY+0.4 ;
      
      
       food();
  obstacles();
    
      if(monkey.isTouching(obstacleGroup)){
        gameState=END;
      }
    
    }
  
  if(gameState===END){
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.velocityX=0;
    monkey.velocityY=0;
    survivalTime.visible = false;
    text("GAME OVER",170,170);
    }
  drawSprites();
  //text(""+mouseX+","+mouseY,mouseX,mouseY);
  
}

function food(){
  if(frameCount%80===0){
    banana = createSprite(300,200,10,10);  
     banana.addImage(bananaImage); 
    banana.y=Math.round(random(120,200));
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.lifetime=190;
    foodGroup.add(banana);
     }
}



function obstacles(){
  if (frameCount % 250 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
     obstacleGroup.add(obstacle);
  }


}



