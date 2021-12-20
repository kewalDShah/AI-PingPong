var paddle1, paddle2;
var rightWristScore = 0;
var game_status="";
var rightWristY;
var rightWristX=0;
var rightWristScore = 0;
var ballSpeed=5;
var ballDirectionX=-1;
var ballDirectionY=1;
score=0;

function preload() {
  paddle1 = loadImage("assets/paddle1.png");
  paddle2 = loadImage("assets/paddle2.png");
  ball = loadImage("assets/ball.png");
  background=loadImage("assets/background.jpg");
}


function setup() {
  createCanvas(700, 600);
  
  gameSetup();
  video = createCapture(VIDEO);
  video.size(600,400);
  video.parent('game_console');
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

}


function modelLoaded() {
  console.log('Model Loaded!');
}


function gotPoses(results)
  {
  console.log(results);
  if(results.length > 0)
  {   
    rightWristScore=results[0].pose.keypoints[10].score;
    
    rightWristY=results[0].pose.rightWrist.y;
    rightWristX=results[0].pose.rightWrist.x;
  }
}



function gameSetup(){
  board=createSprite(350,150,700,700);//change asset color
  board.addImage("board",background);
  board.scale=3

  playerPaddle = createSprite(10, 205, 100, 10);
  playerPaddle.addImage("playerPaddle", paddle1);
  playerPaddle.scale = 0.5;
  

  comPaddle = createSprite(695, 50, 50, 50);
  comPaddle.addImage("comPaddle", paddle2);
  comPaddle.scale = 0.5;

  ballMove = createSprite(670, 50, 50, 50);
  ballMove.addImage("ballMove", ball);
  ballMove.scale = 0.3;
}
function draw() {
  drawSprites();
 
  playerPaddle.y=rightWristY;
  comPaddle.y=ballMove.y;
    ballMove.velocityY=ballDirectionY*ballSpeed
    ballMove.velocityX=ballDirectionX*ballSpeed; 

  if (ballMove.isTouching(playerPaddle)){
    ballDirectionX=1
    score=score+10
    document.getElementById("score").innerHTML = "Score = " + score;
  }
  if (ballMove.isTouching(comPaddle)){
    ballDirectionX=-1;
  }
  if((ballMove.x>700 || ballMove.x<1)){
    restartGame();
  }
  if(ballMove.y>height && 1<ballMove.x<width){
    ballDirectionY=-1
  }
  if(ballMove.y<2 && 1<ballMove.x<width){
    ballDirectionY=1;
  }  
}

function restartGame(){
  ballMove.x=670;
  ballMove.y=50;
}
 